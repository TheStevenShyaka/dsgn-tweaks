import type { ReactNode } from "react";
import "./globals.css";

export const metadata = { title: "dsgn-tweaks example" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('example-theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}`,
          }}
        />
        <header className="border-b border-hairline px-6 py-4 font-medium">Acme</header>
        <main>{children}</main>
        <footer className="border-t border-hairline px-6 py-8 text-sm opacity-70">© Acme</footer>
      </body>
    </html>
  );
}
