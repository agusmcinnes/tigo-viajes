import { Metadata } from "next";
import { Header } from "@/components/header";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con Tigo Viajes. Estamos en Pigue y Coronel Suárez, Buenos Aires. Llamanos o escribinos por WhatsApp.",
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section with Glassmorphism */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/hero-tigo.jpg')",
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70" />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="glass inline-block px-6 py-2 rounded-full mb-6">
              <span className="text-white/90 text-sm font-medium">
                Estamos para ayudarte
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
              Conectá con{" "}
              <span className="relative inline-block">
                nosotros
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-secondary/60 rounded-full" />
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Tu próxima aventura está a un mensaje de distancia.
              <br className="hidden md:block" />
              Escribinos y hagamos realidad tu viaje soñado.
            </p>
          </div>

          {/* Wave Bottom */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
            <svg
              viewBox="0 0 1440 120"
              className="w-full h-16 md:h-20 fill-white"
              preserveAspectRatio="none"
            >
              <path d="M0,64 C360,100 720,20 1080,64 C1260,88 1380,88 1440,72 L1440,120 L0,120 Z" />
            </svg>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
