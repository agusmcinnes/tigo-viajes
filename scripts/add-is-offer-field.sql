-- Script para agregar campo is_offer a la tabla packages
-- Ejecutar en el SQL Editor de Supabase

-- 1. Agregar columna is_offer con valor default false
ALTER TABLE packages
ADD COLUMN is_offer BOOLEAN DEFAULT false;

-- 2. Crear índice para consultas eficientes
CREATE INDEX idx_packages_is_offer ON packages(is_offer) WHERE is_offer = true;

-- 3. (Opcional) Verificar que se creó correctamente
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'packages' AND column_name = 'is_offer';
