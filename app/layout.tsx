import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "จิ๊กซอว์มหาสนุก | เกมต่อจิ๊กซอว์สำหรับเด็ก",
  description: "มินิเกมต่อจิ๊กซอว์การ์ตูนสัตว์น่ารัก ฝึกมิติสัมพันธ์สำหรับเด็กอนุบาล",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}