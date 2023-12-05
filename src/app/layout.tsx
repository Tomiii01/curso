import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/header/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConfigurationContextProvider } from "@/contexts/configuration/configuration-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Open AI API Chat App",
  description: "Applicación de ejemplo para chatear con OpenAI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigurationContextProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <TooltipProvider>
              <Header />
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </ConfigurationContextProvider>
      </body>
    </html>
  );
}
