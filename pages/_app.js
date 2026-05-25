import { useEffect } from 'react';
import '@/lib/i18n';
import '@/styles/globals.css';
import { ContestProvider } from '@/context/ContestContext';
import Header from '@/components/Header';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const savedLang = localStorage.getItem('contest_lang') || 'ar';
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';

    import('@/lib/i18n').then(({ default: i18n }) => {
      i18n.changeLanguage(savedLang);
    });
  }, []);

  return (
    <ContestProvider>
      <div className="min-h-screen">
        <Header />
        <Component {...pageProps} />
      </div>
    </ContestProvider>
  );
}
