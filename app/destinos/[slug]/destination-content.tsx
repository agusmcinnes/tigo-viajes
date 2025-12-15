"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageCard, TravelPackage } from "@/components/package-card";

interface DestinationData {
  name: string;
  description: string;
  heroImage: string;
  highlights: string[];
}

interface DestinationPageContentProps {
  destination: DestinationData;
  packages: TravelPackage[];
}

export function DestinationPageContent({
  destination,
  packages,
}: DestinationPageContentProps) {
  const whatsappMessage = encodeURIComponent(
    `Hola! Quiero consultar sobre viajes a ${destination.name}. ¿Podrían darme más información?`
  );
  const whatsappUrl = `https://wa.me/5492923584714?text=${whatsappMessage}`;

  return (
    <>
      {/* Hero Section - Fullwidth */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[550px] overflow-hidden">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${destination.heroImage}')` }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-6 left-4 md:left-8 z-20"
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

        {/* Content */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="container mx-auto px-4 lg:px-12 xl:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-2 text-secondary mb-4"
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Destino</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6"
            >
              {destination.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-xl text-white/90 max-w-2xl"
            >
              {destination.description}
            </motion.p>
          </div>
        </div>

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

      {/* Highlights Section */}
      {destination.highlights.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-12 xl:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-8"
            >
              <Sparkles className="w-5 h-5 text-secondary" />
              <h2 className="text-2xl font-semibold text-foreground">
                Lo mejor de {destination.name}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-3"
            >
              {destination.highlights.map((highlight, index) => (
                <motion.span
                  key={highlight}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-5 py-2.5 bg-primary/5 border border-primary/20 rounded-full text-foreground font-medium cursor-default hover:bg-primary/10 hover:border-primary/30 transition-colors"
                >
                  {highlight}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Packages Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
              Paquetes a <span className="text-primary">{destination.name}</span>
            </h2>
            <p className="text-muted-foreground">
              Encontrá el viaje perfecto para vos
            </p>
          </motion.div>

          {packages.length > 0 ? (
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
              className="text-center py-16 bg-white rounded-2xl border border-border"
            >
              <p className="text-muted-foreground mb-6 text-lg">
                Próximamente tendremos paquetes disponibles para este destino.
              </p>
              <Button asChild size="lg">
                <Link href="/contacto">Consultanos por tu viaje ideal</Link>
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
            className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
              ¿Listo para viajar a {destination.name}?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Escribinos y te armamos el viaje perfecto a tu medida. Te
              asesoramos sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white gap-2"
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
                  className="border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  <Link href="/#destinos">Ver Otros Destinos</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
