import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Package,
  Sparkles,
  MapPin,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Calendar,
  DollarSign,
  Users,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PackageStats {
  id: string;
  is_active: boolean;
  is_featured: boolean;
  base_price: number;
  currency: string;
}

interface SectionStats {
  id: string;
  is_active: boolean;
}

interface DestinationStats {
  id: string;
  is_active: boolean;
}

async function getStats() {
  const supabase = await createClient();

  const [packagesRes, sectionsRes, destinationsRes] = await Promise.all([
    supabase.from("packages").select("id, is_active, is_featured, base_price, currency", { count: "exact" }),
    supabase.from("special_sections").select("id, is_active", { count: "exact" }),
    supabase.from("destinations").select("id, is_active", { count: "exact" }),
  ]);

  const packages = (packagesRes.data || []) as PackageStats[];
  const sections = (sectionsRes.data || []) as SectionStats[];
  const destinations = (destinationsRes.data || []) as DestinationStats[];

  return {
    totalPackages: packages.length,
    activePackages: packages.filter((p) => p.is_active).length,
    featuredPackages: packages.filter((p) => p.is_featured).length,
    totalSections: sections.length,
    activeSections: sections.filter((s) => s.is_active).length,
    totalDestinations: destinations.length,
    activeDestinations: destinations.filter((d) => d.is_active).length,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Bienvenido al panel de administracion
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="border-gray-200">
            <Link href="/" target="_blank">
              <Eye className="w-4 h-4 mr-2" />
              Ver sitio
            </Link>
          </Button>
          <Button asChild className="bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-600/25">
            <Link href="/admin/paquetes/nuevo">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Paquete
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Paquetes Totales */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-violet-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +{stats.featuredPackages} destacados
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">{stats.totalPackages}</p>
            <p className="text-sm text-gray-500 mt-1">Paquetes totales</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              href="/admin/paquetes"
              className="text-sm font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1"
            >
              Ver todos
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Paquetes Activos */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {Math.round((stats.activePackages / stats.totalPackages) * 100) || 0}% activo
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">{stats.activePackages}</p>
            <p className="text-sm text-gray-500 mt-1">Paquetes activos</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${(stats.activePackages / stats.totalPackages) * 100 || 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Secciones */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              {stats.activeSections} activas
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">{stats.totalSections}</p>
            <p className="text-sm text-gray-500 mt-1">Secciones especiales</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              href="/admin/secciones"
              className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              Gestionar
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Destinos */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
              {stats.activeDestinations} activos
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">{stats.totalDestinations}</p>
            <p className="text-sm text-gray-500 mt-1">Destinos</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              href="/admin/destinos"
              className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              Configurar
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Acciones rapidas
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/paquetes/nuevo"
            className="group p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 transition-all"
          >
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-violet-200 transition-colors">
              <Plus className="w-5 h-5 text-violet-600" />
            </div>
            <p className="font-medium text-gray-900">Crear Paquete</p>
            <p className="text-sm text-gray-500 mt-1">
              Agregar nuevo viaje
            </p>
          </Link>

          <Link
            href="/admin/secciones/nueva"
            className="group p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <p className="font-medium text-gray-900">Nueva Seccion</p>
            <p className="text-sm text-gray-500 mt-1">
              Crear oferta especial
            </p>
          </Link>

          <Link
            href="/admin/destinos"
            className="group p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <p className="font-medium text-gray-900">Destinos</p>
            <p className="text-sm text-gray-500 mt-1">
              Gestionar ubicaciones
            </p>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="group p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-all"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <p className="font-medium text-gray-900">Ver Sitio</p>
            <p className="text-sm text-gray-500 mt-1">
              Abrir pagina publica
            </p>
          </Link>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl shadow-violet-600/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Verano 2026</h3>
            <p className="text-violet-200 mt-1">
              Tenes {stats.activePackages} paquetes activos listos para vender
            </p>
          </div>
          <Button asChild variant="secondary" className="bg-white text-violet-600 hover:bg-violet-50">
            <Link href="/admin/paquetes">
              Ver paquetes
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
