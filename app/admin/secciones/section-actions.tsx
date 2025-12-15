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
import { MoreVertical, Eye, EyeOff, Trash2, Loader2 } from "lucide-react";

interface SectionActionsProps {
  sectionId: string;
  isActive: boolean;
}

export function SectionActions({ sectionId, isActive }: SectionActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleToggleActive = async () => {
    setLoading(true);
    const supabase = createClient();

    await supabase
      .from("special_sections")
      .update({ is_active: !isActive })
      .eq("id", sectionId);

    router.refresh();
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const supabase = createClient();

    // Quitar paquetes de esta sección
    await supabase
      .from("packages")
      .update({ special_section_id: null, is_special: false })
      .eq("special_section_id", sectionId);

    // Eliminar sección
    await supabase.from("special_sections").delete().eq("id", sectionId);

    setDeleteOpen(false);
    router.refresh();
    setLoading(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={loading}>
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
            <DialogTitle>¿Eliminar sección?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Los paquetes asignados a esta
              sección serán desvinculados pero no eliminados.
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
