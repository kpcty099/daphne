import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "interiorsby.daphne | Spaces That Feel Like Home",
  description: "Experience futuristic, 3D and luxurious interior designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark antialiased">
      <body className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: { background: '#0A0A0A', border: '1px solid rgba(212,175,55,0.3)', color: '#fff' },
          }}
        />
      </body>
    </html>
  );
}
