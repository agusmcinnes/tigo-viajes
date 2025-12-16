"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  Calendar,
  Check,
  Plus,
  MessageCircle,
  ArrowLeft,
  Moon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PackageCard, TravelPackage } from "@/components/package-card";

interface PackageDetailContentProps {
  pkg: TravelPackage;
  relatedPackages: TravelPackage[];
}

export function PackageDetailContent({
  pkg,
  relatedPackages,
}: PackageDetailContentProps) {
  const whatsappMessage = encodeURIComponent(
    `Hola! Estoy interesado en el paquete "${pkg.name}" (${pkg.duration}). Me gustaría recibir más información.`
  );
  const whatsappUrl = `https://wa.me/5492923584714?text=${whatsappMessage}`;

  return (
    <>
      {/* Hero Image - Fullwidth */}
      <section className="relative h-[45vh] min-h-[350px] max-h-[500px] overflow-hidden">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${pkg.imageUrl}')` }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-6 left-4 md:left-8 z-10"
        >
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-white/90 hover:text-white hover:bg-white/10 gap-2"
          >
            <Link href="/#destinos">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute top-6 right-4 md:right-8 flex gap-2 z-10"
        >
          {pkg.isGroupal && (
            <Badge className="bg-secondary text-white border-0 px-4 py-1.5">
              Viaje Grupal
            </Badge>
          )}
          {pkg.isFeatured && (
            <Badge className="bg-primary text-white border-0 px-4 py-1.5">
              Destacado
            </Badge>
          )}
        </motion.div>

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-24 left-4 md:left-8 flex items-center gap-2 text-white z-10"
        >
          <MapPin className="w-5 h-5" />
          <span className="font-medium text-lg">{pkg.destination}</span>
        </motion.div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-10">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-16 md:h-20 fill-white"
            preserveAspectRatio="none"
          >
            <path d="M0,64 C360,100 720,20 1080,64 C1260,88 1380,88 1440,72 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-4">
                {pkg.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {pkg.longDescription || pkg.description}
              </p>
            </motion.div>

            {/* Quick Info Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-6 py-6 border-y border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Duración</p>
                  <p className="font-medium">{pkg.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Noches</p>
                  <p className="font-medium">{pkg.nights} noches</p>
                </div>
              </div>

              {pkg.groupSize && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Grupo</p>
                    <p className="font-medium">{pkg.groupSize}</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Dates */}
            {pkg.dates && pkg.dates.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-semibold">Próximas salidas</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {pkg.dates.map((date) => (
                    <span
                      key={date}
                      className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-medium text-sm"
                    >
                      {date}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Included Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Servicios Incluidos</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {pkg.includedServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50"
                  >
                    <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Additional Services */}
            {pkg.additionalServices && pkg.additionalServices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Servicios Adicionales</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Estos servicios opcionales se pueden contratar por separado
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pkg.additionalServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-orange-50/50"
                    >
                      <Plus className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                      <span className="text-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Sticky Price & CTA */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-28"
            >
              <div className="border border-border rounded-2xl p-6 space-y-6">
                {/* Price */}
                <div>
                  <span className="text-sm text-muted-foreground">Desde</span>
                  <p className="text-4xl font-bold text-primary">{pkg.price}</p>
                  <span className="text-sm text-muted-foreground">
                    por persona
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Quick Summary */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duración</span>
                    <span className="font-medium">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destino</span>
                    <span className="font-medium">{pkg.destination}</span>
                  </div>
                  {pkg.groupSize && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Grupo</span>
                      <span className="font-medium">{pkg.groupSize}</span>
                    </div>
                  )}
                </div>

                {/* WhatsApp CTA */}
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
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

                <p className="text-xs text-center text-muted-foreground">
                  Te respondemos en minutos
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      {relatedPackages.length > 0 && (
        <section className="py-20 mt-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-block text-secondary font-medium mb-4">
                Seguí explorando
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-foreground">
                Paquetes <span className="text-primary">Relacionados</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPackages.map((relatedPkg, index) => (
                <PackageCard
                  key={relatedPkg.id}
                  package={relatedPkg}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
