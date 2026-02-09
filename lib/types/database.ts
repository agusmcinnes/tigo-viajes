export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      destinations: {
        Row: {
          id: string;
          slug: string;
          name: string;
          image_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      special_sections: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          badge_text: string | null;
          background_image_url: string | null;
          promo_title: string | null;
          promo_description: string | null;
          cta_text: string | null;
          cta_url: string | null;
          is_active: boolean;
          display_order: number;
          nav_label: string | null;
          nav_icon_name: string | null;
          nav_color: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          subtitle?: string | null;
          badge_text?: string | null;
          background_image_url?: string | null;
          promo_title?: string | null;
          promo_description?: string | null;
          cta_text?: string | null;
          cta_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          nav_label?: string | null;
          nav_icon_name?: string | null;
          nav_color?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          subtitle?: string | null;
          badge_text?: string | null;
          background_image_url?: string | null;
          promo_title?: string | null;
          promo_description?: string | null;
          cta_text?: string | null;
          cta_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          nav_label?: string | null;
          nav_icon_name?: string | null;
          nav_color?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      special_section_features: {
        Row: {
          id: string;
          section_id: string;
          icon_name: string;
          title: string;
          description: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_id: string;
          icon_name: string;
          title: string;
          description: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_id?: string;
          icon_name?: string;
          title?: string;
          description?: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      packages: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string;
          long_description: string | null;
          destination: string;
          destination_slug: string;
          days: number;
          nights: number;
          group_size: string | null;
          is_groupal: boolean;
          base_price: number;
          currency: string;
          image_url: string;
          included_services: string[];
          not_included_services: string[];
          optional_excursions: string[];
          is_featured: boolean;
          is_offer: boolean;
          is_special: boolean;
          special_section_id: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description: string;
          long_description?: string | null;
          destination: string;
          destination_slug: string;
          days?: number;
          nights?: number;
          group_size?: string | null;
          is_groupal?: boolean;
          base_price: number;
          currency?: string;
          image_url: string;
          included_services?: string[];
          not_included_services?: string[];
          optional_excursions?: string[];
          is_featured?: boolean;
          is_offer?: boolean;
          is_special?: boolean;
          special_section_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string;
          long_description?: string | null;
          destination?: string;
          destination_slug?: string;
          days?: number;
          nights?: number;
          group_size?: string | null;
          is_groupal?: boolean;
          base_price?: number;
          currency?: string;
          image_url?: string;
          included_services?: string[];
          not_included_services?: string[];
          optional_excursions?: string[];
          is_featured?: boolean;
          is_offer?: boolean;
          is_special?: boolean;
          special_section_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      package_departure_dates: {
        Row: {
          id: string;
          package_id: string;
          departure_date: string;
          price: number;
          currency: string;
          available_spots: number | null;
          is_sold_out: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          package_id: string;
          departure_date: string;
          price: number;
          currency?: string;
          available_spots?: number | null;
          is_sold_out?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          package_id?: string;
          departure_date?: string;
          price?: number;
          currency?: string;
          available_spots?: number | null;
          is_sold_out?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      package_itinerary_days: {
        Row: {
          id: string;
          package_id: string;
          day_number: number;
          title: string;
          description: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          package_id: string;
          day_number: number;
          title: string;
          description: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          package_id?: string;
          day_number?: number;
          title?: string;
          description?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Tipos de ayuda
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// Tipos específicos
export type Destination = Tables<"destinations">;
export type SpecialSection = Tables<"special_sections">;
export type SpecialSectionFeature = Tables<"special_section_features">;
export type Package = Tables<"packages">;
export type PackageDepartureDate = Tables<"package_departure_dates">;
export type PackageItineraryDay = Tables<"package_itinerary_days">;

// Tipo extendido para paquete con fechas de salida
export type PackageWithDepartures = Package & {
  departure_dates: PackageDepartureDate[];
  itinerary_days?: PackageItineraryDay[];
};

// Tipo extendido para sección con features y paquetes
export type SpecialSectionFull = SpecialSection & {
  features: SpecialSectionFeature[];
  packages: Package[];
};

// Tipo compatible con el componente PackageCard existente
export interface TravelPackageDisplay {
  id: string;
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
