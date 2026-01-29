import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Dioxoid - Digital Alchemy',
  description: 'We architect digital cathedrals. Forging artifacts that defy standard grid systems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Noise overlay */}
        <div className="noise-wrapper">
          <div className="noise-overlay"></div>
        </div>
        {/* Scanline effect */}
        <div className="scanline"></div>
        {children}
      </body>
    </html>
  );
}
