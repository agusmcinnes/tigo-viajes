import { notFound } from "next/navigation";
import { HeaderWrapper } from "@/components/header-wrapper";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SpecialPageContent } from "../special-page-content";
import { getCachedSectionBySlug, getCachedSpecialPackages } from "@/lib/cache";
import { TravelPackage } from "@/components/package-card";

async function getPageData(slug: string) {
  try {
    const section = await getCachedSectionBySlug(slug);

    if (!section) return null;

    const packages = await getCachedSpecialPackages(section.slug);

    return {
      section: {
        ...section,
        features: section.features.length > 0
          ? section.features
          : [],
      },
      packages: packages as TravelPackage[],
    };
  } catch {
    return null;
  }
}

export default async function TemporadaSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPageData(slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper variant="transparent" />
      <main>
        <SpecialPageContent section={data.section} packages={data.packages} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
