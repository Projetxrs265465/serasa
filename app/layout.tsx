import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Consulta',
  description: 'Feirão',
  generator: 'mrrbt',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <!-- Event snippet for 12 conversion page -->
<script>
  gtag('event', 'conversion', {
      'send_to': 'AW-17266114156/-dxECPHl0f8aEOz8j6lA',
      'value': 1.0,
      'currency': 'BRL',
      'transaction_id': ''
  });
</script>
        <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17266114156"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-17266114156');
</script>
      <body>{children}</body>
    </html>
  )
}
