import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ritmo | Personal Planner",
  description: "Plan your week around the time you actually have available.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-ink">
        <div className="flex min-h-dvh flex-col md:flex-row">
          <AppSidebar />

          <div className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
