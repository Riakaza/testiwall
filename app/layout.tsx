import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteName = "TestiWall";
const description = "Collecte et affiche les témoignages de tes clients sur ton site en 2 minutes. 100% gratuit, sans coder.";
const url = "https://testiwall-kappa.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "TestiWall — Collecte et affiche les témoignages de tes clients",
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    title: "TestiWall — Collecte et affiche les témoignages de tes clients",
    description,
    url,
    siteName,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TestiWall — Collecte et affiche les témoignages de tes clients",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ colorScheme: "only light" }}>
      <body>{children}</body>
    </html>
  );
}
