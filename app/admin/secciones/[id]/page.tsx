import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSectionAdminById } from "@/lib/services/sections";
import { SectionForm } from "@/components/admin/section-form";
import { ChevronLeft } from "lucide-react";

async function getData(id: string) {
  const supabase = await createClient();

  const [section, packagesRes] = await Promise.all([
    getSectionAdminById(id),
    supabase.from("packages").select("*").eq("is_active", true).order("name"),
  ]);

  return {
    section,
    packages: packagesRes.data || [],
  };
}

export default async function EditSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { section, packages } = await getData(id);

  if (!section) {
    notFound();
  }

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
          Editar Sección
        </h1>
        <p className="text-muted-foreground mt-1">{section.title}</p>
      </div>

      <SectionForm section={section} allPackages={packages} />
    </div>
  );
}
