import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "STUDIO | Product Design Portfolio",
  description: "Estética funcional y narrativas visuales.",
  icons: {
    icon: "/images/favicon_shrk.ico?v=2",
    shortcut: "/images/favicon_shrk.ico?v=2",
    apple: "/images/favicon_shrk.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-dark font-outfit select-none">
        {children}
      </body>
    </html>
  );
}
