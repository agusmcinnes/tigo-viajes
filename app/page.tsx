import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PackagesSection } from "@/components/packages-section";
import { OffersSection } from "@/components/offers-section";
import { SpecialSection } from "@/components/special-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getFeaturedPackages, getOfferPackages } from "@/lib/services/packages";
import { getActiveSection } from "@/lib/services/sections";

// Datos de respaldo si Supabase no está configurado
import { allPackages } from "@/lib/packages-data";

async function getPageData() {
  try {
    const [packages, offers, section] = await Promise.all([
      getFeaturedPackages(),
      getOfferPackages(),
      getActiveSection(),
    ]);

    return {
      packages:
        packages.length > 0
          ? packages
          : allPackages.filter((p) => p.isFeatured).slice(0, 6),
      offers: offers,
      section: section,
      features: section?.features || [],
    };
  } catch {
    // Si hay error (Supabase no configurado), usar datos mock
    return {
      packages: allPackages.filter((p) => p.isFeatured).slice(0, 6),
      offers: [],
      section: null,
      features: [],
    };
  }
}

export default async function HomePage() {
  const { packages, offers, section, features } = await getPageData();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <PackagesSection packages={packages} />
        <OffersSection packages={offers} />
        <SpecialSection section={section} features={features} />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
