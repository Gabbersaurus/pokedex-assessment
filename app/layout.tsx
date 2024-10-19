import type { Metadata } from "next";
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
        <main className="flex-grow flex p-8 md:px-16 lg:px-32 xl:px-64 2xl:px-96 bg-stone-100">
          {children}
        </main>
      </body>
    </html>
  );
}
