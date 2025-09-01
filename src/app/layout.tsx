import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Huku - Discover handy jobs in your local area",
  description:
    "Huku is a professional platform connecting service providers with individuals seeking a wide range of everyday handy jobs, including home cleaning, equipment repair, and more. Access reliable help quickly and easily—no educational qualifications required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} font-montserrat antialiased bg-chef-white`}
      >
        <div className="w-full min-h-screen flex flex-col justify-between">
          <Navbar />
          <main className="min-h-screen w-full lg:max-w-screen-2xl lg:mx-auto px-2 md:px-4">
            {children}
          </main>
          <ToastContainer />
          <Footer />
        </div>
      </body>
    </html>
  );
}
