import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dashboard Analitik Nasional - MBG',
  description: 'Dashboard Analitik Nasional Program Makan Bergizi Gratis - Badan Gizi Nasional Indonesia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
