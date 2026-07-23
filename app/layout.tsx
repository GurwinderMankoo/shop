import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import AuthProvider from "@/components/Provider/AuthProvider";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theshophub.vercel.app"),

  title: {
    default: "TheShopHub | Discover Quality Products at Great Prices",
    template: "%s | TheShopHub",
  },

  description:
    "Shop electronics, fashion, home essentials, beauty products, and more at TheShopHub. Discover quality products, secure checkout, and fast delivery.",

  keywords: [
    "TheShopHub",
    "online shopping",
    "ecommerce",
    "buy online",
    "electronics",
    "fashion",
    "home essentials",
    "beauty",
    "deals",
    "shopping",
  ],

  authors: [{ name: "Gurwinder Singh" }],
  creator: "Gurwinder Singh",
  publisher: "TheShopHub",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "TheShopHub | Discover Quality Products at Great Prices",
    description:
      "Find electronics, fashion, beauty, home essentials, and more with secure checkout and fast delivery.",
    url: "https://theshophub.vercel.app",
    siteName: "TheShopHub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // 1200x630
        width: 1200,
        height: 630,
        alt: "TheShopHub",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TheShopHub",
    description:
      "Discover quality products with secure checkout and fast delivery.",
    images: ["/og-image.png"],
  },

  category: "shopping",

  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextTopLoader
          color="#2563eb"
          height={3}
          showSpinner={false}
        />
        <AuthProvider>
          <Navbar />
          {children}
          {modal}
          <Footer />
        </AuthProvider>
        <Toaster
          richColors
          position="top-right"
          closeButton
        />
      </body>
    </html>
  );
}
