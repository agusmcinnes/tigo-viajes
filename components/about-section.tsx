"use client";

import { motion } from "framer-motion";
import { Heart, Users, Award, Globe, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Heart,
    title: "Pasión por viajar",
    description:
      "Cada destino es una nueva aventura que compartimos con vos.",
  },
  {
    icon: Users,
    title: "Atención personalizada",
    description: "Cada viaje es único, adaptado 100% a tus necesidades y deseos.",
  },
  {
    icon: Award,
    title: "Experiencia comprobada",
    description: "Más de 45 años creando momentos inolvidables.",
  },
  {
    icon: Globe,
    title: "Destinos exclusivos",
    description: "Acceso a lugares únicos nacionales e internacionales.",
  },
];

const timeline = [
  {
    year: "1977",
    title: "Nace TURIZONDA",
    description: "Fundada por Saul Pelle en Pigue, Buenos Aires.",
  },
  {
    year: "2011",
    title: "Nace TIGO VIAJES",
    description:
      "Pablo Scarpellino toma la firma y nace Tigo Viajes, manteniendo la esencia de sus orígenes.",
  },
  {
    year: "Hoy",
    title: "Empresa sólida",
    description:
      "Dedicados a salidas grupales acompañadas y paquetes personalizados a medida.",
  },
];

export function AboutSection() {
  return (
    <section id="nosotros" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-secondary font-medium mb-4">
            Nuestra Historia
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-6">
            Conocé <span className="text-primary">Tigo Viajes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Somos una empresa de viajes y turismo donde el único objetivo es que
            tus vacaciones sean únicas.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Image Placeholder - será reemplazado con imagen real */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021')",
                  }}
                />
                {/* Experience Badge */}
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-4xl font-bold">+45</div>
                  <div className="text-sm text-white/80">
                    años de
                    <br />
                    experiencia
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      {item.year}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-primary/20 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features List */}
            <div className="mt-8 space-y-3">
              {[
                "Salidas grupales acompañadas",
                "Paquetes personalizados a medida",
                "Destinos nacionales e internacionales",
                "Atención personalizada",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-muted/30">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
