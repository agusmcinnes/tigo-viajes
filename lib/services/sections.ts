import { createClient } from "@/lib/supabase/server";
import type {
  SpecialSection,
  SpecialSectionFeature,
  SpecialSectionFull,
  InsertTables,
  UpdateTables,
} from "@/lib/types/database";
import { toDisplayFormat } from "./packages";

// ============================================
// OPERACIONES DE LECTURA (Públicas)
// ============================================

export async function getSections(): Promise<SpecialSection[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("special_sections")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getSectionBySlug(
  slug: string
): Promise<SpecialSectionFull | null> {
  const supabase = await createClient();

  // Obtener la sección
  const { data: section, error } = await supabase
    .from("special_sections")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !section) return null;

  // Obtener features
  const { data: features } = await supabase
    .from("special_section_features")
    .select("*")
    .eq("section_id", section.id)
    .order("display_order", { ascending: true });

  // Obtener paquetes de esta sección
  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .eq("special_section_id", section.id)
    .eq("is_active", true)
    .order("is_featured", { ascending: false });

  return {
    ...section,
    features: features || [],
    packages: packages || [],
  };
}

export async function getActiveSection(): Promise<SpecialSectionFull | null> {
  const supabase = await createClient();

  // Obtener la primera sección activa (por orden)
  const { data: section, error } = await supabase
    .from("special_sections")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .limit(1)
    .single();

  if (error || !section) return null;

  // Obtener features
  const { data: features } = await supabase
    .from("special_section_features")
    .select("*")
    .eq("section_id", section.id)
    .order("display_order", { ascending: true });

  // Obtener paquetes de esta sección
  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .eq("special_section_id", section.id)
    .eq("is_active", true)
    .order("is_featured", { ascending: false });

  return {
    ...section,
    features: features || [],
    packages: packages || [],
  };
}

// ============================================
// OPERACIONES ADMIN (CRUD)
// ============================================

export async function getSectionsAdmin(): Promise<SpecialSectionFull[]> {
  const supabase = await createClient();

  const { data: sections, error } = await supabase
    .from("special_sections")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;

  // Obtener features y paquetes para cada sección
  const sectionsWithData = await Promise.all(
    (sections || []).map(async (section) => {
      const { data: features } = await supabase
        .from("special_section_features")
        .select("*")
        .eq("section_id", section.id)
        .order("display_order", { ascending: true });

      const { data: packages } = await supabase
        .from("packages")
        .select("*")
        .eq("special_section_id", section.id);

      return {
        ...section,
        features: features || [],
        packages: packages || [],
      };
    })
  );

  return sectionsWithData;
}

export async function getSectionAdminById(
  id: string
): Promise<SpecialSectionFull | null> {
  const supabase = await createClient();

  const { data: section, error } = await supabase
    .from("special_sections")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !section) return null;

  const { data: features } = await supabase
    .from("special_section_features")
    .select("*")
    .eq("section_id", section.id)
    .order("display_order", { ascending: true });

  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .eq("special_section_id", section.id);

  return {
    ...section,
    features: features || [],
    packages: packages || [],
  };
}

export async function createSection(
  data: InsertTables<"special_sections">
): Promise<SpecialSection> {
  const supabase = await createClient();

  const { data: section, error } = await supabase
    .from("special_sections")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return section;
}

export async function updateSection(
  id: string,
  data: UpdateTables<"special_sections">
): Promise<SpecialSection> {
  const supabase = await createClient();

  const { data: section, error } = await supabase
    .from("special_sections")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return section;
}

export async function deleteSection(id: string): Promise<void> {
  const supabase = await createClient();

  // Primero quitar la referencia de los paquetes
  await supabase
    .from("packages")
    .update({ special_section_id: null, is_special: false })
    .eq("special_section_id", id);

  // Luego eliminar la sección (los features se eliminan en cascada)
  const { error } = await supabase
    .from("special_sections")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function toggleSectionActive(
  id: string,
  isActive: boolean
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("special_sections")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) throw error;
}

// ============================================
// FEATURES
// ============================================

export async function addFeature(
  data: InsertTables<"special_section_features">
): Promise<SpecialSectionFeature> {
  const supabase = await createClient();

  const { data: feature, error } = await supabase
    .from("special_section_features")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return feature;
}

export async function updateFeature(
  id: string,
  data: UpdateTables<"special_section_features">
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("special_section_features")
    .update(data)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteFeature(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("special_section_features")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function updateFeatures(
  sectionId: string,
  features: Omit<InsertTables<"special_section_features">, "section_id">[]
): Promise<void> {
  const supabase = await createClient();

  // Eliminar features existentes
  await supabase
    .from("special_section_features")
    .delete()
    .eq("section_id", sectionId);

  // Insertar nuevos features
  if (features.length > 0) {
    const { error } = await supabase.from("special_section_features").insert(
      features.map((f, index) => ({
        ...f,
        section_id: sectionId,
        display_order: index,
      }))
    );

    if (error) throw error;
  }
}

// ============================================
// ASIGNAR PAQUETES A SECCIÓN
// ============================================

export async function assignPackagesToSection(
  sectionId: string,
  packageIds: string[]
): Promise<void> {
  const supabase = await createClient();

  // Quitar todos los paquetes de esta sección
  await supabase
    .from("packages")
    .update({ special_section_id: null, is_special: false })
    .eq("special_section_id", sectionId);

  // Asignar los paquetes seleccionados
  if (packageIds.length > 0) {
    const { error } = await supabase
      .from("packages")
      .update({ special_section_id: sectionId, is_special: true })
      .in("id", packageIds);

    if (error) throw error;
  }
}
