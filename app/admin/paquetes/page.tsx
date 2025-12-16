import Link from "next/link";
import Image from "next/image";
import { getPackagesAdmin } from "@/lib/services/packages";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Edit,
  Calendar,
  Users,
  Clock,
  MapPin,
  DollarSign,
  Star,
  Sparkles,
  MoreHorizontal,
  Eye,
  EyeOff,
} from "lucide-react";
import { PackageActions } from "./package-actions";

export default async function PackagesPage() {
  const packages = await getPackagesAdmin();

  const formatPrice = (price: number, currency: string) => {
    if (currency === "ARS") {
      return `$${price.toLocaleString("es-AR")}`;
    }
    return `USD ${price.toLocaleString("en-US")}`;
  };

  const activeCount = packages.filter((p) => p.is_active).length;
  const featuredCount = packages.filter((p) => p.is_featured).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Paquetes
          </h1>
          <p className="text-gray-500 mt-1">
            {packages.length} paquetes en total · {activeCount} activos · {featuredCount} destacados
          </p>
        </div>
        <Button asChild className="bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-600/25">
          <Link href="/admin/paquetes/nuevo">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Paquete
          </Link>
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
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
              <p className="text-sm text-gray-500">Activos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{featuredCount}</p>
              <p className="text-sm text-gray-500">Destacados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      {packages.length > 0 ? (
        <div className="grid gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${
                pkg.is_active ? "border-gray-100" : "border-gray-200 opacity-60"
              }`}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="lg:w-72 h-48 lg:h-auto relative shrink-0">
                  <Image
                    src={pkg.image_url}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                  {/* Badges overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {pkg.is_featured && (
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-lg flex items-center gap-1 shadow-lg">
                        <Star className="w-3 h-3" />
                        Destacado
                      </span>
                    )}
                    {pkg.is_special && (
                      <span className="px-2 py-1 bg-purple-500 text-white text-xs font-medium rounded-lg flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        Especial
                      </span>
                    )}
                  </div>
                  {/* Status indicator */}
                  <div className="absolute top-3 right-3">
                    {pkg.is_active ? (
                      <span className="w-3 h-3 bg-green-500 rounded-full block shadow-lg shadow-green-500/50" />
                    ) : (
                      <span className="w-3 h-3 bg-gray-400 rounded-full block" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 lg:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {pkg.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {pkg.description}
                          </p>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{pkg.destination}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{pkg.days} dias / {pkg.nights} noches</span>
                        </div>
                        {pkg.is_groupal && (
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span>{pkg.group_size}</span>
                          </div>
                        )}
                      </div>

                      {/* Departure dates */}
                      {pkg.departure_dates && pkg.departure_dates.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                            Proximas salidas
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {pkg.departure_dates.slice(0, 3).map((date) => (
                              <span
                                key={date.id}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                              >
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(date.departure_date).toLocaleDateString("es-AR", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </span>
                            ))}
                            {pkg.departure_dates.length > 3 && (
                              <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-500 text-sm rounded-lg">
                                +{pkg.departure_dates.length - 3} mas
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price & Actions */}
                    <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 lg:text-right">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                          Desde
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(pkg.base_price, pkg.currency)}
                        </p>
                        <p className="text-xs text-gray-500">por persona</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm" className="border-gray-200">
                          <Link href={`/admin/paquetes/${pkg.id}`}>
                            <Edit className="w-4 h-4 mr-1.5" />
                            Editar
                          </Link>
                        </Button>
                        <PackageActions
                          packageId={pkg.id}
                          isActive={pkg.is_active}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-violet-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            No hay paquetes creados
          </h3>
          <p className="text-gray-500 mt-1 mb-6">
            Crea tu primer paquete de viaje para comenzar
          </p>
          <Button asChild className="bg-violet-600 hover:bg-violet-700">
            <Link href="/admin/paquetes/nuevo">
              <Plus className="w-4 h-4 mr-2" />
              Crear primer paquete
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
