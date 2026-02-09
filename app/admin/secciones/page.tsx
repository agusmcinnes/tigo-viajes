import Link from "next/link";
import Image from "next/image";
import { getSectionsAdmin } from "@/lib/services/sections";
import { Button } from "@/components/ui/button";
import { Edit, Package, Sparkles, Plus } from "lucide-react";

export default async function SectionsPage() {
  const sections = await getSectionsAdmin();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Secciones Especiales
          </h1>
          <p className="text-gray-500 mt-1">
            Administrá las secciones especiales que se muestran en el sitio
          </p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/admin/secciones/nueva">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Sección
          </Link>
        </Button>
      </div>

      {/* Sections List */}
      {sections.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Image Header */}
              <div className="h-48 relative overflow-hidden">
                {section.background_image_url ? (
                  <Image
                    src={section.background_image_url}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-violet-600" />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Status badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-medium rounded backdrop-blur-sm ${
                      section.is_active
                        ? "bg-green-500/80 text-white"
                        : "bg-gray-500/80 text-white"
                    }`}
                  >
                    {section.is_active ? "Activa" : "Inactiva"}
                  </span>
                </div>

                {/* Title on image */}
                <div className="absolute bottom-4 left-5 right-5">
                  {section.badge_text && (
                    <span className="inline-block px-2.5 py-1 bg-purple-500/80 text-white text-xs font-medium rounded mb-2 backdrop-blur-sm">
                      {section.badge_text}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-white">
                    {section.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {section.subtitle && (
                  <p className="text-gray-600 line-clamp-2">{section.subtitle}</p>
                )}

                {/* Stats Row */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span>{section.packages.length} paquetes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Sparkles className="w-4 h-4 text-gray-400" />
                    <span>{section.features.length} características</span>
                  </div>
                </div>

                {/* Nav button preview */}
                {(section.nav_label || section.nav_color) && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Botón:</span>
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-medium"
                      style={{ backgroundColor: section.nav_color || "#FE4F00" }}
                    >
                      {section.nav_label || section.title}
                    </span>
                  </div>
                )}

                {/* Edit Button */}
                <div className="pt-4 border-t border-gray-100">
                  <Button
                    asChild
                    className="w-full bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/25"
                  >
                    <Link href={`/admin/secciones/${section.id}`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Sección
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            No hay secciones
          </h3>
          <p className="text-gray-500 mt-1 mb-4">
            Creá una sección especial para mostrarla en el sitio.
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/admin/secciones/nueva">
              <Plus className="w-4 h-4 mr-2" />
              Crear Sección
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
