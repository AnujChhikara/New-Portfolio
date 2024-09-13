import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <meta name='author' content='Anuj Chhikara' />
        <meta name='robots' content='index, follow' />
        <meta property='og:url' content='https://github.com/AnujChhikara' />
        <meta
          property='og:url'
          content='https://www.linkedin.com/in/anuj-chhikara-webdeveloper/'
        />
        <meta property='og:url' content='https://peerlist.io/anujchhikara' />
        <meta property='og:url' content='mailto:anujchhikara07@gmail.com' />
        <meta
          property='og:title'
          content='Anuj Chhikara | Full Stack Developer'
        />
        <meta
          property='og:description'
          content='Full Stack Developer passionate about web solutions that blend design and functionality.'
        />
        <meta
          property='og:image'
          content='https://res.cloudinary.com/dlahahicg/image/upload/v1712917455/zman4v8yaqtvixmnthmi.jpg'
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@AnujChhikara07' />
        <meta
          name='twitter:title'
          content='Anuj Chhikara | Full Stack Developer'
        />
        <meta
          name='twitter:description'
          content='Building modern, efficient, and user-friendly websites.'
        />
        <meta
          name='twitter:image'
          content='https://res.cloudinary.com/dlahahicg/image/upload/v1712917455/zman4v8yaqtvixmnthmi.jpg'
        />
      </Head>
      <body className={inter.className}>
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
