import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '우리의 결혼식에 초대합니다',
  description: '우리의 결혼식에 초대합니다. RSVP와 함께 축하해주세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+CJK+KR:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
