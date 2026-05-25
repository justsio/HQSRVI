import { useTranslation } from 'react-i18next';

export default function Header() {
  const { i18n } = useTranslation();
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'الشركة';

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (typeof window !== 'undefined') {
      localStorage.setItem('contest_lang', lang);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {companyName.charAt(0)}
          </div>
          <span className="font-semibold text-gray-800 hidden sm:block">{companyName}</span>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
          <button
            type="button"
            onClick={() => toggleLanguage('ar')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              i18n.language === 'ar'
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🇦🇪 العربية
          </button>
          <button
            type="button"
            onClick={() => toggleLanguage('fr')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              i18n.language === 'fr'
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🇫🇷 Français
          </button>
        </div>
      </div>
    </header>
  );
}
