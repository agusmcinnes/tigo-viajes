"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreVertical, Eye, EyeOff, Copy, Trash2, Loader2, Star, Tag } from "lucide-react";

interface PackageActionsProps {
  packageId: string;
  isActive: boolean;
  isOffer?: boolean;
  isFeatured?: boolean;
}

export function PackageActions({ packageId, isActive, isOffer = false, isFeatured = false }: PackageActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleToggleActive = async () => {
    setLoading(true);
    const supabase = createClient();

    await supabase
      .from("packages")
      .update({ is_active: !isActive } as never)
      .eq("id", packageId);

    router.refresh();
    setLoading(false);
  };

  const handleToggleOffer = async () => {
    setLoading(true);
    const supabase = createClient();

    await supabase
      .from("packages")
      .update({ is_offer: !isOffer } as never)
      .eq("id", packageId);

    router.refresh();
    setLoading(false);
  };

  const handleToggleFeatured = async () => {
    setLoading(true);
    const supabase = createClient();

    await supabase
      .from("packages")
      .update({ is_featured: !isFeatured } as never)
      .eq("id", packageId);

    router.refresh();
    setLoading(false);
  };

  const handleDuplicate = async () => {
    setLoading(true);
    const supabase = createClient();

    // Obtener el paquete actual
    const { data: pkg } = await supabase
      .from("packages")
      .select("*")
      .eq("id", packageId)
      .single();

    if (pkg) {
      // Crear copia
      const pkgData = pkg as Record<string, unknown>;
      const { id, created_at, updated_at, ...rest } = pkgData;
      await supabase.from("packages").insert({
        ...rest,
        name: `${pkgData.name} (copia)`,
        slug: `${pkgData.slug}-copia-${Date.now()}`,
        is_active: false,
      } as never);
    }

    router.refresh();
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const supabase = createClient();

    await supabase.from("packages").delete().eq("id", packageId);

    setDeleteOpen(false);
    router.refresh();
    setLoading(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MoreVertical className="w-4 h-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleToggleActive}>
            {isActive ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Desactivar
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Activar
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleToggleFeatured}>
            <Star className={`w-4 h-4 mr-2 ${isFeatured ? "fill-yellow-500 text-yellow-500" : ""}`} />
            {isFeatured ? "Quitar Destacado" : "Marcar Destacado"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleOffer}>
            <Tag className={`w-4 h-4 mr-2 ${isOffer ? "fill-orange-500 text-orange-500" : ""}`} />
            {isOffer ? "Quitar Oferta" : "Marcar como Oferta"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDuplicate}>
            <Copy className="w-4 h-4 mr-2" />
            Duplicar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar paquete?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El paquete será eliminado
              permanentemente junto con todas sus fechas de salida.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
