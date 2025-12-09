"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Calendar, ArrowRight } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    value: "+45",
    label: "Años de experiencia",
  },
  {
    icon: Users,
    value: "Miles",
    label: "de viajeros felices",
  },
  {
    icon: MapPin,
    value: "+50",
    label: "Destinos",
  },
];

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-32"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-tigo.jpg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-10">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-20 md:h-24 fill-white"
          preserveAspectRatio="none"
        >
          <path d="M0,64 C360,100 720,20 1080,64 C1260,88 1380,88 1440,72 L1440,120 L0,120 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="relative inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
              </span>
              Viajando desde 1977
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl xl:text-7xl font-display text-white mb-6 leading-tight"
          >
            <span className="block">
              Tus vacaciones{" "}
              <span className="relative inline-block">
                <span className="text-secondary">únicas</span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-secondary/40 rounded-full" />
              </span>
            </span>
            <span className="block">comienzan aquí</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Somos una empresa de viajes y turismo dedicada a crear experiencias
            inolvidables. Salidas grupales acompañadas nacionales e
            internacionales y paquetes personalizados a tu medida.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-secondary to-orange-500 hover:from-secondary/90 hover:to-orange-500/90 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-shadow duration-300"
              >
                <Link href="/#destinos" className="flex items-center gap-2">
                  Explorar Destinos
                  <ArrowRight className="w-5 h-5" />
                </Link>
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
                className="border-2 border-white/80 text-white hover:bg-white hover:text-primary text-lg px-8 py-6 rounded-full bg-white/5 backdrop-blur-sm transition-all duration-300"
              >
                <Link href="/#nosotros">Conocé más</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center w-full"
          >
            <div className="grid grid-cols-3 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-secondary/30">
                      <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-secondary" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-white/80">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
