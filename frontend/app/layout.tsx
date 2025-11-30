import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Easy Reminder",
  description: "Your reminder app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
