import { HeaderWrapper } from "@/components/header-wrapper";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { OffersPageContent } from "./offers-page-content";
import { getCachedOfferPackages } from "@/lib/cache";
import { TravelPackage } from "@/components/package-card";

// Datos de respaldo
const fallbackPackages: TravelPackage[] = [];

async function getPageData() {
  try {
    const packages = await getCachedOfferPackages();
    return {
      packages: packages.length > 0 ? packages : fallbackPackages,
    };
  } catch {
    return {
      packages: fallbackPackages,
    };
  }
}

export default async function OfertasPage() {
  const { packages } = await getPageData();

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper variant="transparent" />
      <main>
        <OffersPageContent packages={packages} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
