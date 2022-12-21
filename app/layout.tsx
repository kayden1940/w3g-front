// import '#/styles/globals.css'
import '#/styles/globals.css';
import Link from "next/link"
// import { AddressBar } from '#/ui/AddressBar';
// import { GlobalNav } from '#/ui/GlobalNav';
// import { VercelLogo } from '#/ui/VercelLogo';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <main>
          <nav>
            <Link href="/">
              Home
            </Link>
            <Link href="/site/submit">
              Submit site
            </Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}
