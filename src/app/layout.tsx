import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayurdiet.local"),
  title: {
    default: "AyurDiet OS — Ancient Wisdom, Modern Nutrition",
    template: "%s · AyurDiet OS",
  },
  description:
    "Personalized Ayurvedic diet planning fused with evidence-based nutrition. 430+ global foods, 100+ classical Ayurveda tips, ANH-Score algorithm tuned to your Prakriti.",
  keywords: [
    "ayurveda",
    "diet",
    "prakriti",
    "dosha",
    "nutrition",
    "meal planning",
    "ANH score",
    "viruddha aahara",
  ],
  authors: [{ name: "AyurDiet OS" }],
  openGraph: {
    title: "AyurDiet OS",
    description:
      "Personalized Ayurvedic diet planning fused with evidence-based nutrition.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AyurDiet OS",
    description: "Ancient wisdom meets modern nutrition.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0a0a0a] text-white`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
