import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { AppProviders } from '@/providers/appProviders';
import './globals.css';
import Header from './components/header/header';
import { AuthProvider } from '../providers/AuthProvider';


import './globals.css';



const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: {
    default: 'Природні Мандри',
    template: '%s | Природні Мандри',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  description: 'Еко-мандри, історії та мандрівники України.',
  openGraph: {
    title: 'Природні Мандри',
    description: 'Відкрий Україну заново — еко-мандри для натхнення.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body className={montserrat.variable}>
        <AppProviders>
          <Header></Header>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </AppProviders>
      </body>
    </html>
  );
}
