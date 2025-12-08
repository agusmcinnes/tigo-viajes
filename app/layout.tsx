import type { Metadata } from "next";
import { Allan, Poppins } from "next/font/google";
import "./globals.css";

const allan = Allan({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-allan",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tigo Viajes - Tus vacaciones únicas",
    template: "%s | Tigo Viajes",
  },
  description:
    "Tigo Viajes - Empresa de viajes y turismo desde 1977. Salidas grupales acompañadas nacionales e internacionales y paquetes personalizados a medida.",
  keywords: [
    "viajes",
    "turismo",
    "paquetes turisticos",
    "vacaciones",
    "Argentina",
    "Pigue",
    "Coronel Suarez",
    "salidas grupales",
    "viajes grupales",
  ],
  authors: [{ name: "Tigo Viajes" }],
  creator: "Tigo Viajes",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Tigo Viajes",
    title: "Tigo Viajes - Tus vacaciones únicas",
    description:
      "Empresa de viajes y turismo desde 1977. Salidas grupales acompañadas y paquetes personalizados.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tigo Viajes - Tus vacaciones únicas",
    description:
      "Empresa de viajes y turismo desde 1977. Salidas grupales acompañadas y paquetes personalizados.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${allan.variable} ${poppins.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
