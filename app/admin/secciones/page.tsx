import Link from "next/link";
import { getSectionsAdmin } from "@/lib/services/sections";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Package } from "lucide-react";
import { SectionActions } from "./section-actions";

export default async function SectionsPage() {
  const sections = await getSectionsAdmin();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Secciones Especiales
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestiona las secciones especiales como Verano 2026, Semana Santa, etc.
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/admin/secciones/nueva">
            <Plus className="w-5 h-5 mr-2" />
            Nueva Sección
          </Link>
        </Button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-xl border border-border overflow-hidden"
          >
            {/* Image */}
            {section.background_image_url && (
              <div className="h-40 overflow-hidden">
                <img
                  src={section.background_image_url}
                  alt={section.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-5 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {section.title}
                  </h3>
                  {section.is_active ? (
                    <Badge variant="default" className="bg-green-500">
                      Activa
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Inactiva</Badge>
                  )}
                </div>
                {section.subtitle && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {section.subtitle}
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  <span>{section.packages.length} paquetes</span>
                </div>
              </div>

              {/* Features */}
              {section.features.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {section.features.map((f) => (
                    <span
                      key={f.id}
                      className="text-xs bg-muted px-2 py-1 rounded"
                    >
                      {f.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/admin/secciones/${section.id}`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Link>
                </Button>
                <SectionActions
                  sectionId={section.id}
                  isActive={section.is_active}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {sections.length === 0 && (
        <div className="bg-white rounded-xl border border-border text-center py-12">
          <p className="text-muted-foreground">
            No hay secciones especiales creadas aún
          </p>
          <Button asChild className="mt-4">
            <Link href="/admin/secciones/nueva">
              <Plus className="w-5 h-5 mr-2" />
              Crear primera sección
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
