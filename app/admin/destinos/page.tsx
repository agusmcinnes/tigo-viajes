"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { Destination } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Save,
  MapPin,
  Globe,
} from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";

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
        .update(formData as never)
        .eq("id", editingId);
    } else {
      await supabase.from("destinations").insert({
        ...formData,
        display_order: destinations.length,
      } as never);
    }

    setDialogOpen(false);
    await fetchDestinations();
    setSaving(false);
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    await supabase
      .from("destinations")
      .update({ is_active: !isActive } as never)
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

  const activeCount = destinations.filter((d) => d.is_active).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Destinos
          </h1>
          <p className="text-gray-500 mt-1">
            {destinations.length} destinos en total · {activeCount} activos
          </p>
        </div>
        <Button onClick={openCreateDialog} className="bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/25">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Destino
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{destinations.length}</p>
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
      </div>

      {/* Destinations Grid */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        </div>
      ) : destinations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            No hay destinos creados
          </h3>
          <p className="text-gray-500 mt-1 mb-6">
            Los destinos aparecen en el menu de navegacion del sitio
          </p>
          <Button onClick={openCreateDialog} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            Crear primer destino
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinations.map((dest, index) => (
            <div
              key={dest.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md group ${
                dest.is_active ? "border-gray-100" : "border-gray-200 opacity-60"
              }`}
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                {dest.image_url ? (
                  <Image
                    src={dest.image_url}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-white/50" />
                  </div>
                )}
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  {dest.is_active ? (
                    <span className="w-3 h-3 bg-green-500 rounded-full block shadow-lg shadow-green-500/50" />
                  ) : (
                    <span className="w-3 h-3 bg-gray-400 rounded-full block" />
                  )}
                </div>
                {/* Order Badge */}
                <div className="absolute top-2 left-2">
                  <span className="w-6 h-6 bg-black/50 text-white text-xs font-medium rounded-full flex items-center justify-center backdrop-blur-sm">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{dest.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">/{dest.slug}</p>

                {/* Actions */}
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 h-8 text-xs"
                    onClick={() => handleToggleActive(dest.id, dest.is_active)}
                  >
                    {dest.is_active ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 mr-1" />
                        Ocultar
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Mostrar
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => openEditDialog(dest)}
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setEditingId(dest.id);
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {editingId ? "Editar Destino" : "Nuevo Destino"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ej: Argentina"
                className="h-10"
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
                className="h-10 font-mono text-sm"
              />
              <p className="text-xs text-gray-500">
                Se usa en la URL: /destinos/{formData.slug || "slug"}
              </p>
            </div>
            <ImageUpload
              bucket="destinations"
              currentUrl={formData.image_url || undefined}
              onUpload={(url) => setFormData({ ...formData, image_url: url })}
              label="Imagen"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || !formData.name || !formData.slug}
              className="bg-orange-600 hover:bg-orange-700"
            >
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Eliminar destino</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Esta accion no se puede deshacer. Los paquetes asociados a este
            destino mantendran su referencia pero el destino dejara de aparecer
            en el menu.
          </p>
          <DialogFooter className="gap-2 sm:gap-0">
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
