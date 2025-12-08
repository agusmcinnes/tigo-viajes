"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plane,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/#nosotros" },
  { name: "Destinos", href: "/#destinos" },
  { name: "Verano 2026", href: "/verano-2026" },
  { name: "Contacto", href: "/contacto" },
];

const destinations = [
  { name: "Argentina", href: "/destinos/argentina" },
  { name: "Brasil", href: "/destinos/brasil" },
  { name: "Caribe", href: "/destinos/caribe" },
  { name: "Europa", href: "/destinos/europa" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display text-2xl text-white">
                  Tigo Viajes
                </span>
                <p className="text-xs text-gray-400">Desde 1977</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Somos una empresa de viajes y turismo donde el único objetivo es
              que tus vacaciones sean únicas. Más de 45 años de experiencia nos
              respaldan.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5492923584714"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-secondary transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Destinations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">
              Destinos Populares
            </h3>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.name}>
                  <Link
                    href={dest.href}
                    className="text-gray-400 hover:text-secondary transition-colors inline-block"
                  >
                    {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">
              Contacto
            </h3>

            {/* Casa Central */}
            <div className="mb-6">
              <h4 className="text-secondary font-medium mb-3">Casa Central</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    Av. Casey 802, Pigue
                    <br />
                    Buenos Aires CP 8170
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a
                    href="tel:+5492923405284"
                    className="text-gray-400 hover:text-secondary transition-colors"
                  >
                    +54 9 2923 405284
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <a
                    href="https://wa.me/5492923584714"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-500 transition-colors"
                  >
                    +54 9 2923 584714
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a
                    href="mailto:tigoviajes@gmail.com"
                    className="text-gray-400 hover:text-secondary transition-colors"
                  >
                    tigoviajes@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Sucursal */}
            <div>
              <h4 className="text-secondary font-medium mb-3">Sucursal</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    Belgrano 1288
                    <br />
                    Coronel Suárez, Buenos Aires
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a
                    href="tel:+5492926520369"
                    className="text-gray-400 hover:text-secondary transition-colors"
                  >
                    +54 9 2926 520369
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {currentYear} Tigo Viajes. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Lun - Vie: 9:00 - 18:00
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
