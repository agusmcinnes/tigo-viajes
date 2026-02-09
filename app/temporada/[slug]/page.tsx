import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SpecialPageContent } from "../special-page-content";
import { getSectionBySlug } from "@/lib/services/sections";
import { getSpecialPackages } from "@/lib/services/packages";
import { TravelPackage } from "@/components/package-card";

async function getPageData(slug: string) {
  try {
    const section = await getSectionBySlug(slug);

    if (!section) return null;

    const packages = await getSpecialPackages(section.slug);

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
      <Header variant="transparent" />
      <main>
        <SpecialPageContent section={data.section} packages={data.packages} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
