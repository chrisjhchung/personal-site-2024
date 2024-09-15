import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './app.scss';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Console from '@/components/Console';

// Custom hook for theme management
function useCustomTheme() {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.add(`theme-${savedTheme}`);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      document.documentElement.className = '';
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }, [theme, mounted]);

  return { theme, mounted, setTheme };
}

function MyApp({ Component, pageProps }: AppProps) {
  const { theme, mounted, setTheme } = useCustomTheme();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className={`theme-${theme}`}>
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
        <Console setTheme={setTheme} />
      </div>
    </>
  );
}

export default MyApp;
