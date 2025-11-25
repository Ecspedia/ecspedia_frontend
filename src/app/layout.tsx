import '@/app/globals.css';
import { HeaderNav } from '@/components/shared';
import { FullscreenPopupProvider } from '@/components/shared/ExpandableTextField/FullscreenPopupContext';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ConditionalHeader from './_components/ConditionalHeader';
import ErrorBoundaryWrapper from './_components/ErrorBoundaryWrapper';
import ApolloProvider from './apolloProvider';
import DarkModeProvider from './darkModeProvider';
import StoreProvider from './storeProvider';

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
                  console.log('prefersDark', prefersDark);
                  console.log('savedMode', savedMode);
                  const isDark = savedMode === 'true' || (savedMode === null && prefersDark);
                  console.log('isDark', isDark);
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
            <FullscreenPopupProvider>
              <DarkModeProvider>
                <ErrorBoundaryWrapper>
                  <ConditionalHeader>
                    <HeaderNav />
                  </ConditionalHeader>
                  {children}
                </ErrorBoundaryWrapper>
              </DarkModeProvider>
            </FullscreenPopupProvider>
          </StoreProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
