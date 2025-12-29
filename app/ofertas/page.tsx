import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { OffersPageContent } from "./offers-page-content";
import { getOfferPackages } from "@/lib/services/packages";
import { TravelPackage } from "@/components/package-card";

// Datos de respaldo
const fallbackPackages: TravelPackage[] = [];

async function getPageData() {
  try {
    const packages = await getOfferPackages();
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
      <Header variant="transparent" />
      <main>
        <OffersPageContent packages={packages} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
