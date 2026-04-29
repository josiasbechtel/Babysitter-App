import type { Metadata } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans"
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Babysitter App MVP",
  description:
    "Mobiles MVP-Grundgeruest fuer eine vertrauenswuerdige Babysitter-Vermittlungsplattform mit Familie-, Babysitter- und Admin-Flow."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${jakarta.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
