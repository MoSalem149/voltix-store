import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthProvider from "../components/AuthProvider";

export const metadata: Metadata = {
  title: "Voltix Store - Modern Electronics E-commerce",
  description:
    "Shop the latest electronics and gadgets at Voltix Store. Fast shipping, secure checkout, and exclusive deals on premium products.",
  keywords: ["electronics", "gadgets", "online store", "e-commerce"],
  authors: [{ name: "Voltix Store" }],
  creator: "Voltix Store",
  publisher: "Voltix Store",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    title: "Voltix Store - Modern Electronics E-commerce",
    description:
      "Shop the latest electronics and gadgets at Voltix Store. Fast shipping, secure checkout, and exclusive deals.",
    type: "website",
    locale: "en_US",
    siteName: "Voltix Store",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voltix Store - Modern Electronics E-commerce",
    description: "Shop the latest electronics and gadgets at Voltix Store.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="min-h-full bg-gray-950 text-white flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}