import type { Metadata } from "next";
import "./globals.css";
import Sidebar from './components/Sidebar';

export const metadata: Metadata = {
  title: "Home",
  description: "Next.js App",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-br">
      <body className='flex h-screen p-4 gap-4 bg-gray-100' >
        <Sidebar />
        <main className='flex-1'>
          {children}
        </main>
      </body>
    </html>
  );
}
