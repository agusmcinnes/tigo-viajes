import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SpecialPageContent } from "./special-page-content";
import { getActiveSection, getSections } from "@/lib/services/sections";
import { getSpecialPackages } from "@/lib/services/packages";
import { TravelPackage } from "@/components/package-card";

// Datos de respaldo hardcodeados
const fallbackSection = {
  slug: "temporada",
  title: "Temporada Especial",
  subtitle: "Viajes en bus grupales con las mejores comodidades. Bus Mix de última generación, servicio a bordo y coordinador.",
  badge_text: "Salidas Grupales - Cupos Limitados",
  background_image_url: "/verano2026-tigo.jpg",
  promo_title: "Reserva anticipada",
  promo_description: "Asegurá tu lugar con el mejor precio. Cupos limitados a 40 pasajeros por salida.",
};

const fallbackFeatures = [
  { icon_name: "Bus", title: "Bus de Última Generación", description: "Bus Mix con todas las comodidades para tu viaje" },
  { icon_name: "Users", title: "Grupos de 40 personas", description: "Viajá acompañado y conocé gente nueva" },
  { icon_name: "Sparkles", title: "Servicio a Bordo", description: "Coordinador y atención durante todo el viaje" },
];

const fallbackPackages: TravelPackage[] = [
  {
    id: "1",
    slug: "federacion-carnavales-gualeguaychu",
    name: "Federación + Carnavales Gualeguaychú",
    description: "Combiná las termas de Federación con la magia de los carnavales más importantes del país.",
    destination: "Argentina",
    destinationSlug: "argentina",
    price: "ARS 440.000",
    duration: "6 días / 4 noches",
    nights: 4,
    groupSize: "40 pasajeros",
    dates: ["12 Ene 2026"],
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070",
    isGroupal: true,
    isFeatured: true,
    includedServices: ["Bus Mix de última generación", "4 noches de alojamiento", "Desayuno diario", "Coordinador de viaje"],
  },
];

async function getPageData() {
  try {
    // Si hay múltiples secciones activas, redirigir a la primera
    const activeSections = await getSections();

    if (activeSections.length > 0) {
      // Redirigir a la primera sección activa
      redirect(`/temporada/${activeSections[0].slug}`);
    }

    // Fallback: intentar obtener la sección activa directamente
    const section = await getActiveSection();

    if (section) {
      const packages = await getSpecialPackages(section.slug);

      return {
        section: {
          ...section,
          features: section.features.length > 0 ? section.features : fallbackFeatures,
        },
        packages: packages.length > 0 ? packages : fallbackPackages,
      };
    }

    // Fallback a datos hardcodeados
    return {
      section: {
        ...fallbackSection,
        features: fallbackFeatures,
      },
      packages: fallbackPackages,
    };
  } catch (error) {
    // Check if it's a redirect (Next.js throws NEXT_REDIRECT)
    if (error && typeof error === "object" && "digest" in error) {
      throw error;
    }
    // Fallback a datos hardcodeados
    return {
      section: {
        ...fallbackSection,
        features: fallbackFeatures,
      },
      packages: fallbackPackages,
    };
  }
}

export default async function TemporadaPage() {
  const { section, packages } = await getPageData();

  return (
    <div className="min-h-screen bg-white">
      <Header variant="transparent" />
      <main>
        <SpecialPageContent section={section} packages={packages} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
