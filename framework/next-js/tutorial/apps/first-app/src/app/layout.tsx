import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "First App",
  description: "A simple Next.js application.",
  keywords: ["Next.js", "React", "Tutorial", "First App"],
  icons: "/window.svg",
  authors: [
    {
      name: "John Doe",
      url: "https://example.com/johndoe",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"min-h-screen h-screen w-screen"}>{children}</body>
    </html>
  );
}
