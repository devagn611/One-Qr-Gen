import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const baseUrl = 'https://one-qr.devagn.com';

export const metadata: Metadata = {
  title: "One-Qr-Gen: Your All-in-One QR Code Generator",
  description:
    "Create custom QR codes for UPI, vCards, URLs, and more. Easy to use, stylish, and free.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "One-Qr-Gen: Your All-in-One QR Code Generator",
    description: "Create custom QR codes for UPI, vCards, URLs, and more. Easy to use, stylish, and free.",
    url: baseUrl,
    siteName: "One-Qr-Gen",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-950">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
