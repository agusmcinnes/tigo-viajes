import { createClient } from "@/lib/supabase/server";
import type {
  Destination,
  InsertTables,
  UpdateTables,
} from "@/lib/types/database";

// ============================================
// OPERACIONES DE LECTURA (Públicas)
// ============================================

export async function getDestinations(): Promise<Destination[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getDestinationBySlug(
  slug: string
): Promise<Destination | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data;
}

// ============================================
// OPERACIONES ADMIN (CRUD)
// ============================================

export async function getDestinationsAdmin(): Promise<Destination[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createDestination(
  data: InsertTables<"destinations">
): Promise<Destination> {
  const supabase = await createClient();

  const { data: destination, error } = await supabase
    .from("destinations")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return destination;
}

export async function updateDestination(
  id: string,
  data: UpdateTables<"destinations">
): Promise<Destination> {
  const supabase = await createClient();

  const { data: destination, error } = await supabase
    .from("destinations")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return destination;
}

export async function deleteDestination(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from("destinations").delete().eq("id", id);

  if (error) throw error;
}

export async function toggleDestinationActive(
  id: string,
  isActive: boolean
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("destinations")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) throw error;
}
