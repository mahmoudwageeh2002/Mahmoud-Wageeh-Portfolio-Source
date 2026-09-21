import type { Metadata } from "next";

import { BottomDock } from "@/components/bottom-dock";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Mahmoud Wageeh · Software Engineer", template: "%s · Mahmoud Wageeh" },
  description: "Software Engineer building high-performance React Native and React products across mobile and web.",
  keywords: ["Mahmoud Wageeh", "React Native Developer", "React Developer", "Software Engineer", "Cairo", "TypeScript"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <BottomDock />
        </ThemeProvider>
      </body>
    </html>
  );
}
