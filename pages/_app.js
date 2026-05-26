import { useEffect, useState, useCallback } from 'react';
import '@/lib/i18n';
import '@/styles/globals.css';
import { ContestProvider } from '@/context/ContestContext';
import Header from '@/components/Header';
import SplashScreen from '@/components/SplashScreen';

export default function App({ Component, pageProps }) {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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

    // Dark mode setup
    const savedDarkMode = localStorage.getItem('dark_mode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }

    import('@/lib/i18n').then(({ default: i18n }) => {
      i18n.changeLanguage(savedLang);
    });
  }, []);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    sessionStorage.setItem('splash_shown', 'true');
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('dark_mode', String(newValue));
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newValue;
    });
  }, []);

  return (
    <ContestProvider>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className={`min-h-screen transition-colors duration-300 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Component {...pageProps} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </ContestProvider>
  );
}
