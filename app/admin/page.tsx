import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Package,
  Sparkles,
  MapPin,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

async function getStats() {
  const supabase = await createClient();

  const [packagesRes, sectionsRes, destinationsRes] = await Promise.all([
    supabase.from("packages").select("id, is_active, is_featured", { count: "exact" }),
    supabase.from("special_sections").select("id, is_active", { count: "exact" }),
    supabase.from("destinations").select("id, is_active", { count: "exact" }),
  ]);

  const packages = packagesRes.data || [];
  const sections = sectionsRes.data || [];
  const destinations = destinationsRes.data || [];

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

  const cards = [
    {
      title: "Paquetes",
      value: stats.totalPackages,
      subtitle: `${stats.activePackages} activos, ${stats.featuredPackages} destacados`,
      icon: Package,
      href: "/admin/paquetes",
      color: "bg-blue-500",
    },
    {
      title: "Secciones Especiales",
      value: stats.totalSections,
      subtitle: `${stats.activeSections} activas`,
      icon: Sparkles,
      href: "/admin/secciones",
      color: "bg-purple-500",
    },
    {
      title: "Destinos",
      value: stats.totalDestinations,
      subtitle: `${stats.activeDestinations} activos`,
      icon: MapPin,
      href: "/admin/destinos",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Bienvenido al panel de administración de Tigo Viajes
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/admin/paquetes/nuevo">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Paquete
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-start justify-between">
              <div
                className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-semibold text-foreground">
                {card.value}
              </p>
              <p className="text-lg font-medium text-foreground mt-1">
                {card.title}
              </p>
              <p className="text-sm text-muted-foreground">{card.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button asChild variant="outline" className="h-auto py-4 justify-start">
            <Link href="/admin/paquetes/nuevo" className="flex flex-col items-start">
              <Package className="w-5 h-5 mb-2 text-primary" />
              <span className="font-medium">Crear Paquete</span>
              <span className="text-xs text-muted-foreground">
                Agregar un nuevo paquete de viaje
              </span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 justify-start">
            <Link href="/admin/secciones/nueva" className="flex flex-col items-start">
              <Sparkles className="w-5 h-5 mb-2 text-purple-500" />
              <span className="font-medium">Nueva Sección</span>
              <span className="text-xs text-muted-foreground">
                Crear sección especial (ej: Semana Santa)
              </span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 justify-start">
            <Link href="/admin/destinos" className="flex flex-col items-start">
              <MapPin className="w-5 h-5 mb-2 text-green-500" />
              <span className="font-medium">Gestionar Destinos</span>
              <span className="text-xs text-muted-foreground">
                Administrar destinos del menú
              </span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 justify-start">
            <Link href="/" target="_blank" className="flex flex-col items-start">
              <TrendingUp className="w-5 h-5 mb-2 text-secondary" />
              <span className="font-medium">Ver Sitio Web</span>
              <span className="text-xs text-muted-foreground">
                Abrir el sitio público
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
