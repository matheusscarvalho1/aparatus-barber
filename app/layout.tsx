import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "./_components/ui/sonner";
import QueryProvider from "./_providers/query-provider";
import { ThemeProvider } from "./_providers/theme-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aparatus",
  description:
    "Agende seu horário na distância de um clique em nossas barbearias parceiras!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange>
          <QueryProvider>
            {children}
            <Toaster richColors/>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
