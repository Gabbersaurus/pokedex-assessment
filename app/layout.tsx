import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Assessment for Blue Flamingos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased flex flex-col min-h-screen`}
      >
        <Navigation />
        <main className="flex-grow flex p-8 bg-stone-100">{children}</main>
      </body>
    </html>
  );
}
