"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Sparkles,
  MapPin,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Settings,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Vista general",
  },
  {
    label: "Paquetes",
    href: "/admin/paquetes",
    icon: Package,
    description: "Gestionar viajes",
  },
  {
    label: "Secciones",
    href: "/admin/secciones",
    icon: Sparkles,
    description: "Ofertas especiales",
  },
  {
    label: "Destinos",
    href: "/admin/destinos",
    icon: MapPin,
    description: "Ubicaciones",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-xl shadow-lg border border-gray-200/60 hover:bg-gray-50 transition-colors"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 flex flex-col transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg">Tigo Viajes</h1>
              <p className="text-gray-500 text-xs">Panel de Admin</p>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2">
          <p className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Menu
          </p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-white border border-violet-500/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isActive(item.href)
                      ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                      : "bg-gray-800 text-gray-400 group-hover:bg-gray-700 group-hover:text-white"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="block">{item.label}</span>
                  <span className="block text-xs text-gray-500 group-hover:text-gray-400">
                    {item.description}
                  </span>
                </div>
                {isActive(item.href) && (
                  <ChevronRight className="w-4 h-4 text-violet-400" />
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-lg bg-gray-800 text-gray-400 group-hover:bg-gray-700 group-hover:text-white transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
            <span>Ver sitio web</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-gray-800 text-red-400 group-hover:bg-red-500/20 transition-colors">
              <LogOut className="w-4 h-4" />
            </div>
            <span>Cerrar sesion</span>
          </button>
        </div>
      </aside>
    </>
  );
}
