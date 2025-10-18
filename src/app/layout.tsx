import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ScanMe – QR kod orqali tezkor mahsulot tekshiruvi",
    template: "%s | ScanMe",
  },
  description:
    "ScanMe — E-Investment tomonidan yaratilgan innovatsion platforma. Siz QR kodni skanerlab mahsulot haqidagi ma'lumotni tezkor va ishonchli tarzda tekshirishingiz mumkin.",
  generator: "E-Investment",
  applicationName: "ScanMe",
  keywords: [
    "ScanMe",
    "E-Investment",
    "QR kod",
    "Mahsulot tekshiruvi",
    "QR scanner",
    "Authenticity check",
    "O‘zbekiston texnologiya",
  ],
  authors: [{ name: "E-Investment Team", url: "https://e-investment.uz" }],
  creator: "E-Investment",
  publisher: "E-Investment",
  // metadataBase: new URL("https://scanme.uz"), // agar domening bo‘lsa shu yerga yoz
  openGraph: {
    title: "ScanMe – QR kod orqali tezkor mahsulot tekshiruvi",
    description:
      "Mahsulotni QR kod orqali tekshiring. E-Investment tomonidan ishlab chiqilgan ScanMe platformasi bilan ishonchli natijalarga ega bo‘ling.",
    url: "https://scanme.uz",
    siteName: "ScanMe",
    images: [
      {
        url: "https://scanme.uz/og-image.png", // Open Graph uchun rasm (og:image)
        width: 1200,
        height: 630,
        alt: "ScanMe platformasi",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScanMe – QR kod orqali mahsulot tekshiruvi",
    description:
      "ScanMe orqali QR kodni skanerlab mahsulot haqidagi ma'lumotni tezda oling. Ishonchli. Tezkor. Zamonaviy.",
    images: ["https://scanme.uz/og-image.png"],
    creator: "@einvestment_uz", // agar Twitter akkaunting bo‘lsa shu yerda yoz
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://scanme.uz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <head>
        <Script
          src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
