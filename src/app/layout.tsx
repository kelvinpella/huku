import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huku - Tafuta kazi ndogo ndogo za mikono bila kigezo cha elimu",
  description:
    "Huku ni mtandao unaounganisha watoa huduma na wanaohitaji huduma mbalimbali za kila siku kama usafi wa nyumba, urekebishaji wa vifaa, na kazi nyinginezo za mikono, kwa urahisi na haraka. Elimu sio kigezo kabisa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sw">
      <body
      className={`${montserrat.variable} font-montserrat antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
