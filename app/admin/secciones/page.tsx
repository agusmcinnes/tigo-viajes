import Link from "next/link";
import Image from "next/image";
import { getSectionsAdmin } from "@/lib/services/sections";
import { Button } from "@/components/ui/button";
import { Edit, Package, Sparkles } from "lucide-react";

export default async function SectionsPage() {
  const sections = await getSectionsAdmin();
  const section = sections[0]; // Solo debería haber una sección

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Sección de Temporada
        </h1>
        <p className="text-gray-500 mt-1">
          Editá la sección especial que se muestra en la página principal
        </p>
      </div>

      {/* Section Card */}
      {section ? (
        <div className="max-w-2xl">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
                <p className="text-gray-600">{section.subtitle}</p>
              )}

              {/* Stats Row */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span>{section.packages.length} paquetes asignados</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 text-gray-400" />
                  <span>{section.features.length} características</span>
                </div>
              </div>

              {/* Features Tags */}
              {section.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {section.features.map((f) => (
                    <span
                      key={f.id}
                      className="text-sm bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full"
                    >
                      {f.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Promo Banner Preview */}
              {section.promo_title && (
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <p className="font-medium text-purple-700">
                    {section.promo_title}
                  </p>
                  {section.promo_description && (
                    <p className="text-sm text-purple-600 mt-1">
                      {section.promo_description}
                    </p>
                  )}
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
        </div>
      ) : (
        /* Empty State - No debería pasar, pero por si acaso */
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-lg">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            No hay sección configurada
          </h3>
          <p className="text-gray-500 mt-1">
            Contactá al administrador del sistema para crear la sección de
            temporada.
          </p>
        </div>
      )}
    </div>
  );
}
