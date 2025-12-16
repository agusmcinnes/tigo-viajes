"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { PackageWithDepartures, SpecialSection } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  Loader2,
  Plus,
  X,
  Calendar,
  DollarSign,
  Trash2,
} from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";

interface PackageFormProps {
  package?: PackageWithDepartures;
  sections: SpecialSection[];
  destinations: { slug: string; name: string }[];
}

export function PackageForm({
  package: pkg,
  sections,
  destinations,
}: PackageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: pkg?.name || "",
    slug: pkg?.slug || "",
    description: pkg?.description || "",
    long_description: pkg?.long_description || "",
    destination: pkg?.destination || "",
    destination_slug: pkg?.destination_slug || "",
    days: pkg?.days || 1,
    nights: pkg?.nights || 0,
    group_size: pkg?.group_size || "",
    is_groupal: pkg?.is_groupal || false,
    base_price: pkg?.base_price || 0,
    currency: pkg?.currency || "USD",
    image_url: pkg?.image_url || "",
    included_services: pkg?.included_services || [],
    not_included_services: pkg?.not_included_services || [],
    optional_excursions: pkg?.optional_excursions || [],
    is_featured: pkg?.is_featured || false,
    is_special: pkg?.is_special || false,
    special_section_id: pkg?.special_section_id || "",
    is_active: pkg?.is_active ?? true,
  });

  // Departure dates state
  const [departureDates, setDepartureDates] = useState(
    pkg?.departure_dates || []
  );
  const [newDate, setNewDate] = useState({ date: "", price: "", currency: "USD" });

  // Temp inputs for array fields
  const [newIncluded, setNewIncluded] = useState("");
  const [newNotIncluded, setNewNotIncluded] = useState("");
  const [newExcursion, setNewExcursion] = useState("");

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
      slug: pkg ? formData.slug : generateSlug(name),
    });
  };

  const handleDestinationChange = (slug: string) => {
    const dest = destinations.find((d) => d.slug === slug);
    setFormData({
      ...formData,
      destination_slug: slug,
      destination: dest?.name || "",
    });
  };

  const addService = (
    type: "included_services" | "not_included_services" | "optional_excursions",
    value: string,
    setValue: (v: string) => void
  ) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [type]: [...formData[type], value.trim()],
      });
      setValue("");
    }
  };

  const removeService = (
    type: "included_services" | "not_included_services" | "optional_excursions",
    index: number
  ) => {
    setFormData({
      ...formData,
      [type]: formData[type].filter((_, i) => i !== index),
    });
  };

  const addDepartureDate = () => {
    if (newDate.date && newDate.price) {
      setDepartureDates([
        ...departureDates,
        {
          id: `new-${Date.now()}`,
          package_id: pkg?.id || "",
          departure_date: newDate.date,
          price: parseFloat(newDate.price),
          currency: newDate.currency,
          available_spots: null,
          is_sold_out: false,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
      setNewDate({ date: "", price: "", currency: "USD" });
    }
  };

  const removeDepartureDate = (index: number) => {
    setDepartureDates(departureDates.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();

    try {
      const packageData = {
        ...formData,
        special_section_id: formData.special_section_id || null,
      };

      if (pkg) {
        // Update existing package
        const { error } = await supabase
          .from("packages")
          .update(packageData as never)
          .eq("id", pkg.id);

        if (error) throw error;

        // Update departure dates
        // Delete removed dates
        const existingIds = pkg.departure_dates.map((d) => d.id);
        const currentIds = departureDates
          .filter((d) => !d.id.startsWith("new-"))
          .map((d) => d.id);
        const toDelete = existingIds.filter((id) => !currentIds.includes(id));

        if (toDelete.length > 0) {
          await supabase
            .from("package_departure_dates")
            .delete()
            .in("id", toDelete);
        }

        // Insert new dates
        const newDates = departureDates.filter((d) => d.id.startsWith("new-"));
        if (newDates.length > 0) {
          await supabase.from("package_departure_dates").insert(
            newDates.map((d) => ({
              package_id: pkg.id,
              departure_date: d.departure_date,
              price: d.price,
              currency: d.currency,
            })) as never
          );
        }
      } else {
        // Create new package
        const { data: newPkg, error } = await supabase
          .from("packages")
          .insert(packageData as never)
          .select()
          .single();

        if (error) throw error;

        // Insert departure dates
        if (departureDates.length > 0 && newPkg) {
          const newPkgData = newPkg as { id: string };
          await supabase.from("package_departure_dates").insert(
            departureDates.map((d) => ({
              package_id: newPkgData.id,
              departure_date: d.departure_date,
              price: d.price,
              currency: d.currency,
            })) as never
          );
        }
      }

      router.push("/admin/paquetes");
      router.refresh();
    } catch (error) {
      console.error("Error saving package:", error);
      alert("Error al guardar el paquete");
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
            <Label htmlFor="name">Nombre del Paquete *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ej: Cataratas del Iguazú"
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
              placeholder="cataratas-del-iguazu"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción Corta *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Descripción breve que aparece en las tarjetas"
            rows={2}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="long_description">Descripción Larga</Label>
          <Textarea
            id="long_description"
            value={formData.long_description}
            onChange={(e) =>
              setFormData({ ...formData, long_description: e.target.value })
            }
            placeholder="Descripción detallada que aparece en la página del paquete"
            rows={4}
          />
        </div>

        <ImageUpload
          bucket="packages"
          currentUrl={formData.image_url}
          onUpload={(url) => setFormData({ ...formData, image_url: url })}
          label="Imagen del Paquete"
          required
        />
      </div>

      {/* Destination & Duration */}
      <div className="bg-white rounded-xl border border-border p-6 space-y-6">
        <h2 className="text-lg font-semibold">Destino y Duración</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label>Destino *</Label>
            <Select
              value={formData.destination_slug}
              onValueChange={handleDestinationChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar destino" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((d) => (
                  <SelectItem key={d.slug} value={d.slug}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="days">Días *</Label>
            <Input
              id="days"
              type="number"
              min={1}
              value={formData.days}
              onChange={(e) =>
                setFormData({ ...formData, days: parseInt(e.target.value) || 1 })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nights">Noches *</Label>
            <Input
              id="nights"
              type="number"
              min={0}
              value={formData.nights}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nights: parseInt(e.target.value) || 0,
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="group_size">Tamaño del Grupo</Label>
            <Input
              id="group_size"
              value={formData.group_size}
              onChange={(e) =>
                setFormData({ ...formData, group_size: e.target.value })
              }
              placeholder="Ej: Máx. 20 personas"
            />
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="bg-white rounded-xl border border-border p-6 space-y-6">
        <h2 className="text-lg font-semibold">Precio Base</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="base_price">Precio *</Label>
            <Input
              id="base_price"
              type="number"
              min={0}
              step="0.01"
              value={formData.base_price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  base_price: parseFloat(e.target.value) || 0,
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Moneda</Label>
            <Select
              value={formData.currency}
              onValueChange={(v) => setFormData({ ...formData, currency: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD (Dólares)</SelectItem>
                <SelectItem value="ARS">ARS (Pesos Argentinos)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Departure Dates */}
      <div className="bg-white rounded-xl border border-border p-6 space-y-6">
        <h2 className="text-lg font-semibold">Fechas de Salida</h2>

        <div className="flex gap-4 items-end">
          <div className="space-y-2 flex-1">
            <Label>Fecha</Label>
            <Input
              type="date"
              value={newDate.date}
              onChange={(e) => setNewDate({ ...newDate, date: e.target.value })}
            />
          </div>
          <div className="space-y-2 flex-1">
            <Label>Precio</Label>
            <Input
              type="number"
              placeholder="Precio"
              value={newDate.price}
              onChange={(e) =>
                setNewDate({ ...newDate, price: e.target.value })
              }
            />
          </div>
          <div className="space-y-2 w-32">
            <Label>Moneda</Label>
            <Select
              value={newDate.currency}
              onValueChange={(v) => setNewDate({ ...newDate, currency: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="ARS">ARS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="button" onClick={addDepartureDate}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {departureDates.length > 0 && (
          <div className="border rounded-lg divide-y">
            {departureDates.map((date, index) => (
              <div
                key={date.id}
                className="flex items-center justify-between p-3"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {new Date(date.departure_date).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">
                    {date.currency} {date.price.toLocaleString()}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDepartureDate(index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Services */}
      <div className="bg-white rounded-xl border border-border p-6 space-y-6">
        <h2 className="text-lg font-semibold">Servicios</h2>

        {/* Included Services */}
        <div className="space-y-3">
          <Label>Servicios Incluidos</Label>
          <div className="flex gap-2">
            <Input
              value={newIncluded}
              onChange={(e) => setNewIncluded(e.target.value)}
              placeholder="Agregar servicio incluido"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addService("included_services", newIncluded, setNewIncluded);
                }
              }}
            />
            <Button
              type="button"
              onClick={() =>
                addService("included_services", newIncluded, setNewIncluded)
              }
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.included_services.map((service, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {service}
                <button
                  type="button"
                  onClick={() => removeService("included_services", i)}
                  className="hover:text-green-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <Separator />

        {/* Not Included Services */}
        <div className="space-y-3">
          <Label>Servicios NO Incluidos</Label>
          <div className="flex gap-2">
            <Input
              value={newNotIncluded}
              onChange={(e) => setNewNotIncluded(e.target.value)}
              placeholder="Agregar servicio no incluido"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addService(
                    "not_included_services",
                    newNotIncluded,
                    setNewNotIncluded
                  );
                }
              }}
            />
            <Button
              type="button"
              onClick={() =>
                addService(
                  "not_included_services",
                  newNotIncluded,
                  setNewNotIncluded
                )
              }
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.not_included_services.map((service, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
              >
                {service}
                <button
                  type="button"
                  onClick={() => removeService("not_included_services", i)}
                  className="hover:text-red-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <Separator />

        {/* Optional Excursions */}
        <div className="space-y-3">
          <Label>Excursiones Opcionales</Label>
          <div className="flex gap-2">
            <Input
              value={newExcursion}
              onChange={(e) => setNewExcursion(e.target.value)}
              placeholder="Agregar excursión opcional"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addService(
                    "optional_excursions",
                    newExcursion,
                    setNewExcursion
                  );
                }
              }}
            />
            <Button
              type="button"
              onClick={() =>
                addService("optional_excursions", newExcursion, setNewExcursion)
              }
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.optional_excursions.map((excursion, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {excursion}
                <button
                  type="button"
                  onClick={() => removeService("optional_excursions", i)}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Flags */}
      <div className="bg-white rounded-xl border border-border p-6 space-y-6">
        <h2 className="text-lg font-semibold">Opciones</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="w-5 h-5 rounded border-border"
            />
            <span>Activo (visible en el sitio)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) =>
                setFormData({ ...formData, is_featured: e.target.checked })
              }
              className="w-5 h-5 rounded border-border"
            />
            <span>Destacado</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_groupal}
              onChange={(e) =>
                setFormData({ ...formData, is_groupal: e.target.checked })
              }
              className="w-5 h-5 rounded border-border"
            />
            <span>Grupal</span>
          </label>
        </div>

        <Separator />

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_special}
              onChange={(e) =>
                setFormData({ ...formData, is_special: e.target.checked })
              }
              className="w-5 h-5 rounded border-border"
            />
            <span>Pertenece a una Sección Especial</span>
          </label>

          {formData.is_special && (
            <div className="pl-8 space-y-2">
              <Label>Sección</Label>
              <Select
                value={formData.special_section_id}
                onValueChange={(v) =>
                  setFormData({ ...formData, special_section_id: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar sección" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/paquetes")}
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
              {pkg ? "Guardar Cambios" : "Crear Paquete"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
