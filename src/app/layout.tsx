import './globals.css'
import Header from '../components/header'
import { Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from 'next'
import { Oswald } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })
const oswald = Oswald ({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfólio Jean Carlos Macêdo',
  description: 'Fotografia e vídeo profissional',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  
}) {
  return (
    <html lang="pt">
      <body className={oswald.className}>
        <Header />
        <main>{children}</main>
        
      </body>
    </html>
  )
}

