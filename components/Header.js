import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { i18n } = useTranslation();

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (typeof window !== 'undefined') {
      localStorage.setItem('contest_lang', lang);
    }
  };

  return (
    <header className="sticky top-0 z-40 glass-header shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424381_120-1uDefD1vhhxaUyEWoZbKOogvt8VlOX.jpg"
            alt="Masrvi Logo"
            width={120}
            height={50}
            className="h-10 md:h-12 w-auto object-contain mix-blend-multiply"
            priority
          />
        </div>

        <div className="flex items-center gap-1 glass-button rounded-full p-1">
          <button
            type="button"
            onClick={() => toggleLanguage('ar')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              i18n.language === 'ar'
                ? 'bg-primary-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            العربية
          </button>
          <button
            type="button"
            onClick={() => toggleLanguage('fr')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              i18n.language === 'fr'
                ? 'bg-primary-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Francais
          </button>
        </div>
      </div>
    </header>
  );
}
