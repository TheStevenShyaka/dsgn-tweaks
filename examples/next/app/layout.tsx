import type { ReactNode } from "react";
import "./globals.css";

export const metadata = { title: "dsgn-tweaks · Next.js example" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('example-theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}`,
          }}
        />
        <header className="border-b border-hairline">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <span className="text-lg font-semibold tracking-tight">Northwind</span>
            <nav className="hidden gap-8 text-sm opacity-70 sm:flex">
              <a href="#features">Product</a>
              <a href="#pricing">Pricing</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-hairline">
          <div className="mx-auto max-w-5xl px-6 py-10 text-sm opacity-60">© Northwind. Made for trying dsgn-tweaks.</div>
        </footer>
      </body>
    </html>
  );
}
