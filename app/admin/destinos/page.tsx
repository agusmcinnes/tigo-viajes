"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Destination } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  GripVertical,
  Save,
} from "lucide-react";

export default function DestinationsPage() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image_url: "",
  });

  const supabase = createClient();

  const fetchDestinations = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("destinations")
      .select("*")
      .order("display_order");
    setDestinations(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: editingId ? formData.slug : generateSlug(name),
    });
  };

  const openCreateDialog = () => {
    setEditingId(null);
    setFormData({ name: "", slug: "", image_url: "" });
    setDialogOpen(true);
  };

  const openEditDialog = (dest: Destination) => {
    setEditingId(dest.id);
    setFormData({
      name: dest.name,
      slug: dest.slug,
      image_url: dest.image_url || "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);

    if (editingId) {
      await supabase
        .from("destinations")
        .update(formData)
        .eq("id", editingId);
    } else {
      await supabase.from("destinations").insert({
        ...formData,
        display_order: destinations.length,
      });
    }

    setDialogOpen(false);
    await fetchDestinations();
    setSaving(false);
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    await supabase
      .from("destinations")
      .update({ is_active: !isActive })
      .eq("id", id);
    await fetchDestinations();
  };

  const handleDelete = async () => {
    if (editingId) {
      await supabase.from("destinations").delete().eq("id", editingId);
      setDeleteOpen(false);
      setEditingId(null);
      await fetchDestinations();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Destinos
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestiona los destinos que aparecen en el menú de navegación
          </p>
        </div>
        <Button onClick={openCreateDialog} className="bg-primary hover:bg-primary/90">
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Destino
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay destinos creados aún</p>
            <Button onClick={openCreateDialog} className="mt-4">
              <Plus className="w-5 h-5 mr-2" />
              Crear primer destino
            </Button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4 w-12">
                  #
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                  Destino
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                  Slug
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
              {destinations.map((dest, index) => (
                <tr key={dest.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-muted-foreground">{index + 1}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {dest.image_url && (
                        <img
                          src={dest.image_url}
                          alt={dest.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}
                      <span className="font-medium">{dest.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {dest.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    {dest.is_active ? (
                      <Badge variant="default" className="bg-green-500">
                        Activo
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Inactivo</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(dest.id, dest.is_active)}
                      >
                        {dest.is_active ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(dest)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingId(dest.id);
                          setDeleteOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Editar Destino" : "Nuevo Destino"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ej: Argentina"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="argentina"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">URL de Imagen</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving || !formData.name || !formData.slug}>
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {editingId ? "Guardar" : "Crear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar destino?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Esta acción no se puede deshacer. Los paquetes asociados a este
            destino mantendrán su referencia pero el destino dejará de aparecer
            en el menú.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
