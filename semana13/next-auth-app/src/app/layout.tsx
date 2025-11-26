import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import Provider from "./components/session-provider";
import LogoutButton from "./components/logout-button";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Next Auth App",
  description: "My Next Auth App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <nav className="w-full bg-black shadow-sm">
            <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
              <Link href="/" className="text-white text-xl font-semibold">
                MyApp
              </Link>

              <ul className="flex items-center justify-center gap-6 text-sm">
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-gray-600"
                  >
                    Dashboard
                  </Link>
                </li>

                {session?.user && (
                  <li>
                    <Link
                      href="/profile"
                      className="hover:text-gray-600"
                    >
                      Profile
                    </Link>
                  </li>
                )}

                {session?.user && <LogoutButton />}
              </ul>

              {session?.user?.image && (
                <Image
                  src={session.user.image}
                  width={100}
                  height={100}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
              )}
            </div>
          </nav>

          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
