import type { Metadata } from 'next';
import './globals.css';
import { BRIDE, GROOM, SITE_URL, dateKo, timeKo, venueFull } from './config';

const title = `${GROOM.name} ♥ ${BRIDE.name} 결혼합니다`;
const description = `${dateKo} ${timeKo} · ${venueFull}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title,
    description,
    siteName: '모바일 청첩장',
    locale: 'ko_KR',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Noto+Serif+KR:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
