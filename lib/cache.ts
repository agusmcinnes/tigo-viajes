import { unstable_cache } from "next/cache";
import { createStaticClient } from "@/lib/supabase/static";
import { toDisplayFormat } from "@/lib/services/packages";
import type {
  Package,
  Destination,
  SpecialSection,
  SpecialSectionFeature,
  SpecialSectionFull,
  TravelPackageDisplay,
} from "@/lib/types/database";

type DepartureDateResult = {
  departure_date: string;
  price: number;
  currency: string;
  package_id: string;
};

// Helper: bulk-fetch departure dates for multiple packages (fixes N+1)
async function fetchDepartureDatesForPackages(
  packageIds: string[],
  limit?: number
): Promise<Record<string, { departure_date: string; price: number; currency: string }[]>> {
  if (packageIds.length === 0) return {};

  const supabase = createStaticClient();
  const query = supabase
    .from("package_departure_dates")
    .select("package_id, departure_date, price, currency")
    .in("package_id", packageIds)
    .eq("is_active", true)
    .order("departure_date", { ascending: true });

  const { data } = await query;
  const dateRows = (data || []) as DepartureDateResult[];

  const grouped: Record<string, { departure_date: string; price: number; currency: string }[]> = {};
  for (const row of dateRows) {
    if (!grouped[row.package_id]) grouped[row.package_id] = [];
    if (!limit || grouped[row.package_id].length < limit) {
      grouped[row.package_id].push({
        departure_date: row.departure_date,
        price: row.price,
        currency: row.currency,
      });
    }
  }
  return grouped;
}

// Helper: convert packages + bulk dates to display format
function packagesToDisplay(
  packages: Package[],
  datesMap: Record<string, { departure_date: string; price: number; currency: string }[]>
): TravelPackageDisplay[] {
  return packages.map((pkg) => toDisplayFormat(pkg, datesMap[pkg.id] || []));
}

// ============================================
// CACHED FUNCTIONS
// ============================================

export const getCachedHeaderData = unstable_cache(
  async () => {
    const supabase = createStaticClient();

    const [destResult, sectionsResult] = await Promise.all([
      supabase
        .from("destinations")
        .select("name, slug, image_url")
        .eq("is_active", true)
        .order("display_order", { ascending: true }),
      supabase
        .from("special_sections")
        .select("slug, title, nav_label, nav_icon_name, nav_color")
        .eq("is_active", true)
        .order("display_order", { ascending: true }),
    ]);

    const destinations = (destResult.data || []) as {
      name: string;
      slug: string;
      image_url: string | null;
    }[];

    const specialSections = (sectionsResult.data || []) as {
      slug: string;
      title: string;
      nav_label: string | null;
      nav_icon_name: string | null;
      nav_color: string | null;
    }[];

    return { destinations, specialSections };
  },
  ["header-data"],
  { revalidate: 3600, tags: ["header-data", "destinations", "sections"] }
);

export const getCachedFeaturedPackages = unstable_cache(
  async (): Promise<TravelPackageDisplay[]> => {
    const supabase = createStaticClient();

    const { data: packages, error } = await supabase
      .from("packages")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) throw error;
    const pkgList = (packages || []) as Package[];
    const ids = pkgList.map((p) => p.id);
    const datesMap = await fetchDepartureDatesForPackages(ids, 4);
    return packagesToDisplay(pkgList, datesMap);
  },
  ["featured-packages"],
  { revalidate: 3600, tags: ["packages"] }
);

export const getCachedOfferPackages = unstable_cache(
  async (): Promise<TravelPackageDisplay[]> => {
    const supabase = createStaticClient();

    const { data: packages, error } = await supabase
      .from("packages")
      .select("*")
      .eq("is_active", true)
      .eq("is_offer", true)
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) throw error;
    const pkgList = (packages || []) as Package[];
    const ids = pkgList.map((p) => p.id);
    const datesMap = await fetchDepartureDatesForPackages(ids, 4);
    return packagesToDisplay(pkgList, datesMap);
  },
  ["offer-packages"],
  { revalidate: 3600, tags: ["packages"] }
);

export const getCachedActiveSection = unstable_cache(
  async (): Promise<SpecialSectionFull | null> => {
    const supabase = createStaticClient();

    const { data: section, error } = await supabase
      .from("special_sections")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .limit(1)
      .single();

    if (error || !section) return null;
    const sectionData = section as SpecialSection;

    const [featuresResult, packagesResult] = await Promise.all([
      supabase
        .from("special_section_features")
        .select("*")
        .eq("section_id", sectionData.id)
        .order("display_order", { ascending: true }),
      supabase
        .from("packages")
        .select("*")
        .eq("special_section_id", sectionData.id)
        .eq("is_active", true)
        .order("is_featured", { ascending: false }),
    ]);

    return {
      ...sectionData,
      features: (featuresResult.data || []) as SpecialSectionFeature[],
      packages: (packagesResult.data || []) as Package[],
    };
  },
  ["active-section"],
  { revalidate: 3600, tags: ["sections", "packages"] }
);

export const getCachedPackagesByDestination = unstable_cache(
  async (destinationSlug: string): Promise<TravelPackageDisplay[]> => {
    const supabase = createStaticClient();

    const { data: packages, error } = await supabase
      .from("packages")
      .select("*")
      .eq("is_active", true)
      .eq("destination_slug", destinationSlug)
      .order("is_featured", { ascending: false });

    if (error) throw error;
    const pkgList = (packages || []) as Package[];
    const ids = pkgList.map((p) => p.id);
    const datesMap = await fetchDepartureDatesForPackages(ids, 4);
    return packagesToDisplay(pkgList, datesMap);
  },
  ["packages-by-destination"],
  { revalidate: 3600, tags: ["packages"] }
);

export const getCachedDestinationBySlug = unstable_cache(
  async (slug: string): Promise<Destination | null> => {
    const supabase = createStaticClient();

    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error) return null;
    return data as Destination;
  },
  ["destination-by-slug"],
  { revalidate: 3600, tags: ["destinations"] }
);

export const getCachedPackageById = unstable_cache(
  async (id: string): Promise<TravelPackageDisplay | null> => {
    const supabase = createStaticClient();

    const { data: pkg, error } = await supabase
      .from("packages")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (error || !pkg) return null;
    const pkgData = pkg as Package;

    const [datesResult, itineraryResult] = await Promise.all([
      supabase
        .from("package_departure_dates")
        .select("departure_date, price, currency")
        .eq("package_id", pkgData.id)
        .eq("is_active", true)
        .order("departure_date", { ascending: true }),
      supabase
        .from("package_itinerary_days")
        .select("day_number, title, description")
        .eq("package_id", pkgData.id)
        .order("day_number", { ascending: true }),
    ]);

    return toDisplayFormat(
      pkgData,
      (datesResult.data || []) as { departure_date: string; price: number; currency: string }[],
      (itineraryResult.data || []) as { day_number: number; title: string; description: string }[]
    );
  },
  ["package-by-id"],
  { revalidate: 3600, tags: ["packages"] }
);

export const getCachedPackageBySlug = unstable_cache(
  async (slug: string): Promise<TravelPackageDisplay | null> => {
    const supabase = createStaticClient();

    const { data: pkg, error } = await supabase
      .from("packages")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !pkg) return null;
    const pkgData = pkg as Package;

    const [datesResult, itineraryResult] = await Promise.all([
      supabase
        .from("package_departure_dates")
        .select("departure_date, price, currency")
        .eq("package_id", pkgData.id)
        .eq("is_active", true)
        .order("departure_date", { ascending: true }),
      supabase
        .from("package_itinerary_days")
        .select("day_number, title, description")
        .eq("package_id", pkgData.id)
        .order("day_number", { ascending: true }),
    ]);

    return toDisplayFormat(
      pkgData,
      (datesResult.data || []) as { departure_date: string; price: number; currency: string }[],
      (itineraryResult.data || []) as { day_number: number; title: string; description: string }[]
    );
  },
  ["package-by-slug"],
  { revalidate: 3600, tags: ["packages"] }
);

export const getCachedRelatedPackages = unstable_cache(
  async (
    currentSlug: string,
    destinationSlug: string,
    limit: number = 3
  ): Promise<TravelPackageDisplay[]> => {
    const supabase = createStaticClient();

    const { data: sameDestination } = await supabase
      .from("packages")
      .select("*")
      .eq("is_active", true)
      .eq("destination_slug", destinationSlug)
      .neq("slug", currentSlug)
      .limit(limit);

    const sameDestList = (sameDestination || []) as Package[];

    if (sameDestList.length >= limit) {
      return sameDestList.map((pkg) => toDisplayFormat(pkg));
    }

    const remaining = limit - sameDestList.length;
    const { data: others } = await supabase
      .from("packages")
      .select("*")
      .eq("is_active", true)
      .neq("destination_slug", destinationSlug)
      .neq("slug", currentSlug)
      .eq("is_featured", true)
      .limit(remaining);

    const othersList = (others || []) as Package[];
    const all = [...sameDestList, ...othersList];
    return all.map((pkg) => toDisplayFormat(pkg));
  },
  ["related-packages"],
  { revalidate: 3600, tags: ["packages"] }
);

export const getCachedSectionBySlug = unstable_cache(
  async (slug: string): Promise<SpecialSectionFull | null> => {
    const supabase = createStaticClient();

    const { data: section, error } = await supabase
      .from("special_sections")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !section) return null;
    const sectionData = section as SpecialSection;

    const [featuresResult, packagesResult] = await Promise.all([
      supabase
        .from("special_section_features")
        .select("*")
        .eq("section_id", sectionData.id)
        .order("display_order", { ascending: true }),
      supabase
        .from("packages")
        .select("*")
        .eq("special_section_id", sectionData.id)
        .eq("is_active", true)
        .order("is_featured", { ascending: false }),
    ]);

    return {
      ...sectionData,
      features: (featuresResult.data || []) as SpecialSectionFeature[],
      packages: (packagesResult.data || []) as Package[],
    };
  },
  ["section-by-slug"],
  { revalidate: 3600, tags: ["sections", "packages"] }
);

export const getCachedSpecialPackages = unstable_cache(
  async (sectionSlug: string): Promise<TravelPackageDisplay[]> => {
    const supabase = createStaticClient();

    const { data: section } = await supabase
      .from("special_sections")
      .select("id")
      .eq("slug", sectionSlug)
      .single();

    if (!section) return [];
    const sectionData = section as { id: string };

    const { data: packages, error } = await supabase
      .from("packages")
      .select("*")
      .eq("is_active", true)
      .eq("special_section_id", sectionData.id)
      .order("is_featured", { ascending: false });

    if (error) throw error;
    const pkgList = (packages || []) as Package[];
    const ids = pkgList.map((p) => p.id);
    const datesMap = await fetchDepartureDatesForPackages(ids, 4);
    return packagesToDisplay(pkgList, datesMap);
  },
  ["special-packages"],
  { revalidate: 3600, tags: ["sections", "packages"] }
);
