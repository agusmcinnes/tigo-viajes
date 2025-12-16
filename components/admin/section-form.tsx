"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type {
  SpecialSectionFull,
  Package,
  SpecialSectionFeature,
} from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Save, Loader2, Plus, X, GripVertical } from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";

// Iconos disponibles de Lucide
const availableIcons = [
  "Sun",
  "Umbrella",
  "Waves",
  "Sparkles",
  "Palmtree",
  "Plane",
  "Hotel",
  "MapPin",
  "Camera",
  "Heart",
  "Star",
  "Gift",
  "Calendar",
  "Clock",
  "Users",
  "Check",
];

interface SectionFormProps {
  section?: SpecialSectionFull;
  allPackages: Package[];
}

export function SectionForm({ section, allPackages }: SectionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: section?.title || "",
    slug: section?.slug || "",
    subtitle: section?.subtitle || "",
    badge_text: section?.badge_text || "",
    background_image_url: section?.background_image_url || "",
    promo_title: section?.promo_title || "",
    promo_description: section?.promo_description || "",
    cta_text: section?.cta_text || "Ver Ofertas",
    cta_url: section?.cta_url || "",
    is_active: section?.is_active ?? true,
  });

  // Features state
  const [features, setFeatures] = useState<
    Omit<SpecialSectionFeature, "id" | "section_id" | "created_at" | "updated_at">[]
  >(
    section?.features.map((f) => ({
      icon_name: f.icon_name,
      title: f.title,
      description: f.description,
      display_order: f.display_order,
    })) || []
  );

  // Selected packages
  const [selectedPackages, setSelectedPackages] = useState<string[]>(
    section?.packages.map((p) => p.id) || []
  );

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: section ? formData.slug : generateSlug(title),
    });
  };

  const addFeature = () => {
    if (features.length < 4) {
      setFeatures([
        ...features,
        {
          icon_name: "Star",
          title: "",
          description: "",
          display_order: features.length,
        },
      ]);
    }
  };

  const updateFeature = (
    index: number,
    field: keyof (typeof features)[0],
    value: string | number
  ) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: value };
    setFeatures(updated);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const togglePackage = (packageId: string) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : [...prev, packageId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();

    try {
      let sectionId = section?.id;

      if (section) {
        // Update existing section
        const { error } = await supabase
          .from("special_sections")
          .update(formData as never)
          .eq("id", section.id);

        if (error) throw error;
      } else {
        // Create new section
        const { data: newSection, error } = await supabase
          .from("special_sections")
          .insert(formData as never)
          .select()
          .single();

        if (error) throw error;
        const newSectionData = newSection as { id: string };
        sectionId = newSectionData.id;
      }

      // Update features
      if (sectionId) {
        // Delete existing features
        await supabase
          .from("special_section_features")
          .delete()
          .eq("section_id", sectionId);

        // Insert new features
        if (features.length > 0) {
          const { error: featuresError } = await supabase
            .from("special_section_features")
            .insert(
              features.map((f, index) => ({
                section_id: sectionId!,
                icon_name: f.icon_name,
                title: f.title,
                description: f.description,
                display_order: index,
              })) as never
            );

          if (featuresError) throw featuresError;
        }

        // Update packages - first remove all from this section
        await supabase
          .from("packages")
          .update({ special_section_id: null, is_special: false } as never)
          .eq("special_section_id", sectionId);

        // Then assign selected packages
        if (selectedPackages.length > 0) {
          const { error: pkgError } = await supabase
            .from("packages")
            .update({ special_section_id: sectionId, is_special: true } as never)
            .in("id", selectedPackages);

          if (pkgError) throw pkgError;
        }
      }

      router.push("/admin/secciones");
      router.refresh();
    } catch (error) {
      console.error("Error saving section:", error);
      alert("Error al guardar la sección");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-border p-6 space-y-6">
        <h2 className="text-lg font-semibold">Información Básica</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ej: Verano 2026"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL) *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="verano-2026"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Textarea
            id="subtitle"
            value={formData.subtitle || ""}
            onChange={(e) =>
              setFormData({ ...formData, subtitle: e.target.value })
            }
            placeholder="Descripción breve de la sección"
            rows={2}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="badge_text">Texto del Badge</Label>
            <Input
              id="badge_text"
              value={formData.badge_text || ""}
              onChange={(e) =>
                setFormData({ ...formData, badge_text: e.target.value })
              }
              placeholder="Ej: Ofertas Especiales - Cupos Limitados"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta_text">Texto del Botón</Label>
            <Input
              id="cta_text"
              value={formData.cta_text || ""}
              onChange={(e) =>
                setFormData({ ...formData, cta_text: e.target.value })
              }
              placeholder="Ej: Ver Ofertas"
            />
          </div>
        </div>

        <ImageUpload
          bucket="sections"
          currentUrl={formData.background_image_url || undefined}
          onUpload={(url) => setFormData({ ...formData, background_image_url: url })}
          label="Imagen de Fondo"
        />
      </div>

      {/* Promo Banner */}
      <div className="bg-white rounded-xl border border-border p-6 space-y-6">
        <h2 className="text-lg font-semibold">Banner Promocional</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="promo_title">Título del Banner</Label>
            <Input
              id="promo_title"
              value={formData.promo_title || ""}
              onChange={(e) =>
                setFormData({ ...formData, promo_title: e.target.value })
              }
              placeholder="Ej: Reserva anticipada"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="promo_description">Descripción del Banner</Label>
            <Input
              id="promo_description"
              value={formData.promo_description || ""}
              onChange={(e) =>
                setFormData({ ...formData, promo_description: e.target.value })
              }
              placeholder="Ej: Hasta 20% OFF reservando antes del 31 de Marzo"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl border border-border p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Características (máx. 4)</h2>
          {features.length < 4 && (
            <Button type="button" variant="outline" size="sm" onClick={addFeature}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 items-start p-4 border rounded-lg bg-muted/30"
            >
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {index + 1}
                </span>
              </div>

              <div className="flex-1 grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Icono</Label>
                  <select
                    value={feature.icon_name}
                    onChange={(e) =>
                      updateFeature(index, "icon_name", e.target.value)
                    }
                    className="w-full h-10 px-3 border rounded-md bg-background"
                  >
                    {availableIcons.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={feature.title}
                    onChange={(e) =>
                      updateFeature(index, "title", e.target.value)
                    }
                    placeholder="Título"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Input
                    value={feature.description}
                    onChange={(e) =>
                      updateFeature(index, "description", e.target.value)
                    }
                    placeholder="Descripción corta"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFeature(index)}
              >
                <X className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        {features.length === 0 && (
          <p className="text-center text-muted-foreground py-4">
            No hay características. Agregá hasta 4 features que aparecerán en la
            sección.
          </p>
        )}
      </div>

      {/* Packages */}
      <div className="bg-white rounded-xl border border-border p-6 space-y-6">
        <h2 className="text-lg font-semibold">Paquetes de esta Sección</h2>
        <p className="text-sm text-muted-foreground">
          Seleccioná los paquetes que pertenecen a esta sección especial
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
          {allPackages.map((pkg) => (
            <label
              key={pkg.id}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedPackages.includes(pkg.id)
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedPackages.includes(pkg.id)}
                onChange={() => togglePackage(pkg.id)}
                className="w-4 h-4"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{pkg.name}</p>
                <p className="text-xs text-muted-foreground">{pkg.destination}</p>
              </div>
            </label>
          ))}
        </div>

        {allPackages.length === 0 && (
          <p className="text-center text-muted-foreground py-4">
            No hay paquetes disponibles. Creá paquetes primero.
          </p>
        )}
      </div>

      {/* Options */}
      <div className="bg-white rounded-xl border border-border p-6 space-y-6">
        <h2 className="text-lg font-semibold">Opciones</h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) =>
              setFormData({ ...formData, is_active: e.target.checked })
            }
            className="w-5 h-5 rounded border-border"
          />
          <span>Activa (visible en el sitio)</span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/secciones")}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading} className="bg-primary">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              {section ? "Guardar Cambios" : "Crear Sección"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
