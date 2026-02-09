import Link from "next/link";
import { notFound } from "next/navigation";
import { HeaderWrapper } from "@/components/header-wrapper";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { DestinationPageContent } from "./destination-content";
import { getCachedPackagesByDestination, getCachedDestinationBySlug } from "@/lib/cache";
import { getPackagesByDestination as getPackagesByDestinationMock } from "@/lib/packages-data";

// Datos de destinos de respaldo
const destinationsData: Record<
  string,
  {
    name: string;
    description: string;
    heroImage: string;
    highlights: string[];
  }
> = {
  argentina: {
    name: "Argentina",
    description:
      "Descubrí la belleza de nuestro país. Desde las Cataratas del Iguazú hasta la Patagonia y las termas de Federación.",
    heroImage:
      "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=2070",
    highlights: [
      "Cataratas del Iguazú",
      "Glaciar Perito Moreno",
      "Termas de Federación",
      "Carnavales de Gualeguaychú",
    ],
  },
  brasil: {
    name: "Brasil",
    description:
      "Playas paradisíacas, ritmo y alegría. Brasil te espera con sus mejores destinos de sol y playa.",
    heroImage:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070",
    highlights: ["Camboriú", "Florianópolis", "Río de Janeiro", "Buzios"],
  },
};

async function getDestinationData(slug: string) {
  try {
    const [destination, packages] = await Promise.all([
      getCachedDestinationBySlug(slug),
      getCachedPackagesByDestination(slug),
    ]);

    const fallbackData = destinationsData[slug];

    if (destination) {
      return {
        destination: {
          name: destination.name,
          description:
            fallbackData?.description ||
            `Descubrí los mejores paquetes a ${destination.name}`,
          heroImage:
            destination.image_url ||
            fallbackData?.heroImage ||
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070",
          highlights: fallbackData?.highlights || [],
        },
        packages,
      };
    }

    if (fallbackData) {
      const mockPackages = getPackagesByDestinationMock(slug);
      return {
        destination: fallbackData,
        packages: mockPackages,
      };
    }

    return { destination: null, packages: [] };
  } catch {
    const fallbackData = destinationsData[slug];
    if (fallbackData) {
      const mockPackages = getPackagesByDestinationMock(slug);
      return {
        destination: fallbackData,
        packages: mockPackages,
      };
    }
    return { destination: null, packages: [] };
  }
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { destination, packages } = await getDestinationData(slug);

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderWrapper variant="solid" />
      <main className="pt-20">
        <DestinationPageContent destination={destination} packages={packages} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
