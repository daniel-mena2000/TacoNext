import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({
    subsets: ['latin'],
    weight: ['400', '700', '900']
})

export const metadata: Metadata = {
  title: "TacoNext",
  description: "TacoNext con NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${font.className} bg-gray-100 h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
