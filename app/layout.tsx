import type { Metadata } from "next";
import { DataProvider } from '@/context/DataContext';
import ThemeRegistry from '@/components/ThemeRegistry';
import "./globals.css";

export const metadata: Metadata = {
  title: "dentsu Mock App",
  description: "営業情報・あたり情報・進捗管理",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ThemeRegistry>
          <DataProvider>
            {children}
          </DataProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
