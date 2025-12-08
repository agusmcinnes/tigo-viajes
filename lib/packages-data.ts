// Datos centralizados de paquetes - será reemplazado por Supabase

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
    slug: "cataratas-iguazu-selva-misionera",
    name: "Cataratas del Iguazú + Selva Misionera",
    description:
      "Descubrí una de las maravillas naturales del mundo con excursiones a ambos lados de las cataratas y aventuras en la selva.",
    longDescription:
      "Viví una experiencia única en las Cataratas del Iguazú, una de las Siete Maravillas Naturales del Mundo. Este paquete incluye visitas a ambos lados de las cataratas (argentino y brasileño), paseos en lancha bajo los saltos, y aventuras en la selva misionera. Disfrutá de la fauna y flora autóctona, conocé las Minas de Wanda y descubrí la cultura guaraní en este viaje inolvidable.",
    destination: "Argentina",
    destinationSlug: "argentina",
    price: "USD 890",
    duration: "5 días / 4 noches",
    nights: 4,
    groupSize: "Máx. 20 personas",
    dates: ["15 Ene 2026", "22 Ene 2026", "5 Feb 2026", "19 Feb 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1540991825428-5b54b09f7338?q=80&w=2070",
    isGroupal: true,
    isFeatured: true,
    includedServices: [
      "Alojamiento 4 noches en hotel 4 estrellas",
      "Desayuno buffet diario",
      "Traslados aeropuerto - hotel - aeropuerto",
      "Excursión Cataratas lado argentino",
      "Excursión Cataratas lado brasileño",
      "Paseo en lancha Gran Aventura",
      "Coordinador de viaje Tigo",
      "Seguro de viaje básico",
    ],
    additionalServices: [
      "Excursión Minas de Wanda",
      "Cena de despedida con show",
      "Upgrade a hotel 5 estrellas",
      "Seguro premium con cobertura médica ampliada",
    ],
  },
  {
    id: 2,
    slug: "rio-janeiro-buzios",
    name: "Río de Janeiro & Buzios",
    description:
      "Combiná el ritmo de Rio con la tranquilidad de las playas de Buzios. Cristo Redentor, Pan de Azúcar y más.",
    longDescription:
      "Descubrí la ciudad maravillosa y sus playas paradisíacas. Visitá el Cristo Redentor, subí al Pan de Azúcar, caminá por Copacabana e Ipanema, y luego relajate en las exclusivas playas de Buzios. Un viaje que combina cultura, naturaleza y descanso en los mejores destinos de Brasil.",
    destination: "Brasil",
    destinationSlug: "brasil",
    price: "USD 1.250",
    duration: "7 días / 6 noches",
    nights: 6,
    groupSize: "Máx. 15 personas",
    dates: ["10 Feb 2026", "24 Feb 2026", "10 Mar 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070",
    isGroupal: true,
    isFeatured: true,
    includedServices: [
      "Alojamiento 3 noches en Rio + 3 noches en Buzios",
      "Desayuno diario",
      "Traslados aeropuerto y entre ciudades",
      "City tour Rio de Janeiro",
      "Entrada Cristo Redentor",
      "Subida al Pan de Azúcar",
      "Coordinador de viaje",
      "Seguro de viaje",
    ],
    additionalServices: [
      "Tour a Angra dos Reis",
      "Paseo en barco por Buzios",
      "Cena en restaurante típico",
      "Clase de samba",
    ],
  },
  {
    id: 3,
    slug: "punta-cana-all-inclusive",
    name: "Punta Cana All Inclusive",
    description:
      "Relajate en las playas paradisíacas del Caribe con todo incluido. Hoteles 5 estrellas y excursiones opcionales.",
    longDescription:
      "El destino soñado del Caribe te espera. Disfrutá de playas de arena blanca, aguas cristalinas y el mejor sistema all inclusive en hoteles 5 estrellas. Gastronomía internacional, deportes acuáticos, spa y mucho más, todo incluido en tu estadía.",
    destination: "Caribe",
    destinationSlug: "caribe",
    price: "USD 1.890",
    duration: "8 días / 7 noches",
    nights: 7,
    dates: ["5 Mar 2026", "19 Mar 2026", "2 Abr 2026", "16 Abr 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2074",
    isFeatured: true,
    includedServices: [
      "Alojamiento 7 noches hotel 5 estrellas",
      "Sistema All Inclusive (comidas y bebidas)",
      "Traslados aeropuerto - hotel - aeropuerto",
      "Acceso a todas las instalaciones del resort",
      "Deportes acuáticos no motorizados",
      "Entretenimiento nocturno",
      "Seguro de viaje",
    ],
    additionalServices: [
      "Excursión Isla Saona",
      "Nado con delfines",
      "Tour a Santo Domingo",
      "Spa premium",
      "Upgrade a suite con vista al mar",
    ],
  },
  {
    id: 4,
    slug: "bariloche-ruta-7-lagos",
    name: "Bariloche & Ruta de los 7 Lagos",
    description:
      "Viví la magia de la Patagonia argentina. Lagos cristalinos, bosques milenarios y la encantadora ciudad de Bariloche.",
    longDescription:
      "Descubrí la Suiza argentina en este viaje por la Patagonia. Recorré la famosa Ruta de los 7 Lagos, visitá el Circuito Chico, navegá el lago Nahuel Huapi y disfrutá del encanto de San Carlos de Bariloche con sus chocolaterías y arquitectura alpina.",
    destination: "Argentina",
    destinationSlug: "argentina",
    price: "USD 750",
    duration: "6 días / 5 noches",
    nights: 5,
    groupSize: "Máx. 25 personas",
    dates: ["20 Ene 2026", "3 Feb 2026", "17 Feb 2026", "3 Mar 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=2070",
    isGroupal: true,
    includedServices: [
      "Alojamiento 5 noches en hotel céntrico",
      "Desayuno buffet diario",
      "Traslados aeropuerto - hotel - aeropuerto",
      "Excursión Circuito Chico",
      "Excursión Ruta de los 7 Lagos",
      "Navegación Isla Victoria y Bosque de Arrayanes",
      "Coordinador de viaje",
      "Seguro de viaje",
    ],
    additionalServices: [
      "Excursión Cerro Catedral",
      "Rafting en el río Manso",
      "Cena show en restaurant patagónico",
      "Tour de chocolaterías",
    ],
  },
  {
    id: 5,
    slug: "florianopolis-clasico",
    name: "Florianópolis Clásico",
    description:
      "Sol, playas increíbles y la mejor vida nocturna de Brasil. El destino favorito de los argentinos.",
    longDescription:
      "La isla mágica de Santa Catarina te espera con más de 40 playas para explorar. Desde Jurere Internacional hasta Praia Mole, pasando por Lagoa da Conceição. Disfrutá del día en la playa y de la vibrante vida nocturna de Floripa.",
    destination: "Brasil",
    destinationSlug: "brasil",
    price: "USD 980",
    duration: "7 días / 6 noches",
    nights: 6,
    dates: ["8 Ene 2026", "15 Ene 2026", "22 Ene 2026", "29 Ene 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=2069",
    includedServices: [
      "Alojamiento 6 noches en posada/hotel",
      "Desayuno diario",
      "Traslados aeropuerto - hotel - aeropuerto",
      "City tour por la isla",
      "Excursión playas del norte",
      "Seguro de viaje",
    ],
    additionalServices: [
      "Excursión Beto Carrero World",
      "Paseo en barco por la costa",
      "Tour gastronómico",
      "Alquiler de auto por día",
    ],
  },
  {
    id: 6,
    slug: "europa-clasica-roma-paris-madrid",
    name: "Europa Clásica: Roma, París & Madrid",
    description:
      "Recorré las capitales más emblemáticas de Europa con guía en español. Historia, arte y gastronomía.",
    longDescription:
      "Un viaje soñado por las capitales más fascinantes de Europa. Descubrí la historia del Coliseo y el Vaticano en Roma, enamoráte de la Torre Eiffel y el Louvre en París, y viví la pasión española en Madrid con el Museo del Prado y la Gran Vía. Un itinerario completo con los mejores guías en español.",
    destination: "Europa",
    destinationSlug: "europa",
    price: "USD 3.450",
    duration: "15 días / 14 noches",
    nights: 14,
    groupSize: "Máx. 20 personas",
    dates: ["1 May 2026", "15 Jun 2026", "1 Sep 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020",
    isGroupal: true,
    isFeatured: true,
    includedServices: [
      "Alojamiento 14 noches en hoteles 4 estrellas",
      "Desayuno buffet diario",
      "Vuelos internos Europa",
      "Traslados entre ciudades en tren de alta velocidad",
      "Entradas Coliseo y Vaticano",
      "Entrada Torre Eiffel",
      "Entrada Museo del Prado",
      "Guía en español todo el recorrido",
      "Coordinador de viaje Tigo",
      "Seguro de viaje internacional",
    ],
    additionalServices: [
      "Excursión a Versalles",
      "Tour Toledo desde Madrid",
      "Cena crucero por el Sena",
      "Noche de flamenco en Madrid",
      "Visita a Pompeya desde Roma",
    ],
  },
  {
    id: 7,
    slug: "calafate-glaciares",
    name: "El Calafate & Glaciar Perito Moreno",
    description:
      "Contemplá la majestuosidad del Glaciar Perito Moreno y navegá entre témpanos milenarios.",
    longDescription:
      "Una experiencia única en el fin del mundo. Visitá el imponente Glaciar Perito Moreno, navegá por el Lago Argentino entre témpanos azules, y descubrí la belleza extrema de la Patagonia austral. Un viaje que te dejará sin palabras.",
    destination: "Argentina",
    destinationSlug: "argentina",
    price: "USD 1.100",
    duration: "5 días / 4 noches",
    nights: 4,
    groupSize: "Máx. 20 personas",
    dates: ["10 Feb 2026", "24 Feb 2026", "10 Mar 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070",
    isGroupal: true,
    includedServices: [
      "Alojamiento 4 noches en hotel céntrico",
      "Desayuno diario",
      "Traslados aeropuerto - hotel - aeropuerto",
      "Excursión Glaciar Perito Moreno con pasarelas",
      "Navegación Ríos de Hielo",
      "Coordinador de viaje",
      "Seguro de viaje",
    ],
    additionalServices: [
      "Minitrekking sobre el glaciar",
      "Estancia patagónica con asado",
      "Excursión El Chaltén",
      "Safari náutico Upsala",
    ],
  },
  {
    id: 8,
    slug: "cancun-riviera-maya",
    name: "Cancún & Riviera Maya",
    description:
      "Playas caribeñas, ruinas mayas y cenotes mágicos. El mejor del Caribe mexicano.",
    longDescription:
      "Descubrí el paraíso del Caribe mexicano. Disfrutá de las playas de Cancún, explorá las ruinas de Tulum y Chichén Itzá, nadá en cenotes cristalinos y viví la magia de la Riviera Maya con su gastronomía y cultura única.",
    destination: "Caribe",
    destinationSlug: "caribe",
    price: "USD 1.650",
    duration: "8 días / 7 noches",
    nights: 7,
    dates: ["15 Mar 2026", "5 Abr 2026", "19 Abr 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=2070",
    isFeatured: true,
    includedServices: [
      "Alojamiento 7 noches hotel 4 estrellas",
      "Desayuno diario",
      "Traslados aeropuerto - hotel - aeropuerto",
      "Excursión Tulum con cenote",
      "Excursión Chichén Itzá",
      "Seguro de viaje",
    ],
    additionalServices: [
      "Upgrade a All Inclusive",
      "Nado con tortugas en Akumal",
      "Parque Xcaret o Xel-Há",
      "Tour a Isla Mujeres",
    ],
  },
  {
    id: 9,
    slug: "nueva-york-compras",
    name: "Nueva York Esencial",
    description:
      "La ciudad que nunca duerme te espera. Times Square, Central Park, Estatua de la Libertad y mucho más.",
    longDescription:
      "Viví la experiencia de la Gran Manzana. Caminá por Times Square, recorré Central Park, visitá la Estatua de la Libertad, subí al Empire State y descubrí los mejores museos del mundo. Nueva York es una ciudad que tenés que vivir al menos una vez.",
    destination: "Estados Unidos",
    destinationSlug: "estados-unidos",
    price: "USD 2.200",
    duration: "7 días / 6 noches",
    nights: 6,
    dates: ["20 Abr 2026", "15 May 2026", "10 Jun 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070",
    isFeatured: true,
    includedServices: [
      "Alojamiento 6 noches en Manhattan",
      "Desayuno diario",
      "Traslados aeropuerto - hotel - aeropuerto",
      "City tour Nueva York",
      "Entrada Estatua de la Libertad y Ellis Island",
      "Entrada Empire State Building",
      "Seguro de viaje",
    ],
    additionalServices: [
      "Musical en Broadway",
      "Tour outlet Woodbury Common",
      "Paseo en helicóptero",
      "Tour NBA o MLB según temporada",
    ],
  },
  {
    id: 10,
    slug: "miami-orlando-parques",
    name: "Miami & Orlando con Parques",
    description:
      "Playas de Miami y la magia de Disney World y Universal Studios. El viaje perfecto para toda la familia.",
    longDescription:
      "Combiná las playas de South Beach con la magia de los parques de Orlando. Disfrutá de Disney World, Universal Studios, y el encanto de Miami en un solo viaje. Ideal para viajar en familia o con amigos.",
    destination: "Estados Unidos",
    destinationSlug: "estados-unidos",
    price: "USD 2.800",
    duration: "10 días / 9 noches",
    nights: 9,
    groupSize: "Máx. 20 personas",
    dates: ["5 Jul 2026", "15 Jul 2026", "1 Ago 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=2070",
    isGroupal: true,
    includedServices: [
      "Alojamiento 3 noches Miami + 6 noches Orlando",
      "Desayuno diario",
      "Traslados entre ciudades",
      "City tour Miami",
      "2 días Disney World",
      "1 día Universal Studios",
      "Coordinador de viaje",
      "Seguro de viaje",
    ],
    additionalServices: [
      "Día adicional en parques",
      "Cena con personajes Disney",
      "Tour Everglades",
      "Compras en outlets",
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
