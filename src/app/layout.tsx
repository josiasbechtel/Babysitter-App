import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Babysitter MVP",
  description:
    "Erstes Next.js MVP fuer eine vertrauenswuerdige Babysitter-Vermittlungsplattform."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
