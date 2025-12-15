import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PackageForm } from "@/components/admin/package-form";
import { ChevronLeft } from "lucide-react";

async function getData() {
  const supabase = await createClient();

  const [sectionsRes, destinationsRes] = await Promise.all([
    supabase.from("special_sections").select("*").eq("is_active", true),
    supabase.from("destinations").select("slug, name").eq("is_active", true),
  ]);

  return {
    sections: sectionsRes.data || [],
    destinations: destinationsRes.data || [],
  };
}

export default async function NewPackagePage() {
  const { sections, destinations } = await getData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/paquetes"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Volver a paquetes
        </Link>
        <h1 className="text-3xl font-display font-semibold text-foreground">
          Nuevo Paquete
        </h1>
        <p className="text-muted-foreground mt-1">
          Completá los datos del nuevo paquete de viaje
        </p>
      </div>

      <PackageForm sections={sections} destinations={destinations} />
    </div>
  );
}
