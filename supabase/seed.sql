-- ============================================
-- TIGO VIAJES - DATOS INICIALES (SEED)
-- ============================================
-- Ejecutar DESPUES de 001_create_tables.sql
-- Paquetes reales: VERANO 2026 - Viajes en Bus

-- ============================================
-- DESTINOS
-- ============================================
INSERT INTO destinations (slug, name, image_url, display_order) VALUES
('argentina', 'Argentina', 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=400', 1),
('brasil', 'Brasil', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=400', 2);

-- ============================================
-- SECCION ESPECIAL: VERANO 2026
-- ============================================
INSERT INTO special_sections (slug, title, subtitle, badge_text, background_image_url, promo_title, promo_description, cta_text, display_order) VALUES
('verano-2026', 'Verano 2026', 'Viajes grupales en bus de ultima generacion. Coordinador permanente, servicio a bordo y las mejores experiencias.', 'Paquetes Argentina Locales en Bus', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073', 'Cupos Limitados', '40 pasajeros por salida - Reserva con anticipacion', 'Ver Paquetes', 1);

-- Features de Verano 2026
INSERT INTO special_section_features (section_id, icon_name, title, description, display_order) VALUES
((SELECT id FROM special_sections WHERE slug = 'verano-2026'), 'Bus', 'Bus de Ultima Generacion', 'Viaja comodo en buses Mix con aire acondicionado y servicio a bordo', 1),
((SELECT id FROM special_sections WHERE slug = 'verano-2026'), 'Users', 'Grupos de 40 Pasajeros', 'Viajes grupales con ambiente familiar y coordinador permanente', 2),
((SELECT id FROM special_sections WHERE slug = 'verano-2026'), 'MapPin', 'Destinos Increibles', 'Desde las Termas de Federacion hasta los Glaciares de la Patagonia', 3);

-- ============================================
-- PAQUETE 1: FEDERACION CON CARNAVALES DE GUALEGUAYCHU
-- ============================================
INSERT INTO packages (
    slug,
    name,
    description,
    long_description,
    destination,
    destination_slug,
    days,
    nights,
    group_size,
    is_groupal,
    base_price,
    currency,
    image_url,
    included_services,
    not_included_services,
    optional_excursions,
    is_featured,
    is_special,
    special_section_id
) VALUES (
    'federacion-carnavales-gualeguaychu',
    'Federacion con Carnavales de Gualeguaychu',
    'Disfruta de las termas de Federacion y vivi la fiesta de los Carnavales de Gualeguaychu, el carnaval mas grande de Argentina.',
    'Un viaje unico que combina el relax de las termas de Federacion con la energia de los Carnavales de Gualeguaychu. Alojamiento en Hotel Nueva Estacion 3 estrellas con desayuno incluido. Incluye traslado al Corsodromo para disfrutar del espectaculo de carnaval mas impresionante del pais.',
    'Argentina',
    'argentina',
    6,
    4,
    '40 Pasajeros',
    TRUE,
    440000,
    'ARS',
    'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?q=80&w=2070',
    ARRAY[
        '4 Noches en Hotel Nueva Estacion 3*** o similar',
        'Regimen: Desayuno',
        'Traslado al Corsodromo de Gualeguaychu',
        'Bus Mix de ultima generacion',
        'Servicio a bordo',
        'Coordinador Permanente'
    ],
    ARRAY[
        'Comidas en destino y ruta',
        'Bebidas en destino y ruta',
        'Gastos personales',
        'Seguro de asistencia al viajero (Recomendamos contratarlo)'
    ],
    ARRAY[
        'Parque hidrotermal Chajari',
        'Parque Acuatico de Federacion',
        'Salto Grande y Concordia'
    ],
    TRUE,
    TRUE,
    (SELECT id FROM special_sections WHERE slug = 'verano-2026')
);

-- Fecha de salida: Federacion + Carnavales
INSERT INTO package_departure_dates (package_id, departure_date, price, currency) VALUES
((SELECT id FROM packages WHERE slug = 'federacion-carnavales-gualeguaychu'), '2026-01-12', 440000, 'ARS');

-- ============================================
-- PAQUETE 2: LOS GLACIARES - TIERRA DE GIGANTES DE HIELO
-- ============================================
INSERT INTO packages (
    slug,
    name,
    description,
    long_description,
    destination,
    destination_slug,
    days,
    nights,
    group_size,
    is_groupal,
    base_price,
    currency,
    image_url,
    included_services,
    not_included_services,
    optional_excursions,
    is_featured,
    is_special,
    special_section_id
) VALUES (
    'los-glaciares-tierra-gigantes',
    'Los Glaciares - Tierra de Gigantes de Hielo',
    'Descubri la majestuosidad de los glaciares patagonicos. Una experiencia unica en el fin del mundo.',
    'Viaja a la Patagonia argentina y contempla los imponentes glaciares. El Calafate te espera con paisajes de otro mundo, donde el hielo milenario se encuentra con lagos de aguas turquesas. Alojamiento en hotel 3 estrellas con desayuno.',
    'Argentina',
    'argentina',
    6,
    4,
    '40 Pasajeros',
    TRUE,
    690000,
    'ARS',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070',
    ARRAY[
        '4 Noches en Hotel 3***',
        'Regimen: Desayuno',
        'Bus Mix de ultima generacion',
        'Servicio a bordo',
        'Coordinador Permanente'
    ],
    ARRAY[
        'Comidas en destino y ruta',
        'Bebidas en destino y ruta',
        'Gastos personales',
        'Seguro de asistencia al viajero (Recomendamos contratarlo)',
        'Entrada en Parques Nacionales, Provinciales y Museos'
    ],
    ARRAY[
        'Glaciar Perito Moreno',
        'Navegacion Rio de Hielo',
        'El Chalten'
    ],
    TRUE,
    TRUE,
    (SELECT id FROM special_sections WHERE slug = 'verano-2026')
);

-- Fecha de salida: Los Glaciares
INSERT INTO package_departure_dates (package_id, departure_date, price, currency) VALUES
((SELECT id FROM packages WHERE slug = 'los-glaciares-tierra-gigantes'), '2026-01-23', 690000, 'ARS');

-- ============================================
-- PAQUETE 3: FEDERACION Y CAMBORIÚ
-- ============================================
INSERT INTO packages (
    slug,
    name,
    description,
    long_description,
    destination,
    destination_slug,
    days,
    nights,
    group_size,
    is_groupal,
    base_price,
    currency,
    image_url,
    included_services,
    not_included_services,
    optional_excursions,
    is_featured,
    is_special,
    special_section_id
) VALUES (
    'federacion-camboriu',
    'Federacion y Camboriu',
    'Combina el relax de las termas argentinas con las playas paradisiacas de Brasil. 10 dias de pura aventura.',
    'Un viaje internacional que comienza en las termas de Federacion y continua hacia las espectaculares playas de Camboriu en Brasil. Una noche en Hotel Nueva Estacion y 7 noches en el exclusivo Hotel Marambaia 4 estrellas con media pension.',
    'Brasil',
    'brasil',
    10,
    8,
    '40 Pasajeros',
    TRUE,
    990,
    'USD',
    'https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=2069',
    ARRAY[
        '1 Noche en Hotel Nueva Estacion 3*** o similar (Federacion)',
        'Regimen: Desayuno en Federacion',
        '7 Noches en Hotel Marambaia 4**** o similar (Camboriu)',
        'Regimen: Media Pension en Camboriu',
        'Bus Mix de ultima generacion',
        'Servicio a bordo',
        'Coordinador Permanente'
    ],
    ARRAY[
        'Comidas en destino y ruta (excepto las incluidas)',
        'Bebidas en destino y ruta',
        'Gastos personales',
        'Seguro de asistencia al viajero (Recomendamos contratarlo)'
    ],
    ARRAY[
        'Paseo en Barco Pirata',
        'Bombinhas',
        'Florianopolis con Canasvieiras',
        'Teleferico Unipraias'
    ],
    TRUE,
    TRUE,
    (SELECT id FROM special_sections WHERE slug = 'verano-2026')
);

-- Fecha de salida: Federacion y Camboriu
INSERT INTO package_departure_dates (package_id, departure_date, price, currency) VALUES
((SELECT id FROM packages WHERE slug = 'federacion-camboriu'), '2026-01-31', 990, 'USD');

-- ============================================
-- PAQUETE 4: CATARATAS DEL IGUAZU
-- ============================================
INSERT INTO packages (
    slug,
    name,
    description,
    long_description,
    destination,
    destination_slug,
    days,
    nights,
    group_size,
    is_groupal,
    base_price,
    currency,
    image_url,
    included_services,
    not_included_services,
    optional_excursions,
    is_featured,
    is_special,
    special_section_id
) VALUES (
    'cataratas-iguazu-verano-2026',
    'Cataratas del Iguazu',
    'Una de las 7 Maravillas Naturales del Mundo te espera. Incluye visita a Minas de Wanda y Ruinas de San Ignacio.',
    'Vivi la experiencia de las Cataratas del Iguazu, una de las maravillas naturales mas impresionantes del planeta. Este paquete incluye visita a las Minas de Wanda, las historicas Ruinas de San Ignacio y el Parque Nacional Cataratas Argentinas. Alojamiento en Hotel Gran Crucero 3 estrellas con media pension.',
    'Argentina',
    'argentina',
    6,
    4,
    '40 Pasajeros',
    TRUE,
    560000,
    'ARS',
    'https://images.unsplash.com/photo-1540991825428-5b54b09f7338?q=80&w=2070',
    ARRAY[
        '4 Noches en Hotel Gran Crucero 3***',
        'Regimen: Media Pension',
        'Visita Minas de Wanda',
        'Visita Ruinas de San Ignacio',
        'Visita Parque Nacional Cataratas Argentinas',
        'Bus Mix de ultima generacion',
        'Servicio a bordo',
        'Coordinador Permanente'
    ],
    ARRAY[
        'Comidas en destino y ruta (excepto las incluidas)',
        'Bebidas en destino y ruta',
        'Gastos personales',
        'Seguro de asistencia al viajero (Recomendamos contratarlo)',
        'Entrada en Parques Nacionales, Provinciales y Museos'
    ],
    ARRAY[
        'Paseo de Compras a Ciudad del Este',
        'Macuco Safari (Gomon)',
        'Parque de las Aves y Parque Nacional Iguazu Brasil',
        'Museo de Cera, Rueda del Mundo e Hito Tres Fronteras'
    ],
    TRUE,
    TRUE,
    (SELECT id FROM special_sections WHERE slug = 'verano-2026')
);

-- Fecha de salida: Cataratas del Iguazu
INSERT INTO package_departure_dates (package_id, departure_date, price, currency) VALUES
((SELECT id FROM packages WHERE slug = 'cataratas-iguazu-verano-2026'), '2026-02-01', 560000, 'ARS');
