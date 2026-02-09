"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Menu,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Sun,
  ArrowRight,
  Plane,
  Tag,
  Umbrella,
  Waves,
  Sparkles,
  Palmtree,
  Hotel,
  Camera,
  Heart,
  Star,
  Gift,
  Calendar,
  Clock,
  Users,
  Check,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface Destination {
  name: string;
  slug: string;
  image: string;
  description: string;
}

const fallbackDestinations: Destination[] = [
  {
    name: "Argentina",
    slug: "argentina",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400&q=80",
    description: "Federación, Glaciares, Cataratas",
  },
  {
    name: "Brasil",
    slug: "brasil",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&q=80",
    description: "Camboriú, Florianópolis",
  },
];

const iconMap: Record<string, LucideIcon> = {
  Sun,
  Umbrella,
  Waves,
  Sparkles,
  Palmtree,
  Plane,
  Hotel,
  MapPin,
  Camera,
  Heart,
  Star,
  Gift,
  Calendar,
  Clock,
  Users,
  Check,
  Tag,
};

interface SpecialSectionNav {
  slug: string;
  title: string;
  nav_label: string | null;
  nav_icon_name: string | null;
  nav_color: string | null;
}

interface NavLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
  isSpecial?: boolean;
  navColor?: string;
  navIconName?: string;
}

const baseNavLinks: NavLink[] = [
  { name: "Inicio", href: "/" },
  { name: "Ofertas", href: "/ofertas" },
  { name: "Nosotros", href: "/#nosotros" },
  { name: "Destinos", href: "/#destinos", hasDropdown: true },
  { name: "Contacto", href: "/contacto" },
];

interface HeaderProps {
  variant?: "transparent" | "solid";
}

export function Header({ variant = "transparent" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [destinations, setDestinations] = useState<Destination[]>(fallbackDestinations);
  const [specialSections, setSpecialSections] = useState<SpecialSectionNav[]>([]);

  // Generar navLinks dinámicamente con las secciones especiales
  const specialLinks: NavLink[] = specialSections.map((s) => ({
    name: s.nav_label || s.title,
    href: `/temporada/${s.slug}`,
    isSpecial: true,
    navColor: s.nav_color || "#FE4F00",
    navIconName: s.nav_icon_name || "Sun",
  }));

  const navLinks: NavLink[] = [
    ...baseNavLinks.slice(0, 3), // Inicio, Ofertas, Nosotros
    ...specialLinks,
    ...baseNavLinks.slice(3), // Destinos, Contacto
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cargar destinos y nombre de sección desde Supabase
  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();

        // Cargar destinos
        const { data: destinationsData, error: destError } = await supabase
          .from("destinations")
          .select("name, slug, image_url")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (!destError && destinationsData && destinationsData.length > 0) {
          const destList = destinationsData as { name: string; slug: string; image_url: string | null }[];
          setDestinations(
            destList.map((d) => ({
              name: d.name,
              slug: d.slug,
              image: d.image_url || "",
              description: "",
            }))
          );
        }

        // Cargar secciones especiales activas
        const { data: sectionsData } = await supabase
          .from("special_sections")
          .select("slug, title, nav_label, nav_icon_name, nav_color")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (sectionsData && sectionsData.length > 0) {
          setSpecialSections(
            sectionsData as SpecialSectionNav[]
          );
        }
      } catch {
        // Usar fallback en caso de error
      }
    }
    loadData();
  }, []);

  // Si variant es "solid", siempre mostrar como scrolled (fondo blanco)
  const showSolidHeader = variant === "solid" || isScrolled;

  return (
    <>
      {/* Main Header */}
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          showSolidHeader
            ? "bg-white/95 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Gradient border bottom */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-primary transition-opacity duration-300",
            showSolidHeader ? "opacity-100" : "opacity-0"
          )}
        />

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Image
                  src={showSolidHeader ? "/LOGO TIGO VIOLETA.png" : "/LOGO TIGO BLANCO.png"}
                  alt="Tigo Viajes"
                  width={180}
                  height={60}
                  className="h-14 w-auto transition-all duration-300"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.name} className="relative group">
                    <button className={cn(
                      "relative px-4 py-2 transition-colors duration-300 flex items-center gap-1 font-medium",
                      showSolidHeader
                        ? "text-foreground hover:text-primary"
                        : "text-white hover:text-primary"
                    )}>
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                      <span className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-4/5",
                        showSolidHeader ? "bg-gradient-to-r from-primary to-secondary" : "bg-white"
                      )} />
                    </button>

                    {/* Dropdown on hover */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className={cn(
                        "p-4 bg-white/95 backdrop-blur-xl border-0 shadow-2xl shadow-primary/10 rounded-2xl",
                        destinations.length > 2 ? "w-[500px]" : "w-[400px]"
                      )}>
                        <div className={cn(
                          "grid gap-2",
                          destinations.length > 2 ? "grid-cols-2" : "grid-cols-1"
                        )}>
                          {destinations.map((dest) => (
                            <Link
                              key={dest.slug}
                              href={`/destinos/${dest.slug}`}
                              className="flex gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer group/item"
                            >
                              <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <div
                                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/item:scale-110"
                                  style={{
                                    backgroundImage: `url('${dest.image}')`,
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                              </div>
                              <div className="flex flex-col justify-center flex-1 min-w-0">
                                <span className="font-semibold text-foreground group-hover/item:text-primary transition-colors truncate">
                                  {dest.name}
                                </span>
                                <span className="text-xs text-muted-foreground truncate">
                                  {dest.description}
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover/item:text-primary group-hover/item:translate-x-1 transition-all self-center flex-shrink-0" />
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-border">
                          <Link
                            href="/#destinos"
                            className="flex items-center justify-center gap-2 py-2 text-primary font-medium hover:text-secondary transition-colors"
                          >
                            Ver todos los destinos
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : link.isSpecial ? (
                  (() => {
                    const IconComp = iconMap[link.navIconName || "Sun"] || Sun;
                    return (
                      <Button
                        key={link.name}
                        asChild
                        className="text-white ml-2 rounded-full"
                        style={{ backgroundColor: link.navColor || "#FE4F00" }}
                      >
                        <Link href={link.href} className="flex items-center gap-2">
                          <IconComp className="w-4 h-4" />
                          {link.name}
                        </Link>
                      </Button>
                    );
                  })()
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 transition-colors duration-300 font-medium group",
                      showSolidHeader
                        ? "text-foreground hover:text-primary"
                        : "text-white hover:text-primary"
                    )}
                  >
                    {link.name}
                    <span className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-4/5",
                      showSolidHeader ? "bg-gradient-to-r from-primary to-secondary" : "bg-white"
                    )} />
                  </Link>
                )
              )}
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  className="relative overflow-hidden bg-gradient-to-r from-secondary to-orange-500 hover:from-secondary/90 hover:to-orange-500/90 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 transition-shadow duration-300"
                >
                  <Link href="/contacto" className="flex items-center gap-2">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shine" />
                    <Plane className="w-4 h-4" />
                    <span>Cotizar Viaje</span>
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "transition-colors duration-300",
                    !showSolidHeader && "text-white hover:bg-white/10"
                  )}
                >
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96 p-0 border-0">
                <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50">
                  {/* Mobile Menu Header */}
                  <div className="relative p-6 bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary/20 rounded-full" />

                    <div className="relative flex items-center justify-between">
                      <Image
                        src="/LOGO TIGO BLANCO.png"
                        alt="Tigo Viajes"
                        width={140}
                        height={45}
                        className="h-10 w-auto"
                      />
                    </div>
                    <p className="relative text-white/70 text-sm mt-2">
                      Tu próxima aventura te espera
                    </p>
                  </div>

                  {/* Mobile Menu Links */}
                  <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                      {navLinks.map((link, index) => (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {link.hasDropdown ? (
                            <div className="space-y-2">
                              <div className="flex items-center gap-3 px-4 py-3 text-foreground font-medium">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                  <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <span>{link.name}</span>
                              </div>
                              <div className="space-y-1 px-2">
                                {destinations.map((dest) => (
                                  <Link
                                    key={dest.slug}
                                    href={`/destinos/${dest.slug}`}
                                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <div
                                      className="w-10 h-10 rounded-lg bg-cover bg-center flex-shrink-0"
                                      style={{
                                        backgroundImage: `url('${dest.image}')`,
                                      }}
                                    />
                                    <div className="flex-1">
                                      <span className="text-sm font-medium text-foreground">
                                        {dest.name}
                                      </span>
                                      <p className="text-xs text-muted-foreground">{dest.description}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            (() => {
                              const MobileIconComp = link.isSpecial
                                ? iconMap[link.navIconName || "Sun"] || Sun
                                : null;
                              return (
                                <Link
                                  href={link.href}
                                  className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                    link.isSpecial
                                      ? "text-foreground"
                                      : "text-foreground hover:bg-primary/5"
                                  )}
                                  style={link.isSpecial ? { backgroundColor: `${link.navColor || "#FE4F00"}15` } : undefined}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={link.isSpecial ? { backgroundColor: link.navColor || "#FE4F00" } : undefined}
                                  >
                                    {link.isSpecial && MobileIconComp && <MobileIconComp className="w-5 h-5 text-white" />}
                                    {!link.isSpecial && link.name === "Inicio" && <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                                    {!link.isSpecial && link.name === "Ofertas" && <Tag className="w-5 h-5 text-secondary" />}
                                    {!link.isSpecial && link.name === "Nosotros" && <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                    {!link.isSpecial && link.name === "Contacto" && <Mail className="w-5 h-5 text-primary" />}
                                    {!link.isSpecial && !["Inicio", "Ofertas", "Nosotros", "Contacto"].includes(link.name) && <div className="w-5 h-5 bg-primary/10 rounded" />}
                                  </div>
                                  <div className="flex-1">
                                    <span className="font-medium">{link.name}</span>
                                    {link.isSpecial && (
                                      <p className="text-xs opacity-70">Ofertas especiales</p>
                                    )}
                                  </div>
                                  <ArrowRight className={cn(
                                    "w-4 h-4 transition-transform",
                                    link.isSpecial ? "" : "text-muted-foreground"
                                  )}
                                  style={link.isSpecial ? { color: link.navColor || "#FE4F00" } : undefined}
                                  />
                                </Link>
                              );
                            })()
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile Menu Footer */}
                  <div className="p-4 border-t bg-white">
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 mb-4 rounded-xl h-14 text-base shadow-lg shadow-primary/20"
                    >
                      <Link
                        href="/contacto"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2"
                      >
                        <Plane className="w-5 h-5" />
                        Cotizar Viaje
                      </Link>
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="tel:+5492923405284"
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-100 text-sm text-foreground hover:bg-gray-200 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-primary" />
                        Llamar
                      </a>
                      <a
                        href="https://wa.me/5492923584714"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-500 text-sm text-white hover:bg-green-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </>
  );
}
