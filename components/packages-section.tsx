"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageCard } from "@/components/package-card";
import { allPackages } from "@/lib/packages-data";

// Mostrar los primeros 6 paquetes en la página principal
const featuredPackages = allPackages.slice(0, 6);

export function PackagesSection() {
  return (
    <section id="destinos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-secondary font-medium mb-4">
            Nuestros Destinos
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-6">
            Paquetes <span className="text-primary">Destacados</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubrí nuestras mejores opciones de viaje. Salidas grupales
            acompañadas y paquetes personalizados para que vivas experiencias
            únicas.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPackages.map((pkg, index) => (
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
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-display mb-4">
              ¿No encontrás lo que buscás?
            </h3>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Creamos viajes personalizados a tu medida. Contanos tu destino
              soñado y armamos el paquete perfecto para vos.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white"
            >
              <Link href="/contacto" className="flex items-center gap-2">
                Solicitar Cotización
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
