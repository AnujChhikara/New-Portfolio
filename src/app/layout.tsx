import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL("https://www.anujchhikara.com"),
  keywords:
    "anuj , anuj chhikara, anuj dev, anuj developer, anuj devloper, anuj developer, anuj coder, anuj code, anuj coding, anuj web developer, anuj web developer, web developer, web developer",
  title: {
    default: "Anuj Chhikara",
    template: "%s | Anuj Chhikara",
  },
  description:
    "Anuj Chhikara is a web developer and open source contributor. He is passionate about building and maintaining open source projects.",
  openGraph: {
    images: [
      {
        url: "https://www.anujchhikara.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdlahahicg%2Fimage%2Fupload%2Fv1712917455%2Fzman4v8yaqtvixmnthmi.jpg&w=256&q=75",
        width: 1200,
        height: 630,
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
