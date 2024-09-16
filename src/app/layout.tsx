import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anuj Chhikara | Full Stack Developer",
  description:
    "Full Stack Developer with a passion for building user-centric, efficient web solutions. Specializing in both design and performance.",
  openGraph: {
    title: "Anuj Chhikara | Full Stack Developer",
    description:
      "Full Stack Developer passionate about web solutions that blend design and functionality.",
    url: "https://www.anujchhikara.com",
    images: [
      {
        url: "https://res.cloudinary.com/dlahahicg/image/upload/v1712917455/zman4v8yaqtvixmnthmi.jpg",
        width: 800,
        height: 600,
        alt: "Anuj Chhikara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AnujChhikara07", // Replace with your actual Twitter handle
    title: "Anuj Chhikara | Full Stack Developer",
    description: "Building modern, efficient, and user-friendly websites.",
    images: [
      {
        url: "https://res.cloudinary.com/dlahahicg/image/upload/v1712917455/zman4v8yaqtvixmnthmi.jpg",
        width: 800,
        height: 600,
        alt: "Anuj Chhikara",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
