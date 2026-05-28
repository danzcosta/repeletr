import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "REPELETR - Poupe na sua Energia",
  description: "Simulação gratuita e sem compromisso para poupar na sua fatura de energia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}