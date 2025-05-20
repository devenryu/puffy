import type React from "react"
import "./globals.css"
import { Inter, Pacifico, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

// Load Pacifico font for cursive headings
const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-pacifico",
})

// Load Poppins font for body text
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "Puffistery - Sweet Dessert Dreams",
  description: "A cozy corner of the internet where dessert dreams come to life",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${pacifico.variable} ${poppins.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
