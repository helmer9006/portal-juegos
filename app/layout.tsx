import "./globals.css";
import { AuthProvider } from "./context/auth-provider";
import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Portal Juegos",
  description: "Portal de juegos con autenticación B2C",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <head>
        <meta name="application-name" content="Portal Juegos" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Portal Juegos" />
        <meta
          name="description"
          content="Este es el Portal de Juegos de Colmena Seguros"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        {/* Íconos para diferentes dispositivos */}
        <link rel="apple-touch-icon" href="/colmena.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/colmena.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/colmena.svg" />
        <link rel="apple-touch-icon" sizes="167x167" href="/colmena.svg" />

        {/* Favicon e íconos para diferentes tamaños */}
        <link rel="icon" type="image/svg+xml" href="/colmena.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/colmena.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/colmena.svg" />
        <link rel="mask-icon" href="/colmena.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/colmena.svg" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Meta tags para Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:url"
          content="https://portaljuegos.colmenaseguros.com"
        />
        <meta name="twitter:title" content="Portal de Juegos" />
        <meta
          name="twitter:description"
          content="Este es el Portal de Juegos de Colmena Seguros"
        />
        <meta
          name="twitter:image"
          content="https://portaljuegos.colmenaseguros.com/colmena.svg"
        />

        {/* Meta tags para Open Graph (Facebook y otros) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Portal de Juegos" />
        <meta
          property="og:description"
          content="Este es el Portal de Juegos de Colmena Seguros"
        />
        <meta property="og:site_name" content="Portal de Juegos" />
        <meta
          property="og:url"
          content="https://portaljuegos.colmenaseguros.com"
        />
        <meta
          property="og:image"
          content="https://portaljuegos.colmenaseguros.com/colmena.svg"
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
