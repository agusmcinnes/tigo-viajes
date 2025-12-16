import { createClient } from "@/lib/supabase/server";
import type {
  Package,
  PackageWithDepartures,
  PackageDepartureDate,
  TravelPackageDisplay,
  InsertTables,
  UpdateTables,
} from "@/lib/types/database";

// Función para convertir Package de BD a formato display
export function toDisplayFormat(
  pkg: Package,
  departureDates?: { departure_date: string; price: number; currency: string }[]
): TravelPackageDisplay {
  const formatPrice = (price: number, currency: string) => {
    if (currency === "ARS") {
      return `ARS ${price.toLocaleString("es-AR")}`;
    }
    return `USD ${price.toLocaleString("en-US")}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return {
    id: pkg.id,
    slug: pkg.slug,
    name: pkg.name,
    description: pkg.description,
    longDescription: pkg.long_description || undefined,
    destination: pkg.destination,
    destinationSlug: pkg.destination_slug,
    price: formatPrice(pkg.base_price, pkg.currency),
    duration: `${pkg.days} días / ${pkg.nights} noches`,
    nights: pkg.nights,
    groupSize: pkg.group_size || undefined,
    dates: departureDates?.map((d) => formatDate(d.departure_date)),
    imageUrl: pkg.image_url,
    isGroupal: pkg.is_groupal,
    isFeatured: pkg.is_featured,
    includedServices: pkg.included_services,
    additionalServices: pkg.optional_excursions,
  };
}

// ============================================
// OPERACIONES DE LECTURA (Públicas)
// ============================================

export async function getPackages(): Promise<TravelPackageDisplay[]> {
  const supabase = await createClient();

  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const pkgList = (packages || []) as Package[];

  // Obtener fechas de salida para cada paquete
  const packagesWithDates = await Promise.all(
    pkgList.map(async (pkg) => {
      const { data: dates } = await supabase
        .from("package_departure_dates")
        .select("departure_date, price, currency")
        .eq("package_id", pkg.id)
        .eq("is_active", true)
        .order("departure_date", { ascending: true });

      return toDisplayFormat(pkg, (dates || []) as { departure_date: string; price: number; currency: string }[]);
    })
  );

  return packagesWithDates;
}

type DepartureDateResult = { departure_date: string; price: number; currency: string };

export async function getPackageById(
  id: string
): Promise<TravelPackageDisplay | null> {
  const supabase = await createClient();

  const { data: pkg, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error || !pkg) return null;

  const pkgData = pkg as Package;

  const { data: dates } = await supabase
    .from("package_departure_dates")
    .select("departure_date, price, currency")
    .eq("package_id", pkgData.id)
    .eq("is_active", true)
    .order("departure_date", { ascending: true });

  return toDisplayFormat(pkgData, (dates || []) as DepartureDateResult[]);
}

export async function getPackageBySlug(
  slug: string
): Promise<TravelPackageDisplay | null> {
  const supabase = await createClient();

  const { data: pkg, error } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !pkg) return null;

  const pkgData = pkg as Package;

  const { data: dates } = await supabase
    .from("package_departure_dates")
    .select("departure_date, price, currency")
    .eq("package_id", pkgData.id)
    .eq("is_active", true)
    .order("departure_date", { ascending: true });

  return toDisplayFormat(pkgData, (dates || []) as DepartureDateResult[]);
}

export async function getFeaturedPackages(): Promise<TravelPackageDisplay[]> {
  const supabase = await createClient();

  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) throw error;

  const pkgList = (packages || []) as Package[];

  const packagesWithDates = await Promise.all(
    pkgList.map(async (pkg) => {
      const { data: dates } = await supabase
        .from("package_departure_dates")
        .select("departure_date, price, currency")
        .eq("package_id", pkg.id)
        .eq("is_active", true)
        .order("departure_date", { ascending: true })
        .limit(4);

      return toDisplayFormat(pkg, (dates || []) as DepartureDateResult[]);
    })
  );

  return packagesWithDates;
}

export async function getPackagesByDestination(
  destinationSlug: string
): Promise<TravelPackageDisplay[]> {
  const supabase = await createClient();

  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .eq("destination_slug", destinationSlug)
    .order("is_featured", { ascending: false });

  if (error) throw error;

  const pkgList = (packages || []) as Package[];

  const packagesWithDates = await Promise.all(
    pkgList.map(async (pkg) => {
      const { data: dates } = await supabase
        .from("package_departure_dates")
        .select("departure_date, price, currency")
        .eq("package_id", pkg.id)
        .eq("is_active", true)
        .order("departure_date", { ascending: true })
        .limit(4);

      return toDisplayFormat(pkg, (dates || []) as DepartureDateResult[]);
    })
  );

  return packagesWithDates;
}

export async function getSpecialPackages(
  sectionSlug: string
): Promise<TravelPackageDisplay[]> {
  const supabase = await createClient();

  // Primero obtener el ID de la sección
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

  const packagesWithDates = await Promise.all(
    pkgList.map(async (pkg) => {
      const { data: dates } = await supabase
        .from("package_departure_dates")
        .select("departure_date, price, currency")
        .eq("package_id", pkg.id)
        .eq("is_active", true)
        .order("departure_date", { ascending: true })
        .limit(4);

      return toDisplayFormat(pkg, (dates || []) as DepartureDateResult[]);
    })
  );

  return packagesWithDates;
}

export async function getRelatedPackages(
  currentSlug: string,
  destinationSlug: string,
  limit: number = 3
): Promise<TravelPackageDisplay[]> {
  const supabase = await createClient();

  // Primero intentar con el mismo destino
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

  // Si no hay suficientes, completar con otros
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
}

// ============================================
// OPERACIONES ADMIN (CRUD)
// ============================================

export async function getPackagesAdmin(): Promise<PackageWithDepartures[]> {
  const supabase = await createClient();

  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  const pkgList = (packages || []) as Package[];

  const packagesWithDates = await Promise.all(
    pkgList.map(async (pkg) => {
      const { data: dates } = await supabase
        .from("package_departure_dates")
        .select("*")
        .eq("package_id", pkg.id)
        .order("departure_date", { ascending: true });

      return {
        ...pkg,
        departure_dates: (dates || []) as PackageDepartureDate[],
      } as PackageWithDepartures;
    })
  );

  return packagesWithDates;
}

export async function getPackageAdminById(
  id: string
): Promise<PackageWithDepartures | null> {
  const supabase = await createClient();

  const { data: pkg, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !pkg) return null;

  const pkgData = pkg as Package;

  const { data: dates } = await supabase
    .from("package_departure_dates")
    .select("*")
    .eq("package_id", pkgData.id)
    .order("departure_date", { ascending: true });

  return {
    ...pkgData,
    departure_dates: (dates || []) as PackageDepartureDate[],
  };
}

export async function createPackage(
  data: InsertTables<"packages">
): Promise<Package> {
  const supabase = await createClient();

  const { data: pkg, error } = await supabase
    .from("packages")
    .insert(data as never)
    .select()
    .single();

  if (error) throw error;
  return pkg as Package;
}

export async function updatePackage(
  id: string,
  data: UpdateTables<"packages">
): Promise<Package> {
  const supabase = await createClient();

  const { data: pkg, error } = await supabase
    .from("packages")
    .update(data as never)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return pkg as Package;
}

export async function deletePackage(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from("packages").delete().eq("id", id);

  if (error) throw error;
}

export async function togglePackageActive(
  id: string,
  isActive: boolean
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("packages")
    .update({ is_active: isActive } as never)
    .eq("id", id);

  if (error) throw error;
}

// ============================================
// FECHAS DE SALIDA
// ============================================

export async function addDepartureDate(
  data: InsertTables<"package_departure_dates">
) {
  const supabase = await createClient();

  const { data: date, error } = await supabase
    .from("package_departure_dates")
    .insert(data as never)
    .select()
    .single();

  if (error) throw error;
  return date;
}

export async function updateDepartureDate(
  id: string,
  data: UpdateTables<"package_departure_dates">
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("package_departure_dates")
    .update(data as never)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteDepartureDate(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("package_departure_dates")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
