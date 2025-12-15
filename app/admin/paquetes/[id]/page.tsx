import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPackageAdminById } from "@/lib/services/packages";
import { PackageForm } from "@/components/admin/package-form";
import { ChevronLeft } from "lucide-react";

async function getData(id: string) {
  const supabase = await createClient();

  const [pkg, sectionsRes, destinationsRes] = await Promise.all([
    getPackageAdminById(id),
    supabase.from("special_sections").select("*").eq("is_active", true),
    supabase.from("destinations").select("slug, name").eq("is_active", true),
  ]);

  return {
    package: pkg,
    sections: sectionsRes.data || [],
    destinations: destinationsRes.data || [],
  };
}

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { package: pkg, sections, destinations } = await getData(id);

  if (!pkg) {
    notFound();
  }

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
          Editar Paquete
        </h1>
        <p className="text-muted-foreground mt-1">{pkg.name}</p>
      </div>

      <PackageForm
        package={pkg}
        sections={sections}
        destinations={destinations}
      />
    </div>
  );
}
