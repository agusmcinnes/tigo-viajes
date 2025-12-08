"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PackageCard, TravelPackage } from "@/components/package-card";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Umbrella,
  Waves,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Calendar,
  Palmtree,
} from "lucide-react";

// Mock data - será reemplazado por Supabase con is_special = true
const summerPackages: TravelPackage[] = [
  {
    id: 101,
    name: "Mar del Plata Clásico",
    description:
      "La perla del Atlántico te espera. Playas, casino, shows y la mejor gastronomía costera.",
    destination: "Argentina",
    price: "ARS 450.000",
    duration: "7 días / 6 noches",
    dates: ["4 Ene 2026", "11 Ene 2026", "18 Ene 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070",
    isFeatured: true,
  },
  {
    id: 102,
    name: "Florianópolis Premium",
    description:
      "Las 42 playas más lindas de Brasil te esperan. Incluye traslados y excursiones.",
    destination: "Brasil",
    price: "USD 1.150",
    duration: "8 días / 7 noches",
    dates: ["5 Ene 2026", "12 Ene 2026", "19 Ene 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=2069",
    isGroupal: true,
    isFeatured: true,
  },
  {
    id: 103,
    name: "Punta Cana All Inclusive",
    description:
      "Resort 5 estrellas con todo incluido. Bebidas, comidas, actividades y entretenimiento.",
    destination: "Caribe",
    price: "USD 1.890",
    duration: "8 días / 7 noches",
    dates: ["15 Feb 2026", "22 Feb 2026", "1 Mar 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2074",
    isFeatured: true,
  },
  {
    id: 104,
    name: "Buzios & Arraial do Cabo",
    description:
      "Combiná las playas más exclusivas de Brasil con el Caribe Brasileño.",
    destination: "Brasil",
    price: "USD 980",
    duration: "7 días / 6 noches",
    dates: ["8 Ene 2026", "22 Ene 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070",
    isGroupal: true,
  },
  {
    id: 105,
    name: "Villa Gesell Familiar",
    description:
      "El destino familiar por excelencia. Playas tranquilas, bosques y diversión para toda la familia.",
    destination: "Argentina",
    price: "ARS 380.000",
    duration: "7 días / 6 noches",
    dates: ["10 Ene 2026", "17 Ene 2026", "24 Ene 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073",
  },
  {
    id: 106,
    name: "Cancún Todo Incluido",
    description:
      "La Riviera Maya en su máximo esplendor. Pirámides, cenotes y las mejores playas.",
    destination: "Caribe",
    price: "USD 2.100",
    duration: "8 días / 7 noches",
    dates: ["20 Feb 2026", "5 Mar 2026"],
    imageUrl:
      "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=2070",
    isFeatured: true,
  },
];

const features = [
  {
    icon: Sun,
    title: "Sol Garantizado",
    description: "Los mejores destinos de playa para disfrutar del verano",
  },
  {
    icon: Umbrella,
    title: "All Inclusive",
    description: "Opciones con todo incluido para despreocuparte",
  },
  {
    icon: Waves,
    title: "Playas Paradisíacas",
    description: "Desde el Caribe hasta la costa argentina",
  },
  {
    icon: Sparkles,
    title: "Precios Especiales",
    description: "Ofertas exclusivas reservando con anticipación",
  },
];

const whatsappMessage = encodeURIComponent(
  "Hola! Quiero consultar sobre las ofertas de Verano 2026. ¿Podrían darme más información?"
);
const whatsappUrl = `https://wa.me/5492923584714?text=${whatsappMessage}`;

export default function Verano2026Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="transparent" />

      <main>
        {/* Hero Section - Fullwidth */}
        <section className="relative h-[85vh] min-h-[600px] max-h-[800px] overflow-hidden">
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073')",
            }}
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
                    Ofertas Especiales - Cupos Limitados
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display text-white mb-6"
                >
                  Verano{" "}
                  <span className="text-secondary">2026</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
                >
                  Asegurá tus vacaciones con los mejores precios.
                  Sol, playa y aventura te esperan.
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
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
              {features.map((feature, index) => (
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
                    <feature.icon className="w-7 h-7 text-secondary" />
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
              ))}
            </div>
          </div>
        </section>

        {/* Countdown / Urgency Banner */}
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
                  <p className="text-white/80 text-sm">Reserva anticipada</p>
                  <p className="text-xl font-semibold">
                    Hasta 20% OFF reservando antes del 31 de Marzo
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
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
                Encontrá el destino perfecto para tus vacaciones. Todos los
                paquetes incluyen alojamiento y traslados.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {summerPackages.map((pkg, index) => (
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
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
