-- ============================================
-- TIGO VIAJES - DATOS INICIALES (SEED)
-- ============================================
-- Ejecutar DESPUÉS de 001_create_tables.sql

-- ============================================
-- DESTINOS
-- ============================================
INSERT INTO destinations (slug, name, image_url, display_order) VALUES
('argentina', 'Argentina', 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=400', 1),
('brasil', 'Brasil', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=400', 2),
('caribe', 'Caribe', 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=400', 3),
('europa', 'Europa', 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=400', 4),
('estados-unidos', 'Estados Unidos', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=400', 5);

-- ============================================
-- SECCIÓN ESPECIAL: VERANO 2026
-- ============================================
INSERT INTO special_sections (slug, title, subtitle, badge_text, background_image_url, promo_title, promo_description, cta_text, display_order) VALUES
('verano-2026', 'Verano 2026', 'Asegurá tus vacaciones con los mejores precios. Sol, playa y aventura te esperan.', 'Ofertas Especiales - Cupos Limitados', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073', 'Reserva anticipada', 'Hasta 20% OFF reservando antes del 31 de Marzo', 'Ver Ofertas', 1);

-- Features de Verano 2026
INSERT INTO special_section_features (section_id, icon_name, title, description, display_order) VALUES
((SELECT id FROM special_sections WHERE slug = 'verano-2026'), 'Sun', 'Sol Garantizado', 'Los mejores destinos de playa para disfrutar del verano', 1),
((SELECT id FROM special_sections WHERE slug = 'verano-2026'), 'Umbrella', 'All Inclusive', 'Opciones con todo incluido para despreocuparte', 2),
((SELECT id FROM special_sections WHERE slug = 'verano-2026'), 'Waves', 'Playas Paradisíacas', 'Desde el Caribe hasta la costa argentina', 3);

-- ============================================
-- PAQUETES REGULARES
-- ============================================

-- Cataratas del Iguazú
INSERT INTO packages (slug, name, description, long_description, destination, destination_slug, days, nights, group_size, is_groupal, base_price, currency, image_url, included_services, optional_excursions, is_featured) VALUES
('cataratas-iguazu-selva-misionera', 'Cataratas del Iguazú + Selva Misionera', 'Descubrí una de las maravillas naturales del mundo con excursiones a ambos lados de las cataratas y aventuras en la selva.', 'Viví una experiencia única en las Cataratas del Iguazú, una de las Siete Maravillas Naturales del Mundo. Este paquete incluye visitas a ambos lados de las cataratas (argentino y brasileño), paseos en lancha bajo los saltos, y aventuras en la selva misionera.', 'Argentina', 'argentina', 5, 4, 'Máx. 20 personas', TRUE, 890, 'USD', 'https://images.unsplash.com/photo-1540991825428-5b54b09f7338?q=80&w=2070', ARRAY['Alojamiento 4 noches en hotel 4 estrellas', 'Desayuno buffet diario', 'Traslados aeropuerto - hotel - aeropuerto', 'Excursión Cataratas lado argentino', 'Excursión Cataratas lado brasileño', 'Paseo en lancha Gran Aventura', 'Coordinador de viaje Tigo', 'Seguro de viaje básico'], ARRAY['Excursión Minas de Wanda', 'Cena de despedida con show', 'Upgrade a hotel 5 estrellas', 'Seguro premium con cobertura médica ampliada'], TRUE);

-- Río de Janeiro & Buzios
INSERT INTO packages (slug, name, description, long_description, destination, destination_slug, days, nights, group_size, is_groupal, base_price, currency, image_url, included_services, optional_excursions, is_featured) VALUES
('rio-janeiro-buzios', 'Río de Janeiro & Buzios', 'Combiná el ritmo de Rio con la tranquilidad de las playas de Buzios. Cristo Redentor, Pan de Azúcar y más.', 'Descubrí la ciudad maravillosa y sus playas paradisíacas. Visitá el Cristo Redentor, subí al Pan de Azúcar, caminá por Copacabana e Ipanema, y luego relajate en las exclusivas playas de Buzios.', 'Brasil', 'brasil', 7, 6, 'Máx. 15 personas', TRUE, 1250, 'USD', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070', ARRAY['Alojamiento 3 noches en Rio + 3 noches en Buzios', 'Desayuno diario', 'Traslados aeropuerto y entre ciudades', 'City tour Rio de Janeiro', 'Entrada Cristo Redentor', 'Subida al Pan de Azúcar', 'Coordinador de viaje', 'Seguro de viaje'], ARRAY['Tour a Angra dos Reis', 'Paseo en barco por Buzios', 'Cena en restaurante típico', 'Clase de samba'], TRUE);

-- Punta Cana All Inclusive
INSERT INTO packages (slug, name, description, long_description, destination, destination_slug, days, nights, base_price, currency, image_url, included_services, optional_excursions, is_featured) VALUES
('punta-cana-all-inclusive', 'Punta Cana All Inclusive', 'Relajate en las playas paradisíacas del Caribe con todo incluido. Hoteles 5 estrellas y excursiones opcionales.', 'El destino soñado del Caribe te espera. Disfrutá de playas de arena blanca, aguas cristalinas y el mejor sistema all inclusive en hoteles 5 estrellas.', 'Caribe', 'caribe', 8, 7, 1890, 'USD', 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2074', ARRAY['Alojamiento 7 noches hotel 5 estrellas', 'Sistema All Inclusive (comidas y bebidas)', 'Traslados aeropuerto - hotel - aeropuerto', 'Acceso a todas las instalaciones del resort', 'Deportes acuáticos no motorizados', 'Entretenimiento nocturno', 'Seguro de viaje'], ARRAY['Excursión Isla Saona', 'Nado con delfines', 'Tour a Santo Domingo', 'Spa premium', 'Upgrade a suite con vista al mar'], TRUE);

-- Bariloche & Ruta de los 7 Lagos
INSERT INTO packages (slug, name, description, long_description, destination, destination_slug, days, nights, group_size, is_groupal, base_price, currency, image_url, included_services, optional_excursions) VALUES
('bariloche-ruta-7-lagos', 'Bariloche & Ruta de los 7 Lagos', 'Viví la magia de la Patagonia argentina. Lagos cristalinos, bosques milenarios y la encantadora ciudad de Bariloche.', 'Descubrí la Suiza argentina en este viaje por la Patagonia. Recorré la famosa Ruta de los 7 Lagos, visitá el Circuito Chico, navegá el lago Nahuel Huapi.', 'Argentina', 'argentina', 6, 5, 'Máx. 25 personas', TRUE, 750, 'USD', 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=2070', ARRAY['Alojamiento 5 noches en hotel céntrico', 'Desayuno buffet diario', 'Traslados aeropuerto - hotel - aeropuerto', 'Excursión Circuito Chico', 'Excursión Ruta de los 7 Lagos', 'Navegación Isla Victoria y Bosque de Arrayanes', 'Coordinador de viaje', 'Seguro de viaje'], ARRAY['Excursión Cerro Catedral', 'Rafting en el río Manso', 'Cena show en restaurant patagónico', 'Tour de chocolaterías']);

-- Florianópolis Clásico
INSERT INTO packages (slug, name, description, long_description, destination, destination_slug, days, nights, base_price, currency, image_url, included_services, optional_excursions) VALUES
('florianopolis-clasico', 'Florianópolis Clásico', 'Sol, playas increíbles y la mejor vida nocturna de Brasil. El destino favorito de los argentinos.', 'La isla mágica de Santa Catarina te espera con más de 40 playas para explorar.', 'Brasil', 'brasil', 7, 6, 980, 'USD', 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=2069', ARRAY['Alojamiento 6 noches en posada/hotel', 'Desayuno diario', 'Traslados aeropuerto - hotel - aeropuerto', 'City tour por la isla', 'Excursión playas del norte', 'Seguro de viaje'], ARRAY['Excursión Beto Carrero World', 'Paseo en barco por la costa', 'Tour gastronómico', 'Alquiler de auto por día']);

-- Europa Clásica
INSERT INTO packages (slug, name, description, long_description, destination, destination_slug, days, nights, group_size, is_groupal, base_price, currency, image_url, included_services, optional_excursions, is_featured) VALUES
('europa-clasica-roma-paris-madrid', 'Europa Clásica: Roma, París & Madrid', 'Recorré las capitales más emblemáticas de Europa con guía en español. Historia, arte y gastronomía.', 'Un viaje soñado por las capitales más fascinantes de Europa. Descubrí la historia del Coliseo y el Vaticano en Roma, enamoráte de la Torre Eiffel.', 'Europa', 'europa', 15, 14, 'Máx. 20 personas', TRUE, 3450, 'USD', 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020', ARRAY['Alojamiento 14 noches en hoteles 4 estrellas', 'Desayuno buffet diario', 'Vuelos internos Europa', 'Traslados entre ciudades en tren de alta velocidad', 'Entradas Coliseo y Vaticano', 'Entrada Torre Eiffel', 'Entrada Museo del Prado', 'Guía en español todo el recorrido', 'Coordinador de viaje Tigo', 'Seguro de viaje internacional'], ARRAY['Excursión a Versalles', 'Tour Toledo desde Madrid', 'Cena crucero por el Sena', 'Noche de flamenco en Madrid', 'Visita a Pompeya desde Roma'], TRUE);

-- El Calafate & Glaciar Perito Moreno
INSERT INTO packages (slug, name, description, long_description, destination, destination_slug, days, nights, group_size, is_groupal, base_price, currency, image_url, included_services, optional_excursions) VALUES
('calafate-glaciares', 'El Calafate & Glaciar Perito Moreno', 'Contemplá la majestuosidad del Glaciar Perito Moreno y navegá entre témpanos milenarios.', 'Una experiencia única en el fin del mundo. Visitá el imponente Glaciar Perito Moreno.', 'Argentina', 'argentina', 5, 4, 'Máx. 20 personas', TRUE, 1100, 'USD', 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070', ARRAY['Alojamiento 4 noches en hotel céntrico', 'Desayuno diario', 'Traslados aeropuerto - hotel - aeropuerto', 'Excursión Glaciar Perito Moreno con pasarelas', 'Navegación Ríos de Hielo', 'Coordinador de viaje', 'Seguro de viaje'], ARRAY['Minitrekking sobre el glaciar', 'Estancia patagónica con asado', 'Excursión El Chaltén', 'Safari náutico Upsala']);

-- Cancún & Riviera Maya
INSERT INTO packages (slug, name, description, long_description, destination, destination_slug, days, nights, base_price, currency, image_url, included_services, optional_excursions, is_featured) VALUES
('cancun-riviera-maya', 'Cancún & Riviera Maya', 'Playas caribeñas, ruinas mayas y cenotes mágicos. El mejor del Caribe mexicano.', 'Descubrí el paraíso del Caribe mexicano. Disfrutá de las playas de Cancún, explorá las ruinas de Tulum y Chichén Itzá.', 'Caribe', 'caribe', 8, 7, 1650, 'USD', 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=2070', ARRAY['Alojamiento 7 noches hotel 4 estrellas', 'Desayuno diario', 'Traslados aeropuerto - hotel - aeropuerto', 'Excursión Tulum con cenote', 'Excursión Chichén Itzá', 'Seguro de viaje'], ARRAY['Upgrade a All Inclusive', 'Nado con tortugas en Akumal', 'Parque Xcaret o Xel-Há', 'Tour a Isla Mujeres'], TRUE);

-- Nueva York Esencial
INSERT INTO packages (slug, name, description, long_description, destination, destination_slug, days, nights, base_price, currency, image_url, included_services, optional_excursions, is_featured) VALUES
('nueva-york-esencial', 'Nueva York Esencial', 'La ciudad que nunca duerme te espera. Times Square, Central Park, Estatua de la Libertad y mucho más.', 'Viví la experiencia de la Gran Manzana. Caminá por Times Square, recorré Central Park.', 'Estados Unidos', 'estados-unidos', 7, 6, 2200, 'USD', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070', ARRAY['Alojamiento 6 noches en Manhattan', 'Desayuno diario', 'Traslados aeropuerto - hotel - aeropuerto', 'City tour Nueva York', 'Entrada Estatua de la Libertad y Ellis Island', 'Entrada Empire State Building', 'Seguro de viaje'], ARRAY['Musical en Broadway', 'Tour outlet Woodbury Common', 'Paseo en helicóptero', 'Tour NBA o MLB según temporada'], TRUE);

-- Miami & Orlando con Parques
INSERT INTO packages (slug, name, description, long_description, destination, destination_slug, days, nights, group_size, is_groupal, base_price, currency, image_url, included_services, optional_excursions) VALUES
('miami-orlando-parques', 'Miami & Orlando con Parques', 'Playas de Miami y la magia de Disney World y Universal Studios. El viaje perfecto para toda la familia.', 'Combiná las playas de South Beach con la magia de los parques de Orlando.', 'Estados Unidos', 'estados-unidos', 10, 9, 'Máx. 20 personas', TRUE, 2800, 'USD', 'https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=2070', ARRAY['Alojamiento 3 noches Miami + 6 noches Orlando', 'Desayuno diario', 'Traslados entre ciudades', 'City tour Miami', '2 días Disney World', '1 día Universal Studios', 'Coordinador de viaje', 'Seguro de viaje'], ARRAY['Día adicional en parques', 'Cena con personajes Disney', 'Tour Everglades', 'Compras en outlets']);

-- ============================================
-- PAQUETES ESPECIALES VERANO 2026
-- ============================================

-- Mar del Plata Clásico
INSERT INTO packages (slug, name, description, destination, destination_slug, days, nights, base_price, currency, image_url, included_services, is_featured, is_special, special_section_id) VALUES
('mar-del-plata-clasico', 'Mar del Plata Clásico', 'La perla del Atlántico te espera. Playas, casino, shows y la mejor gastronomía costera.', 'Argentina', 'argentina', 7, 6, 450000, 'ARS', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070', ARRAY['Alojamiento 6 noches en hotel 3 estrellas', 'Desayuno diario', 'Traslados terminal - hotel - terminal'], TRUE, TRUE, (SELECT id FROM special_sections WHERE slug = 'verano-2026'));

-- Florianópolis Premium
INSERT INTO packages (slug, name, description, destination, destination_slug, days, nights, group_size, is_groupal, base_price, currency, image_url, included_services, is_featured, is_special, special_section_id) VALUES
('florianopolis-premium', 'Florianópolis Premium', 'Las 42 playas más lindas de Brasil te esperan. Incluye traslados y excursiones.', 'Brasil', 'brasil', 8, 7, 'Máx. 20 personas', TRUE, 1150, 'USD', 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=2069', ARRAY['Alojamiento 7 noches en posada', 'Desayuno diario', 'Traslados aeropuerto - hotel - aeropuerto', 'Excursión playas del norte'], TRUE, TRUE, (SELECT id FROM special_sections WHERE slug = 'verano-2026'));

-- Punta Cana Verano All Inclusive
INSERT INTO packages (slug, name, description, destination, destination_slug, days, nights, base_price, currency, image_url, included_services, is_featured, is_special, special_section_id) VALUES
('punta-cana-verano-all-inclusive', 'Punta Cana All Inclusive', 'Resort 5 estrellas con todo incluido. Bebidas, comidas, actividades y entretenimiento.', 'Caribe', 'caribe', 8, 7, 1890, 'USD', 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2074', ARRAY['Alojamiento 7 noches hotel 5 estrellas', 'Sistema All Inclusive', 'Traslados aeropuerto - hotel - aeropuerto'], TRUE, TRUE, (SELECT id FROM special_sections WHERE slug = 'verano-2026'));

-- Buzios & Arraial do Cabo
INSERT INTO packages (slug, name, description, destination, destination_slug, days, nights, is_groupal, base_price, currency, image_url, included_services, is_special, special_section_id) VALUES
('buzios-arraial-do-cabo', 'Buzios & Arraial do Cabo', 'Combiná las playas más exclusivas de Brasil con el Caribe Brasileño.', 'Brasil', 'brasil', 7, 6, TRUE, 980, 'USD', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070', ARRAY['Alojamiento 6 noches', 'Desayuno diario', 'Traslados', 'Excursión Arraial do Cabo'], TRUE, (SELECT id FROM special_sections WHERE slug = 'verano-2026'));

-- Villa Gesell Familiar
INSERT INTO packages (slug, name, description, destination, destination_slug, days, nights, base_price, currency, image_url, included_services, is_special, special_section_id) VALUES
('villa-gesell-familiar', 'Villa Gesell Familiar', 'El destino familiar por excelencia. Playas tranquilas, bosques y diversión para toda la familia.', 'Argentina', 'argentina', 7, 6, 380000, 'ARS', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073', ARRAY['Alojamiento 6 noches en apart hotel', 'Traslados terminal - hotel - terminal'], TRUE, (SELECT id FROM special_sections WHERE slug = 'verano-2026'));

-- Cancún Verano Todo Incluido
INSERT INTO packages (slug, name, description, destination, destination_slug, days, nights, base_price, currency, image_url, included_services, is_featured, is_special, special_section_id) VALUES
('cancun-verano-todo-incluido', 'Cancún Todo Incluido', 'La Riviera Maya en su máximo esplendor. Pirámides, cenotes y las mejores playas.', 'Caribe', 'caribe', 8, 7, 2100, 'USD', 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=2070', ARRAY['Alojamiento 7 noches hotel 4 estrellas', 'Desayuno diario', 'Traslados aeropuerto - hotel - aeropuerto', 'Excursión Chichén Itzá'], TRUE, TRUE, (SELECT id FROM special_sections WHERE slug = 'verano-2026'));

-- ============================================
-- FECHAS DE SALIDA (Ejemplos)
-- ============================================

-- Cataratas del Iguazú
INSERT INTO package_departure_dates (package_id, departure_date, price, currency) VALUES
((SELECT id FROM packages WHERE slug = 'cataratas-iguazu-selva-misionera'), '2026-01-15', 890, 'USD'),
((SELECT id FROM packages WHERE slug = 'cataratas-iguazu-selva-misionera'), '2026-01-22', 890, 'USD'),
((SELECT id FROM packages WHERE slug = 'cataratas-iguazu-selva-misionera'), '2026-02-05', 920, 'USD'),
((SELECT id FROM packages WHERE slug = 'cataratas-iguazu-selva-misionera'), '2026-02-19', 920, 'USD');

-- Río de Janeiro & Buzios
INSERT INTO package_departure_dates (package_id, departure_date, price, currency) VALUES
((SELECT id FROM packages WHERE slug = 'rio-janeiro-buzios'), '2026-02-10', 1250, 'USD'),
((SELECT id FROM packages WHERE slug = 'rio-janeiro-buzios'), '2026-02-24', 1250, 'USD'),
((SELECT id FROM packages WHERE slug = 'rio-janeiro-buzios'), '2026-03-10', 1180, 'USD');

-- Punta Cana All Inclusive
INSERT INTO package_departure_dates (package_id, departure_date, price, currency) VALUES
((SELECT id FROM packages WHERE slug = 'punta-cana-all-inclusive'), '2026-03-05', 1890, 'USD'),
((SELECT id FROM packages WHERE slug = 'punta-cana-all-inclusive'), '2026-03-19', 1890, 'USD'),
((SELECT id FROM packages WHERE slug = 'punta-cana-all-inclusive'), '2026-04-02', 1790, 'USD'),
((SELECT id FROM packages WHERE slug = 'punta-cana-all-inclusive'), '2026-04-16', 1790, 'USD');

-- Europa Clásica
INSERT INTO package_departure_dates (package_id, departure_date, price, currency) VALUES
((SELECT id FROM packages WHERE slug = 'europa-clasica-roma-paris-madrid'), '2026-05-01', 3450, 'USD'),
((SELECT id FROM packages WHERE slug = 'europa-clasica-roma-paris-madrid'), '2026-06-15', 3650, 'USD'),
((SELECT id FROM packages WHERE slug = 'europa-clasica-roma-paris-madrid'), '2026-09-01', 3450, 'USD');

-- Mar del Plata Clásico
INSERT INTO package_departure_dates (package_id, departure_date, price, currency) VALUES
((SELECT id FROM packages WHERE slug = 'mar-del-plata-clasico'), '2026-01-04', 450000, 'ARS'),
((SELECT id FROM packages WHERE slug = 'mar-del-plata-clasico'), '2026-01-11', 450000, 'ARS'),
((SELECT id FROM packages WHERE slug = 'mar-del-plata-clasico'), '2026-01-18', 480000, 'ARS');

-- Florianópolis Premium
INSERT INTO package_departure_dates (package_id, departure_date, price, currency) VALUES
((SELECT id FROM packages WHERE slug = 'florianopolis-premium'), '2026-01-05', 1150, 'USD'),
((SELECT id FROM packages WHERE slug = 'florianopolis-premium'), '2026-01-12', 1150, 'USD'),
((SELECT id FROM packages WHERE slug = 'florianopolis-premium'), '2026-01-19', 1200, 'USD');
