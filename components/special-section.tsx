"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sun,
  Umbrella,
  Waves,
  ArrowRight,
  Sparkles,
  Palmtree,
  Plane,
  Hotel,
  MapPin,
  Camera,
  Heart,
  Star,
  Gift,
  Calendar,
  Clock,
  Users,
  Check,
  Bus,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mapa de iconos disponibles
const iconMap: Record<string, LucideIcon> = {
  Sun,
  Umbrella,
  Waves,
  Sparkles,
  Palmtree,
  Plane,
  Hotel,
  MapPin,
  Camera,
  Heart,
  Star,
  Gift,
  Calendar,
  Clock,
  Users,
  Check,
  Bus,
};

interface Feature {
  icon_name: string;
  title: string;
  description: string;
}

interface SpecialSectionData {
  slug: string;
  title: string;
  subtitle?: string | null;
  badge_text?: string | null;
  background_image_url?: string | null;
  cta_text?: string | null;
}

interface SpecialSectionProps {
  section?: SpecialSectionData | null;
  features?: Feature[];
}

// Datos por defecto
const defaultSection: SpecialSectionData = {
  slug: "temporada",
  title: "Temporada Especial",
  subtitle:
    "Viajes en bus grupales con las mejores comodidades. Bus Mix de última generación, servicio a bordo y coordinador.",
  badge_text: "Salidas Grupales",
  background_image_url: "/verano2026-tigo.jpg",
  cta_text: "Ver Ofertas",
};

const defaultFeatures: Feature[] = [
  {
    icon_name: "Bus",
    title: "Bus de Última Generación",
    description: "Bus Mix con todas las comodidades",
  },
  {
    icon_name: "Users",
    title: "Grupos de 40 personas",
    description: "Viajá acompañado y conocé gente",
  },
  {
    icon_name: "Sparkles",
    title: "Servicio a Bordo",
    description: "Coordinador durante todo el viaje",
  },
];

export function SpecialSection({ section, features }: SpecialSectionProps) {
  const sectionData = section || defaultSection;
  const featuresData = features && features.length > 0 ? features : defaultFeatures;

  const backgroundImage =
    sectionData.background_image_url || "/verano2026-tigo.jpg";

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium border border-white/30">
              <Sparkles className="w-4 h-4" />
              {sectionData.badge_text || "Ofertas Especiales"}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6"
          >
            {sectionData.title}
          </motion.h2>

          {/* Subtitle */}
          {sectionData.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            >
              {sectionData.subtitle}
            </motion.p>
          )}

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-3 gap-6 mb-10"
          >
            {featuresData.map((feature, index) => {
              const IconComponent = iconMap[feature.icon_name] || Star;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/80">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-secondary hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-xl"
            >
              <Link
                href="/temporada"
                className="flex items-center gap-2"
              >
                {sectionData.cta_text || "Ver Ofertas"}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Urgency message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-white/70 text-sm"
          >
            * Precios promocionales válidos hasta agotar stock
          </motion.p>
        </div>
      </div>
    </section>
  );
}
