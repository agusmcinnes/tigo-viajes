-- ============================================
-- TIGO VIAJES - SUPABASE STORAGE
-- ============================================
-- Ejecutar DESPUES de crear las tablas
-- Dashboard > SQL Editor > New Query > Pegar y ejecutar

-- ============================================
-- CREAR BUCKETS
-- ============================================

-- Bucket para imagenes de paquetes
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'packages',
    'packages',
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Bucket para imagenes de secciones especiales
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'sections',
    'sections',
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Bucket para imagenes de destinos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'destinations',
    'destinations',
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- POLITICAS DE LECTURA PUBLICA
-- ============================================

-- Cualquiera puede ver las imagenes de paquetes
CREATE POLICY "Lectura publica de imagenes de paquetes"
ON storage.objects FOR SELECT
USING (bucket_id = 'packages');

-- Cualquiera puede ver las imagenes de secciones
CREATE POLICY "Lectura publica de imagenes de secciones"
ON storage.objects FOR SELECT
USING (bucket_id = 'sections');

-- Cualquiera puede ver las imagenes de destinos
CREATE POLICY "Lectura publica de imagenes de destinos"
ON storage.objects FOR SELECT
USING (bucket_id = 'destinations');

-- ============================================
-- POLITICAS DE ESCRITURA PARA AUTENTICADOS
-- ============================================

-- Solo usuarios autenticados pueden subir imagenes de paquetes
CREATE POLICY "Upload de imagenes de paquetes para autenticados"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'packages');

-- Solo usuarios autenticados pueden subir imagenes de secciones
CREATE POLICY "Upload de imagenes de secciones para autenticados"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'sections');

-- Solo usuarios autenticados pueden subir imagenes de destinos
CREATE POLICY "Upload de imagenes de destinos para autenticados"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'destinations');

-- ============================================
-- POLITICAS DE ACTUALIZACION PARA AUTENTICADOS
-- ============================================

-- Solo usuarios autenticados pueden actualizar imagenes de paquetes
CREATE POLICY "Update de imagenes de paquetes para autenticados"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'packages');

-- Solo usuarios autenticados pueden actualizar imagenes de secciones
CREATE POLICY "Update de imagenes de secciones para autenticados"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'sections');

-- Solo usuarios autenticados pueden actualizar imagenes de destinos
CREATE POLICY "Update de imagenes de destinos para autenticados"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'destinations');

-- ============================================
-- POLITICAS DE ELIMINACION PARA AUTENTICADOS
-- ============================================

-- Solo usuarios autenticados pueden eliminar imagenes de paquetes
CREATE POLICY "Delete de imagenes de paquetes para autenticados"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'packages');

-- Solo usuarios autenticados pueden eliminar imagenes de secciones
CREATE POLICY "Delete de imagenes de secciones para autenticados"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'sections');

-- Solo usuarios autenticados pueden eliminar imagenes de destinos
CREATE POLICY "Delete de imagenes de destinos para autenticados"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'destinations');
