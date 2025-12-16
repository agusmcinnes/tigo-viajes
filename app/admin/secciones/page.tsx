import Link from "next/link";
import Image from "next/image";
import { getSectionsAdmin } from "@/lib/services/sections";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Package, Sparkles, Eye, Calendar, Layers } from "lucide-react";
import { SectionActions } from "./section-actions";

export default async function SectionsPage() {
  const sections = await getSectionsAdmin();
  const activeCount = sections.filter((s) => s.is_active).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Secciones Especiales
          </h1>
          <p className="text-gray-500 mt-1">
            {sections.length} secciones en total · {activeCount} activas
          </p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/25">
          <Link href="/admin/secciones/nueva">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Seccion
          </Link>
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{sections.length}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
              <p className="text-sm text-gray-500">Activas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {sections.reduce((acc, s) => acc + s.packages.length, 0)}
              </p>
              <p className="text-sm text-gray-500">Paquetes</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {sections.reduce((acc, s) => acc + s.features.length, 0)}
              </p>
              <p className="text-sm text-gray-500">Features</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      {sections.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md group ${
                section.is_active ? "border-gray-100" : "border-gray-200 opacity-60"
              }`}
            >
              {/* Image Header */}
              <div className="h-40 relative overflow-hidden">
                {section.background_image_url ? (
                  <Image
                    src={section.background_image_url}
                    alt={section.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-violet-600" />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  {section.is_active ? (
                    <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-medium rounded-full shadow-lg">
                      Activa
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-gray-500 text-white text-xs font-medium rounded-full">
                      Inactiva
                    </span>
                  )}
                </div>

                {/* Title on image */}
                <div className="absolute bottom-3 left-4 right-4">
                  {section.badge_text && (
                    <span className="inline-block px-2 py-0.5 bg-purple-500/80 text-white text-xs font-medium rounded mb-2 backdrop-blur-sm">
                      {section.badge_text}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white">
                    {section.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {section.subtitle && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {section.subtitle}
                  </p>
                )}

                {/* Stats Row */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span>{section.packages.length} paquetes</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Sparkles className="w-4 h-4 text-gray-400" />
                    <span>{section.features.length} features</span>
                  </div>
                </div>

                {/* Features Tags */}
                {section.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {section.features.slice(0, 3).map((f) => (
                      <span
                        key={f.id}
                        className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                      >
                        {f.title}
                      </span>
                    ))}
                    {section.features.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                        +{section.features.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Promo Banner Preview */}
                {section.promo_title && (
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                    <p className="text-sm font-medium text-purple-700">
                      {section.promo_title}
                    </p>
                    {section.promo_description && (
                      <p className="text-xs text-purple-600 mt-0.5 line-clamp-1">
                        {section.promo_description}
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <Button asChild variant="outline" size="sm" className="flex-1 border-gray-200">
                    <Link href={`/admin/secciones/${section.id}`}>
                      <Edit className="w-4 h-4 mr-1.5" />
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
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            No hay secciones creadas
          </h3>
          <p className="text-gray-500 mt-1 mb-6">
            Crea secciones especiales como "Verano 2026" o "Semana Santa"
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/admin/secciones/nueva">
              <Plus className="w-4 h-4 mr-2" />
              Crear primera seccion
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
