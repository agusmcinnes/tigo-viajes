import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SectionForm } from "@/components/admin/section-form";
import { ChevronLeft } from "lucide-react";
import type { Package } from "@/lib/types/database";

async function getData() {
  const supabase = await createClient();

  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .order("name");

  return {
    packages: (packages || []) as Package[],
  };
}

export default async function NewSectionPage() {
  const { packages } = await getData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/secciones"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Volver a secciones
        </Link>
        <h1 className="text-3xl font-display font-semibold text-foreground">
          Nueva Sección
        </h1>
        <p className="text-muted-foreground mt-1">
          Creá una nueva sección especial
        </p>
      </div>

      <SectionForm allPackages={packages} />
    </div>
  );
}
