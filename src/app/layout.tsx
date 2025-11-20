import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

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
        url: "https://pbs.twimg.com/profile_images/1921460669129363456/MefH_yDv_400x400.jpg",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased selection:bg-foreground selection:text-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
