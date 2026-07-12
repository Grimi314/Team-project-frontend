import type { Metadata } from 'next';
import { AppProviders } from '@/providers/appProviders';
import './globals.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { AuthProvider } from '../providers/AuthProvider';
import { Montserrat } from 'next/font/google';
import './globals.css';


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
    <html lang="uk" className={montserrat.variable}>
      <body>
        <AppProviders>
          <Header></Header>

          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
          <Footer></Footer>
        </AppProviders>
      </body>
    </html>
  );
}
