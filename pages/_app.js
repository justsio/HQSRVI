import { useEffect, useState, useCallback } from 'react';
import '@/lib/i18n';
import '@/styles/globals.css';
import { ContestProvider } from '@/context/ContestContext';
import Header from '@/components/Header';
import SplashScreen from '@/components/SplashScreen';

export default function App({ Component, pageProps }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if splash was already shown this session
    const splashShown = sessionStorage.getItem('splash_shown');
    if (splashShown) {
      setShowSplash(false);
    }

    // Language setup
    const savedLang = localStorage.getItem('contest_lang') || 'ar';
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';

    import('@/lib/i18n').then(({ default: i18n }) => {
      i18n.changeLanguage(savedLang);
    });
  }, []);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    sessionStorage.setItem('splash_shown', 'true');
  }, []);

  return (
    <ContestProvider>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className={`min-h-screen transition-colors duration-300 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <Component {...pageProps} />
      </div>
    </ContestProvider>
  );
}
