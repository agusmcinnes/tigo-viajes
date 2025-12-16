// Datos centralizados de paquetes - Datos de respaldo cuando Supabase no está configurado
// Estos datos reflejan los paquetes reales de Verano 2026

export interface TravelPackage {
  id: number;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  destination: string;
  destinationSlug: string;
  price: string;
  duration: string;
  nights: number;
  groupSize?: string;
  dates?: string[];
  imageUrl: string;
  isGroupal?: boolean;
  isFeatured?: boolean;
  includedServices: string[];
  additionalServices?: string[];
}

export const allPackages: TravelPackage[] = [
  {
    id: 1,
    slug: "federacion-carnavales-gualeguaychu",
    name: "Federación + Carnavales Gualeguaychú",
    description:
      "Combiná las termas de Federación con la magia de los carnavales más importantes del país. Un viaje para disfrutar en grupo.",
    longDescription:
      "Viví la experiencia única de combinar las relajantes termas de Federación con la explosión de color y alegría de los Carnavales de Gualeguaychú. Disfrutá de las piletas termales, los shows nocturnos del corsódromo y toda la energía del verano entrerriano. Viaje grupal en bus de última generación con todas las comodidades.",
    destination: "Argentina",
    destinationSlug: "argentina",
    price: "ARS 440.000",
    duration: "6 días / 4 noches",
    nights: 4,
    groupSize: "40 pasajeros",
    dates: ["12 Ene 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070",
    isGroupal: true,
    isFeatured: true,
    includedServices: [
      "Bus Mix de última generación",
      "4 noches de alojamiento con desayuno",
      "Servicio a bordo completo",
      "Coordinador de viaje Tigo",
      "Entrada al corsódromo de Gualeguaychú",
      "Acceso a termas de Federación",
      "Seguro de viaje",
    ],
    additionalServices: [
      "Excursiones opcionales en Federación",
      "Cenas en restaurantes típicos",
    ],
  },
  {
    id: 2,
    slug: "glaciares-tierra-gigantes",
    name: "Los Glaciares - Tierra de Gigantes",
    description:
      "Descubrí la majestuosidad del Perito Moreno y los paisajes patagónicos más impresionantes del mundo.",
    longDescription:
      "Una experiencia única en la Patagonia argentina. Contemplá el imponente Glaciar Perito Moreno, navegá entre témpanos milenarios y descubrí la belleza extrema del Parque Nacional Los Glaciares. Viaje grupal en bus de última generación con todas las comodidades para disfrutar del fin del mundo.",
    destination: "Argentina",
    destinationSlug: "argentina",
    price: "ARS 690.000",
    duration: "6 días / 4 noches",
    nights: 4,
    groupSize: "40 pasajeros",
    dates: ["23 Ene 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=2069",
    isGroupal: true,
    isFeatured: true,
    includedServices: [
      "Bus Mix de última generación",
      "4 noches de alojamiento con desayuno",
      "Servicio a bordo completo",
      "Coordinador de viaje Tigo",
      "Excursión Glaciar Perito Moreno",
      "Navegación Ríos de Hielo",
      "Seguro de viaje",
    ],
    additionalServices: [
      "Minitrekking sobre el glaciar",
      "Excursión El Chaltén",
      "Estancia patagónica con asado",
    ],
  },
  {
    id: 3,
    slug: "federacion-camboriu",
    name: "Federación y Camboriú",
    description:
      "Lo mejor de Argentina y Brasil en un solo viaje. Termas relajantes y las playas más lindas del sur de Brasil.",
    longDescription:
      "Un viaje que combina lo mejor de dos mundos: las termas de Federación en Argentina y las paradisíacas playas de Camboriú en Brasil. Disfrutá de días de relax termal y noches de playa brasileña. Viaje grupal en bus de última generación con todas las comodidades para cruzar la frontera sin preocupaciones.",
    destination: "Brasil",
    destinationSlug: "brasil",
    price: "USD 990",
    duration: "10 días / 8 noches",
    nights: 8,
    groupSize: "40 pasajeros",
    dates: ["31 Ene 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070",
    isGroupal: true,
    isFeatured: true,
    includedServices: [
      "Bus Mix de última generación",
      "8 noches de alojamiento con desayuno",
      "Servicio a bordo completo",
      "Coordinador de viaje Tigo",
      "Acceso a termas de Federación",
      "Día libre en playas de Camboriú",
      "Seguro de viaje internacional",
    ],
    additionalServices: [
      "Excursión Beto Carrero World",
      "Paseo en barco por la costa",
      "City tour Camboriú",
    ],
  },
  {
    id: 4,
    slug: "cataratas-iguazu",
    name: "Cataratas del Iguazú",
    description:
      "Una de las maravillas naturales del mundo. Visitá el lado argentino y brasileño en un viaje inolvidable.",
    longDescription:
      "Viví la experiencia de las Cataratas del Iguazú, una de las Siete Maravillas Naturales del Mundo. Este paquete incluye visitas a ambos lados de las cataratas (argentino y brasileño), paseos por senderos selváticos y toda la magia de la selva misionera. Viaje grupal en bus de última generación con todas las comodidades.",
    destination: "Argentina",
    destinationSlug: "argentina",
    price: "ARS 560.000",
    duration: "6 días / 4 noches",
    nights: 4,
    groupSize: "40 pasajeros",
    dates: ["1 Feb 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2074",
    isGroupal: true,
    isFeatured: true,
    includedServices: [
      "Bus Mix de última generación",
      "4 noches de alojamiento con desayuno",
      "Servicio a bordo completo",
      "Coordinador de viaje Tigo",
      "Excursión Cataratas lado argentino",
      "Excursión Cataratas lado brasileño",
      "Seguro de viaje",
    ],
    additionalServices: [
      "Paseo en lancha Gran Aventura",
      "Excursión Minas de Wanda",
      "Cena de despedida con show",
    ],
  },
];

// Funciones de utilidad
export function getPackageById(id: number): TravelPackage | undefined {
  return allPackages.find((pkg) => pkg.id === id);
}

export function getPackageBySlug(slug: string): TravelPackage | undefined {
  return allPackages.find((pkg) => pkg.slug === slug);
}

export function getPackagesByDestination(destinationSlug: string): TravelPackage[] {
  return allPackages.filter((pkg) => pkg.destinationSlug === destinationSlug);
}

export function getFeaturedPackages(): TravelPackage[] {
  return allPackages.filter((pkg) => pkg.isFeatured);
}

export function getRelatedPackages(
  currentPackage: TravelPackage,
  limit: number = 3
): TravelPackage[] {
  return allPackages
    .filter(
      (pkg) =>
        pkg.id !== currentPackage.id &&
        pkg.destinationSlug === currentPackage.destinationSlug
    )
    .slice(0, limit);
}

// Si no hay suficientes del mismo destino, completar con otros destacados
export function getRelatedOrFeaturedPackages(
  currentPackage: TravelPackage,
  limit: number = 3
): TravelPackage[] {
  const sameDestination = allPackages.filter(
    (pkg) =>
      pkg.id !== currentPackage.id &&
      pkg.destinationSlug === currentPackage.destinationSlug
  );

  if (sameDestination.length >= limit) {
    return sameDestination.slice(0, limit);
  }

  const others = allPackages.filter(
    (pkg) =>
      pkg.id !== currentPackage.id &&
      pkg.destinationSlug !== currentPackage.destinationSlug
  );

  return [...sameDestination, ...others].slice(0, limit);
}
