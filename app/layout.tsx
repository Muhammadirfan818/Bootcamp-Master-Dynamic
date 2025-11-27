import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalHeadtext from "@/app/components/GlobalHeadText";
import NavbarSelector from "@/app/components/navbarselectors";
import { createClient } from "@/prismicio";
import { CartProvider } from "@/app/context/cartcontext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Shop",
  description: "E-commerce site built with Next.js and Prismic",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const client = createClient();
  const headtext = await client.getSingle("headtext").catch(() => null);
  const navbarData = await client.getSingle("navbar").catch(() => null);
  const navbar2Data = await client.getSingle("navbar2").catch(() => null);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          {headtext?.data?.headtext && <GlobalHeadtext field={headtext.data.headtext} />}
          <NavbarSelector navbarData={navbarData?.data} navbar2Data={navbar2Data?.data} />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
