"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+54 9 2923 584714",
    href: "https://wa.me/5492923584714?text=Hola!%20Quiero%20consultar%20sobre%20un%20viaje",
    description: "Respuesta inmediata",
    variant: "whatsapp" as const,
    animation: "pulse" as const,
  },
  {
    icon: Phone,
    title: "Teléfono",
    value: "+54 9 2923 405284",
    href: "tel:+5492923405284",
    description: "Casa Central Pigue",
    variant: "default" as const,
    animation: "shake" as const,
  },
  {
    icon: Mail,
    title: "Email",
    value: "tigoviajes@gmail.com",
    href: "mailto:tigoviajes@gmail.com",
    description: "Consultas generales",
    variant: "default" as const,
    animation: "bounce" as const,
  },
  {
    icon: Clock,
    title: "Horarios",
    value: "Lun-Vie: 9-18hs",
    secondaryValue: "Sáb: 9-13hs",
    href: null,
    description: "Atención personalizada",
    variant: "schedule" as const,
    animation: "rotate" as const,
  },
];

const locations = [
  {
    title: "Casa Central",
    city: "Pigue",
    address: "Av. Casey 802",
    details: "Buenos Aires CP 8170",
    phone: "+54 9 2923 405284",
    whatsapp: "+54 9 2923 584714",
  },
  {
    title: "Sucursal",
    city: "Coronel Suárez",
    address: "Belgrano 1288",
    details: "Buenos Aires",
    phone: "+54 9 2926 520369",
    whatsapp: "+54 9 2926 520369",
  },
];

const iconAnimations = {
  pulse: {
    scale: [1, 1.1, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
  shake: {
    rotate: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
  bounce: {
    y: [0, -5, 0],
    transition: { duration: 0.4 },
  },
  rotate: {
    rotate: [0, 360],
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
};

interface ContactCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  secondaryValue?: string;
  href: string | null;
  description: string;
  variant: "default" | "whatsapp" | "schedule";
  animation: "pulse" | "shake" | "bounce" | "rotate";
  index: number;
}

function ContactCard({
  icon: Icon,
  title,
  value,
  secondaryValue,
  href,
  description,
  variant,
  animation,
  index,
}: ContactCardProps) {
  const cardVariants = {
    default: "glass-card hover:shadow-xl",
    whatsapp: "glass-whatsapp hover:shadow-xl hover:shadow-green-500/20",
    schedule: "bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 hover:shadow-xl hover:shadow-secondary/10",
  };

  const iconColors = {
    default: "text-primary",
    whatsapp: "text-green-500",
    schedule: "text-secondary",
  };

  const CardWrapper = href ? "a" : "div";
  const cardProps = href
    ? {
        href,
        target: href.startsWith("http") ? "_blank" : undefined,
        rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <CardWrapper
        {...cardProps}
        className={`block rounded-2xl p-6 transition-all duration-300 cursor-pointer group ${cardVariants[variant]}`}
      >
        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="h-full"
        >
          {/* Icon */}
          <div className="flex items-center justify-between mb-4">
            <motion.div
              animate={animation === "pulse" ? iconAnimations.pulse : undefined}
              whileHover={
                animation !== "pulse" ? iconAnimations[animation] : undefined
              }
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                variant === "whatsapp"
                  ? "bg-green-500/20"
                  : variant === "schedule"
                    ? "bg-secondary/20"
                    : "bg-primary/10"
              }`}
            >
              <Icon className={`w-6 h-6 ${iconColors[variant]}`} />
            </motion.div>
            {href && (
              <ExternalLink
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
              />
            )}
          </div>

          {/* Content */}
          <h3 className="text-sm font-medium mb-1 text-muted-foreground">
            {title}
          </h3>
          <p
            className={`text-lg font-semibold mb-1 ${
              variant === "whatsapp"
                ? "text-green-600"
                : variant === "schedule"
                  ? "text-secondary"
                  : "text-foreground"
            }`}
          >
            {value}
          </p>
          {secondaryValue && (
            <p className="text-base font-medium text-foreground">
              {secondaryValue}
            </p>
          )}
          <p className="text-xs mt-2 text-muted-foreground">
            {description}
          </p>
        </motion.div>
      </CardWrapper>
    </motion.div>
  );
}

interface LocationCardProps {
  location: (typeof locations)[0];
  index: number;
}

function LocationCard({ location, index }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-card rounded-2xl p-6 group cursor-default"
    >
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ y: [0, -3, 0] }}
          transition={{ duration: 0.4 }}
          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
        >
          <MapPin className="w-6 h-6 text-primary" />
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-secondary uppercase tracking-wider">
              {location.title}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {location.city}
          </h3>
          <p className="text-muted-foreground text-sm">
            {location.address}
            <br />
            {location.details}
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href={`tel:${location.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {location.phone}
            </a>
            <a
              href={`https://wa.me/${location.whatsapp.replace(/[\s+]/g, "").replace(/^54/, "54")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 hover:text-green-500 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ContactSection() {
  return (
    <section id="contacto" className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5" />

      {/* Decorative blobs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Grid: Map + Contact Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl overflow-hidden h-[400px] lg:h-[500px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3116.8!2d-62.417!3d-37.607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95eb1b7b1b7b1b7b%3A0x1b7b1b7b1b7b1b7b!2sAv.%20Casey%20802%2C%20Pigue%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1699900000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Tigo Viajes"
              className="grayscale-[20%] contrast-[1.1]"
            />
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactMethods.map((method, index) => (
              <ContactCard key={method.title} {...method} index={index} />
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="grid md:grid-cols-2 gap-6">
          {locations.map((location, index) => (
            <LocationCard key={location.city} location={location} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
