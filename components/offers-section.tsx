"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Percent, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageCard, TravelPackage } from "@/components/package-card";

interface OffersSectionProps {
  packages?: TravelPackage[];
}

export function OffersSection({ packages = [] }: OffersSectionProps) {
  if (packages.length === 0) return null;

  const offerPackages = packages.slice(0, 6);

  return (
    <section id="ofertas" className="py-20 relative overflow-hidden">
      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-orange-50 to-yellow-50" />

      {/* Patron decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100/50 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary font-medium px-4 py-2 rounded-full mb-4">
            <Percent className="w-4 h-4" />
            Precios Especiales
          </span>

          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-6">
            <span className="text-secondary">Ofertas</span> Imperdibles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aprovecha nuestras ofertas exclusivas con precios especiales por
            tiempo limitado. No te quedes sin tu viaje soñado.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {offerPackages.map((pkg, index) => (
            <PackageCard key={pkg.id} package={pkg} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-secondary to-orange-500 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Decoraciones */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <Tag className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl md:text-3xl font-display mb-4">
              Ofertas por tiempo limitado
            </h3>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Estas ofertas tienen cupos limitados. Consulta disponibilidad y
              reserva tu lugar antes de que se agoten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-white/90 text-secondary"
              >
                <Link href="/ofertas" className="flex items-center gap-2">
                  Ver Todas las Ofertas
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
