import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LIFEWS CONNECT MVP v0.1",
  description: "Educational collaboration platform across LIFEWS Foundation pillars"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
