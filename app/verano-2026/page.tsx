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
  subtitle: "Asegurá tus vacaciones con los mejores precios. Sol, playa y aventura te esperan.",
  badge_text: "Ofertas Especiales - Cupos Limitados",
  background_image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073",
  promo_title: "Reserva anticipada",
  promo_description: "Hasta 20% OFF reservando antes del 31 de Marzo",
};

const fallbackFeatures = [
  { icon_name: "Sun", title: "Sol Garantizado", description: "Los mejores destinos de playa para disfrutar del verano" },
  { icon_name: "Umbrella", title: "All Inclusive", description: "Opciones con todo incluido para despreocuparte" },
  { icon_name: "Waves", title: "Playas Paradisíacas", description: "Desde el Caribe hasta la costa argentina" },
  { icon_name: "Sparkles", title: "Precios Especiales", description: "Ofertas exclusivas reservando con anticipación" },
];

const fallbackPackages: TravelPackage[] = [
  {
    id: "101",
    slug: "mar-del-plata-clasico",
    name: "Mar del Plata Clásico",
    description: "La perla del Atlántico te espera. Playas, casino, shows y la mejor gastronomía costera.",
    destination: "Argentina",
    destinationSlug: "argentina",
    price: "ARS 450.000",
    duration: "7 días / 6 noches",
    nights: 6,
    dates: ["4 Ene 2026", "11 Ene 2026", "18 Ene 2026"],
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070",
    isFeatured: true,
    includedServices: ["Alojamiento 6 noches en hotel 3 estrellas", "Desayuno diario", "Traslados terminal - hotel - terminal"],
  },
  {
    id: "102",
    slug: "florianopolis-premium",
    name: "Florianópolis Premium",
    description: "Las 42 playas más lindas de Brasil te esperan. Incluye traslados y excursiones.",
    destination: "Brasil",
    destinationSlug: "brasil",
    price: "USD 1.150",
    duration: "8 días / 7 noches",
    nights: 7,
    dates: ["5 Ene 2026", "12 Ene 2026", "19 Ene 2026"],
    imageUrl: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=2069",
    isGroupal: true,
    isFeatured: true,
    includedServices: ["Alojamiento 7 noches en posada", "Desayuno diario", "Traslados aeropuerto - hotel - aeropuerto", "Excursión playas del norte"],
  },
  {
    id: "103",
    slug: "punta-cana-verano-all-inclusive",
    name: "Punta Cana All Inclusive",
    description: "Resort 5 estrellas con todo incluido. Bebidas, comidas, actividades y entretenimiento.",
    destination: "Caribe",
    destinationSlug: "caribe",
    price: "USD 1.890",
    duration: "8 días / 7 noches",
    nights: 7,
    dates: ["15 Feb 2026", "22 Feb 2026", "1 Mar 2026"],
    imageUrl: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2074",
    isFeatured: true,
    includedServices: ["Alojamiento 7 noches hotel 5 estrellas", "Sistema All Inclusive", "Traslados aeropuerto - hotel - aeropuerto"],
  },
  {
    id: "104",
    slug: "buzios-arraial-do-cabo",
    name: "Buzios & Arraial do Cabo",
    description: "Combiná las playas más exclusivas de Brasil con el Caribe Brasileño.",
    destination: "Brasil",
    destinationSlug: "brasil",
    price: "USD 980",
    duration: "7 días / 6 noches",
    nights: 6,
    dates: ["8 Ene 2026", "22 Ene 2026"],
    imageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070",
    isGroupal: true,
    includedServices: ["Alojamiento 6 noches", "Desayuno diario", "Traslados", "Excursión Arraial do Cabo"],
  },
  {
    id: "105",
    slug: "villa-gesell-familiar",
    name: "Villa Gesell Familiar",
    description: "El destino familiar por excelencia. Playas tranquilas, bosques y diversión para toda la familia.",
    destination: "Argentina",
    destinationSlug: "argentina",
    price: "ARS 380.000",
    duration: "7 días / 6 noches",
    nights: 6,
    dates: ["10 Ene 2026", "17 Ene 2026", "24 Ene 2026"],
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073",
    includedServices: ["Alojamiento 6 noches en apart hotel", "Traslados terminal - hotel - terminal"],
  },
  {
    id: "106",
    slug: "cancun-verano-todo-incluido",
    name: "Cancún Todo Incluido",
    description: "La Riviera Maya en su máximo esplendor. Pirámides, cenotes y las mejores playas.",
    destination: "Caribe",
    destinationSlug: "caribe",
    price: "USD 2.100",
    duration: "8 días / 7 noches",
    nights: 7,
    dates: ["20 Feb 2026", "5 Mar 2026"],
    imageUrl: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=2070",
    isFeatured: true,
    includedServices: ["Alojamiento 7 noches hotel 4 estrellas", "Desayuno diario", "Traslados aeropuerto - hotel - aeropuerto", "Excursión Chichén Itzá"],
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
