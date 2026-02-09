-- ============================================
-- Tabla de itinerario por días
-- ============================================
CREATE TABLE package_itinerary_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_itinerary_package ON package_itinerary_days(package_id);

-- RLS
ALTER TABLE package_itinerary_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view itinerary days"
    ON package_itinerary_days FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage itinerary days"
    ON package_itinerary_days FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Trigger updated_at
CREATE TRIGGER update_package_itinerary_days_updated_at
    BEFORE UPDATE ON package_itinerary_days
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Nuevas columnas para personalización del botón en el nav
-- ============================================
ALTER TABLE special_sections
    ADD COLUMN nav_label VARCHAR(100),
    ADD COLUMN nav_icon_name VARCHAR(50) DEFAULT 'Sun',
    ADD COLUMN nav_color VARCHAR(20) DEFAULT '#FE4F00';
