-- ============================================
-- TIGO VIAJES - SCHEMA DE BASE DE DATOS
-- ============================================
-- Ejecutar este script en Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Pegar y ejecutar

-- Habilitar UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLA: destinations (Destinos)
-- ============================================
CREATE TABLE IF NOT EXISTS destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: special_sections (Secciones especiales)
-- ============================================
CREATE TABLE IF NOT EXISTS special_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,

    -- Contenido principal
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    badge_text VARCHAR(100),

    -- Imagen de fondo
    background_image_url TEXT,

    -- Banner promocional
    promo_title VARCHAR(255),
    promo_description TEXT,

    -- Call to action
    cta_text VARCHAR(100) DEFAULT 'Ver Ofertas',
    cta_url VARCHAR(255),

    -- Estado
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,

    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: special_section_features (Características)
-- ============================================
CREATE TABLE IF NOT EXISTS special_section_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_id UUID NOT NULL REFERENCES special_sections(id) ON DELETE CASCADE,

    -- Contenido
    icon_name VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,

    -- Orden
    display_order INTEGER DEFAULT 0,

    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_features_section ON special_section_features(section_id);

-- ============================================
-- TABLA: packages (Paquetes de viaje)
-- ============================================
CREATE TABLE IF NOT EXISTS packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,

    -- Destino
    destination VARCHAR(100) NOT NULL,
    destination_slug VARCHAR(100) NOT NULL,

    -- Duración
    days INTEGER NOT NULL DEFAULT 1,
    nights INTEGER NOT NULL DEFAULT 0,

    -- Grupo
    group_size VARCHAR(100),
    is_groupal BOOLEAN DEFAULT FALSE,

    -- Precio base (referencia para mostrar)
    base_price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',

    -- Imagen
    image_url TEXT NOT NULL,

    -- Servicios (arrays de texto)
    included_services TEXT[] DEFAULT '{}',
    not_included_services TEXT[] DEFAULT '{}',
    optional_excursions TEXT[] DEFAULT '{}',

    -- Flags
    is_featured BOOLEAN DEFAULT FALSE,
    is_special BOOLEAN DEFAULT FALSE,
    special_section_id UUID REFERENCES special_sections(id) ON DELETE SET NULL,

    -- Estado
    is_active BOOLEAN DEFAULT TRUE,

    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_packages_destination ON packages(destination_slug);
CREATE INDEX IF NOT EXISTS idx_packages_featured ON packages(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_packages_special ON packages(is_special) WHERE is_special = TRUE;
CREATE INDEX IF NOT EXISTS idx_packages_active ON packages(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_packages_section ON packages(special_section_id);

-- ============================================
-- TABLA: package_departure_dates (Fechas de salida)
-- ============================================
CREATE TABLE IF NOT EXISTS package_departure_dates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,

    -- Fecha de salida
    departure_date DATE NOT NULL,

    -- Precio específico para esta fecha
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',

    -- Disponibilidad
    available_spots INTEGER,
    is_sold_out BOOLEAN DEFAULT FALSE,

    -- Estado
    is_active BOOLEAN DEFAULT TRUE,

    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_departure_dates_package ON package_departure_dates(package_id);
CREATE INDEX IF NOT EXISTS idx_departure_dates_date ON package_departure_dates(departure_date);

-- ============================================
-- FUNCIÓN: Actualizar updated_at automáticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at
DROP TRIGGER IF EXISTS update_destinations_updated_at ON destinations;
CREATE TRIGGER update_destinations_updated_at
    BEFORE UPDATE ON destinations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_special_sections_updated_at ON special_sections;
CREATE TRIGGER update_special_sections_updated_at
    BEFORE UPDATE ON special_sections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_features_updated_at ON special_section_features;
CREATE TRIGGER update_features_updated_at
    BEFORE UPDATE ON special_section_features
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_packages_updated_at ON packages;
CREATE TRIGGER update_packages_updated_at
    BEFORE UPDATE ON packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_departure_dates_updated_at ON package_departure_dates;
CREATE TRIGGER update_departure_dates_updated_at
    BEFORE UPDATE ON package_departure_dates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_section_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_departure_dates ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública (anon puede leer datos activos)
CREATE POLICY "Lectura pública destinos" ON destinations
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Lectura pública secciones" ON special_sections
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Lectura pública features" ON special_section_features
    FOR SELECT USING (TRUE);

CREATE POLICY "Lectura pública paquetes" ON packages
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Lectura pública fechas" ON package_departure_dates
    FOR SELECT USING (is_active = TRUE);

-- Políticas de escritura para usuarios autenticados (admin)
CREATE POLICY "Admin destinos" ON destinations
    FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin secciones" ON special_sections
    FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin features" ON special_section_features
    FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin paquetes" ON packages
    FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin fechas" ON package_departure_dates
    FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
