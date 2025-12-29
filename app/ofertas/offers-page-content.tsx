"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Tag,
  ArrowRight,
  MessageCircle,
  Percent,
  Clock,
  BadgePercent,
  Gift,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageCard, TravelPackage } from "@/components/package-card";

interface OffersPageContentProps {
  packages: TravelPackage[];
}

const whatsappMessage = encodeURIComponent(
  "Hola! Quiero consultar sobre las ofertas disponibles. ¿Podrían darme más información?"
);
const whatsappUrl = `https://wa.me/5492923584714?text=${whatsappMessage}`;

const features = [
  {
    icon: BadgePercent,
    title: "Descuentos Exclusivos",
    description: "Precios especiales por tiempo limitado",
  },
  {
    icon: Clock,
    title: "Cupos Limitados",
    description: "Reserva antes de que se agoten",
  },
  {
    icon: Gift,
    title: "Beneficios Extras",
    description: "Sorpresas incluidas en cada paquete",
  },
  {
    icon: Sparkles,
    title: "Calidad Garantizada",
    description: "Los mejores servicios al mejor precio",
  },
];

export function OffersPageContent({ packages }: OffersPageContentProps) {
  const hasPackages = packages.length > 0;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-orange-500 to-orange-600" />

        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 border-4 border-white rounded-full" />
          <div className="absolute top-40 right-20 w-60 h-60 border-4 border-white rounded-full" />
          <div className="absolute bottom-20 left-1/4 w-32 h-32 border-4 border-white rounded-full" />
        </div>

        {/* Floating Tags */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-32 right-10 md:right-20 lg:right-32"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 md:w-28 md:h-28 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
          >
            <Percent className="w-10 h-10 md:w-14 md:h-14 text-white" />
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
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                  Precios Especiales por Tiempo Limitado
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display text-white mb-6"
              >
                Ofertas{" "}
                <span className="text-yellow-300">Imperdibles</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
              >
                Descubrí nuestras mejores ofertas con descuentos exclusivos.
                Viajá más, pagá menos.
              </motion.p>

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
                    className="bg-white text-secondary hover:bg-white/90 gap-2 text-base px-8"
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
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
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
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-orange-100 rounded-xl flex items-center justify-center shrink-0">
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
              <Tag className="w-6 h-6 text-secondary" />
              <span className="text-secondary font-medium">
                Ofertas Disponibles
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
              Paquetes en <span className="text-secondary">Oferta</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aprovechá estos precios especiales antes de que se agoten los cupos.
              Reserva anticipada disponible.
            </p>
          </motion.div>

          {hasPackages ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <PackageCard key={pkg.id} package={pkg} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Tag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-display text-foreground mb-4">
                No hay ofertas disponibles
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                En este momento no tenemos ofertas activas, pero te invitamos a
                ver nuestros paquetes destacados.
              </p>
              <Button asChild className="bg-secondary hover:bg-secondary/90">
                <Link href="/#destinos" className="flex items-center gap-2">
                  Ver Paquetes Destacados
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          )}
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
            className="relative overflow-hidden bg-gradient-to-r from-secondary to-orange-500 rounded-3xl p-8 md:p-12 lg:p-16"
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
                  ¿Buscás algo personalizado?
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                  Armamos paquetes a tu medida con los mejores precios.
                  Contanos tu destino soñado y te hacemos una propuesta.
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
