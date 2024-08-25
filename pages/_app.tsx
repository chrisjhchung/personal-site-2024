import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './app.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
// Using ES6 import syntax

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <div className="content">
        <Header />
        <main id="main">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default MyApp;
