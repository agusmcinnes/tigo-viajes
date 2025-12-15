import Link from "next/link";
import Image from "next/image";
import { getPackagesAdmin } from "@/lib/services/packages";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";
import { PackageActions } from "./package-actions";

export default async function PackagesPage() {
  const packages = await getPackagesAdmin();

  const formatPrice = (price: number, currency: string) => {
    if (currency === "ARS") {
      return `ARS ${price.toLocaleString("es-AR")}`;
    }
    return `USD ${price.toLocaleString("en-US")}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Paquetes
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestiona los paquetes de viaje disponibles
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/admin/paquetes/nuevo">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Paquete
          </Link>
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                  Paquete
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                  Destino
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                  Precio
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                  Duración
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                  Estado
                </th>
                <th className="text-right text-sm font-medium text-muted-foreground px-6 py-4">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                        <Image
                          src={pkg.image_url}
                          alt={pkg.name}
                          width={64}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{pkg.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {pkg.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-foreground">{pkg.destination}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-foreground">
                      {formatPrice(pkg.base_price, pkg.currency)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-foreground">
                      {pkg.days}d / {pkg.nights}n
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {pkg.is_active ? (
                        <Badge variant="default" className="bg-green-500">
                          Activo
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Inactivo</Badge>
                      )}
                      {pkg.is_featured && (
                        <Badge variant="default" className="bg-yellow-500">
                          Destacado
                        </Badge>
                      )}
                      {pkg.is_special && (
                        <Badge variant="default" className="bg-purple-500">
                          Especial
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/paquetes/${pkg.id}`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <PackageActions
                        packageId={pkg.id}
                        isActive={pkg.is_active}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay paquetes creados aún</p>
            <Button asChild className="mt-4">
              <Link href="/admin/paquetes/nuevo">
                <Plus className="w-5 h-5 mr-2" />
                Crear primer paquete
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
