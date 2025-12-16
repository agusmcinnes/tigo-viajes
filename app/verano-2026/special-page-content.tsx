"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sun,
  Umbrella,
  Waves,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Calendar,
  Palmtree,
  Plane,
  Hotel,
  MapPin,
  Camera,
  Heart,
  Star,
  Gift,
  Clock,
  Users,
  Check,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageCard, TravelPackage } from "@/components/package-card";

// Mapa de iconos
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
};

interface Feature {
  icon_name: string;
  title: string;
  description: string;
}

interface SectionData {
  slug: string;
  title: string;
  subtitle?: string | null;
  badge_text?: string | null;
  background_image_url?: string | null;
  promo_title?: string | null;
  promo_description?: string | null;
  features: Feature[];
}

interface SpecialPageContentProps {
  section: SectionData;
  packages: TravelPackage[];
}

const whatsappMessage = encodeURIComponent(
  "Hola! Quiero consultar sobre las ofertas de Verano 2026. ¿Podrían darme más información?"
);
const whatsappUrl = `https://wa.me/5492923584714?text=${whatsappMessage}`;

export function SpecialPageContent({ section, packages }: SpecialPageContentProps) {
  const backgroundImage =
    section.background_image_url ||
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073";

  return (
    <>
      {/* Hero Section - Fullwidth */}
      <section className="relative h-[85vh] min-h-[600px] max-h-[800px] overflow-hidden">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Animated Sun Decoration */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-32 right-10 md:right-20 lg:right-32"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 md:w-32 md:h-32 text-yellow-400/30"
          >
            <Sun className="w-full h-full" strokeWidth={1} />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="container mx-auto px-4 lg:px-12 xl:px-20">
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 bg-secondary/90 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                  {section.badge_text || "Ofertas Especiales"}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display text-white mb-6"
              >
                {section.title.split(" ")[0]}{" "}
                <span className="text-secondary">
                  {section.title.split(" ").slice(1).join(" ")}
                </span>
              </motion.h1>

              {/* Description */}
              {section.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
                >
                  {section.subtitle}
                </motion.p>
              )}

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 text-white gap-2 text-base px-8"
                  >
                    <a href="#paquetes">
                      Ver Ofertas
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-secondary bg-transparent gap-2 text-base px-8"
                  >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5" />
                      Consultar Ahora
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-10">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-16 md:h-24 fill-white"
            preserveAspectRatio="none"
          >
            <path d="M0,64 C360,100 720,20 1080,64 C1260,88 1380,88 1440,72 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 -mt-8 relative z-20">
        <div className="container mx-auto px-4 lg:px-12 xl:px-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {section.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon_name] || Star;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg border border-border/50 hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl flex items-center justify-center shrink-0">
                    <IconComponent className="w-7 h-7 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      {section.promo_title && (
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-12 xl:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary via-primary to-secondary rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">{section.promo_title}</p>
                  <p className="text-xl font-semibold">
                    {section.promo_description}
                  </p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 gap-2"
                >
                  <a href="#paquetes">
                    Aprovechar Oferta
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Packages Section */}
      <section id="paquetes" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Palmtree className="w-6 h-6 text-secondary" />
              <span className="text-secondary font-medium">
                Destinos de Verano
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
              Paquetes <span className="text-secondary">Imperdibles</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Encontrá el destino perfecto para tus vacaciones. Todos los paquetes
              incluyen alojamiento y traslados.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <PackageCard key={pkg.id} package={pkg} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden bg-gradient-to-r from-secondary to-primary rounded-3xl p-8 md:p-12 lg:p-16"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-4">
                  ¿No encontrás lo que buscás?
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                  Armamos paquetes personalizados para que tus vacaciones de
                  verano sean exactamente como las soñás.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-secondary hover:bg-white/90 gap-2"
                  >
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Consultar por WhatsApp
                    </a>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-secondary bg-transparent"
                  >
                    <Link href="/#destinos">Ver Todos los Destinos</Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 text-white/60 text-sm"
              >
                * Precios promocionales válidos hasta agotar stock. Consultar
                disponibilidad.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
