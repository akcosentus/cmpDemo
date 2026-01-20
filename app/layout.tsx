import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SyMed Manager Suite - Demo',
  description: "SyMed Corporation's ClaimsManager / TripManager Suite Demo",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Reddit+Sans:ital,wght@0,300;0,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
