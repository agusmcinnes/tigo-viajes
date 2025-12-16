import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SpecialPageContent } from "./special-page-content";
import { getSectionBySlug } from "@/lib/services/sections";
import { getSpecialPackages } from "@/lib/services/packages";
import { TravelPackage } from "@/components/package-card";

// Datos de respaldo hardcodeados
const fallbackSection = {
  slug: "verano-2026",
  title: "Verano 2026",
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
  {
    id: "2",
    slug: "glaciares-tierra-gigantes",
    name: "Los Glaciares - Tierra de Gigantes",
    description: "Descubrí la majestuosidad del Perito Moreno y los paisajes patagónicos más impresionantes.",
    destination: "Argentina",
    destinationSlug: "argentina",
    price: "ARS 690.000",
    duration: "6 días / 4 noches",
    nights: 4,
    groupSize: "40 pasajeros",
    dates: ["23 Ene 2026"],
    imageUrl: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=2069",
    isGroupal: true,
    isFeatured: true,
    includedServices: ["Bus Mix de última generación", "4 noches de alojamiento", "Desayuno diario", "Coordinador de viaje"],
  },
  {
    id: "3",
    slug: "federacion-camboriu",
    name: "Federación y Camboriú",
    description: "Lo mejor de Argentina y Brasil en un solo viaje. Termas y playas brasileñas.",
    destination: "Brasil",
    destinationSlug: "brasil",
    price: "USD 990",
    duration: "10 días / 8 noches",
    nights: 8,
    groupSize: "40 pasajeros",
    dates: ["31 Ene 2026"],
    imageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070",
    isGroupal: true,
    isFeatured: true,
    includedServices: ["Bus Mix de última generación", "8 noches de alojamiento", "Desayuno diario", "Coordinador de viaje"],
  },
  {
    id: "4",
    slug: "cataratas-iguazu",
    name: "Cataratas del Iguazú",
    description: "Una de las maravillas naturales del mundo. Lado argentino y brasileño incluidos.",
    destination: "Argentina",
    destinationSlug: "argentina",
    price: "ARS 560.000",
    duration: "6 días / 4 noches",
    nights: 4,
    groupSize: "40 pasajeros",
    dates: ["1 Feb 2026"],
    imageUrl: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2074",
    isGroupal: true,
    isFeatured: true,
    includedServices: ["Bus Mix de última generación", "4 noches de alojamiento", "Desayuno diario", "Coordinador de viaje"],
  },
];

async function getPageData() {
  try {
    const [section, packages] = await Promise.all([
      getSectionBySlug("verano-2026"),
      getSpecialPackages("verano-2026"),
    ]);

    if (section) {
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
  } catch {
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

export default async function Verano2026Page() {
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
