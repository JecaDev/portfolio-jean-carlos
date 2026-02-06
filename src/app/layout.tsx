import './globals.css'
import Header from '../components/header'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

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
      <body className="bg-slate-950 text-white font-sans">
        <Header />
        <div>{children}</div>
        <SpeedInsights />
      </body>
    </html>
  )
}
