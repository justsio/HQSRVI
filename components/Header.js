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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7923244c-5be4-4f29-bbe9-96c23ebaebc9.jpeg"
            alt="Masrvi Logo"
            width={140}
            height={56}
            className="h-12 md:h-14 w-auto object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Language Toggle - single icon button */}
          <button
            type="button"
            onClick={() => toggleLanguage(i18n.language === 'ar' ? 'fr' : 'ar')}
            aria-label={i18n.language === 'ar' ? 'Passer au francais' : 'التغيير إلى العربية'}
            className="flex items-center gap-2 glass-button rounded-full pl-3 pr-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition-all min-h-[44px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m5 8 6 6" />
              <path d="m4 14 6-6 2-3" />
              <path d="M2 5h12" />
              <path d="M7 2h1" />
              <path d="m22 22-5-10-5 10" />
              <path d="M14 18h6" />
            </svg>
            <span className="text-sm font-semibold">
              {i18n.language === 'ar' ? 'Francais' : 'العربية'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
