"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, Clock, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Tipo unificado para paquetes (compatible con mock y Supabase)
export interface TravelPackage {
  id: string | number;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  destination: string;
  destinationSlug: string;
  price: string;
  duration: string;
  nights: number;
  groupSize?: string;
  dates?: string[];
  imageUrl: string;
  isGroupal?: boolean;
  isFeatured?: boolean;
  isOffer?: boolean;
  includedServices: string[];
  notIncludedServices?: string[];
  additionalServices?: string[];
  itineraryDays?: { dayNumber: number; title: string; description: string }[];
}

interface PackageCardProps {
  package: TravelPackage;
  index?: number;
}

export function PackageCard({ package: pkg, index = 0 }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group p-0">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url('${pkg.imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {pkg.isGroupal && (
              <Badge className="bg-secondary text-white border-0">
                Grupal
              </Badge>
            )}
            {pkg.isFeatured && (
              <Badge className="bg-primary text-white border-0">
                Destacado
              </Badge>
            )}
            {pkg.isOffer && (
              <Badge className="bg-orange-500 text-white border-0">
                Oferta
              </Badge>
            )}
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
            <span className="text-xs text-muted-foreground">Desde</span>
            <p className="text-xl font-bold text-primary">{pkg.price}</p>
          </div>

          {/* Destination */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{pkg.destination}</span>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {pkg.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {pkg.description}
          </p>

          {/* Info Row */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>{pkg.duration}</span>
            </div>
            {pkg.groupSize && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                <span>{pkg.groupSize}</span>
              </div>
            )}
          </div>

          {/* Dates */}
          {pkg.dates && pkg.dates.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4 text-secondary" />
                <span>Próximas salidas:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {pkg.dates.slice(0, 2).map((date) => (
                  <span
                    key={date}
                    className="text-xs bg-muted px-2 py-1 rounded"
                  >
                    {date}
                  </span>
                ))}
                {pkg.dates.length > 2 && (
                  <span className="text-xs bg-muted px-2 py-1 rounded text-primary">
                    +{pkg.dates.length - 2} más
                  </span>
                )}
              </div>
            </div>
          )}

          {/* CTA Button */}
          <Button asChild className="w-full bg-primary hover:bg-primary/90 group/btn">
            <Link href={`/paquete/${pkg.id}`} className="flex items-center justify-center gap-2">
              Ver Detalles
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
