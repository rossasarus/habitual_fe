import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./page.module.css";
import NextProvider from "./NextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habitual",
  description: "Track your habits, make them stick.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextProvider>
        <main className={styles.main}>
          <body className={inter.className}>{children}</body>
        </main>
      </NextProvider>
    </html>
  );
}
