import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import StoreProvider from './storeProvider';
import ApolloProvider from './apolloProvider';
import DarkModeProvider from './darkModeProvider';
import ConditionalHeader from './_components/ConditionalHeader';
import ErrorBoundaryWrapper from './_components/ErrorBoundaryWrapper';
import { HeaderNav } from '@/components/shared';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Ecspedia - Book Flights & Hotels',
    template: '%s | Ecspedia',
  },
  description:
    'Book flights and hotels with Ecspedia. Compare prices and find the best deals for your next trip.',
  keywords: ['flights', 'hotels', 'booking', 'travel'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedMode = localStorage.getItem('darkMode');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = savedMode === 'dark' || (savedMode === null && prefersDark);
                  
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ApolloProvider>
          <StoreProvider>
            <DarkModeProvider>
              <ErrorBoundaryWrapper>
                <ConditionalHeader>
                  <HeaderNav />
                </ConditionalHeader>
                {children}
              </ErrorBoundaryWrapper>
            </DarkModeProvider>
          </StoreProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
