import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n-context";
import { FloatingLanguageSwitcher } from "@/components/FloatingLanguageSwitcher";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteName = "TestiWall";
const description = "Collect and display client testimonials on your website in 2 minutes. 100% free, no coding required.";
const url = "https://testiwall-kappa.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "TestiWall — Collect and display client testimonials",
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    title: "TestiWall — Collect and display client testimonials",
    description,
    url,
    siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TestiWall — Collect and display client testimonials",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ colorScheme: "only light" }} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <I18nProvider>
          {children}
          <FloatingLanguageSwitcher />
        </I18nProvider>
      </body>
    </html>
  );
}
