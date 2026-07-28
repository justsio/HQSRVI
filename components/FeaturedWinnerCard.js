import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function FeaturedWinnerCard({ prizeKey, names = [], index = 0 }) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (names.length <= 1) return undefined;

    // Stagger each card's rotation so they don't all flip at once.
    const period = 4000;
    const offset = index * 700;
    let fadeTimer;

    const interval = setInterval(() => {
      setShow(false);
      fadeTimer = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % names.length);
        setShow(true);
      }, 350);
    }, period + offset);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
    };
  }, [names.length, index]);

  const winner = names[current] || {};

  return (
    <div
      className="group relative rounded-3xl p-6 overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* Decorative glows */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-400/40 rounded-full blur-2xl" />
      <div className="absolute -bottom-14 -left-10 w-32 h-32 bg-primary-300/20 rounded-full blur-2xl" />

      {/* Grand prize badge */}
      <div className="relative flex items-center justify-between mb-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-bold shadow">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {t('prizes.grand')}
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-300 animate-soft-pulse" aria-hidden="true" />
      </div>

      {/* Unified trophy icon - wide, compact pill */}
      <div className="relative flex justify-center mb-4">
        <div className="w-16 h-8 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm flex items-center justify-center shadow-lg animate-float">
          <svg className="w-5 h-5 text-accent-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3" />
          </svg>
        </div>
      </div>

      {/* Rotating winner name */}
      <div className="relative text-center min-h-[64px] flex flex-col justify-center">
        <p
          className={`font-extrabold text-white text-lg md:text-xl truncate transition-all duration-300 ${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
          title={winner.name}
        >
          {winner.name}
        </p>
        <p
          className={`text-sm text-white/70 ltr-input mt-0.5 transition-opacity duration-300 ${
            show ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {winner.phone_masked}
        </p>
      </div>

      {/* Prize label */}
      <div className="relative mt-4 text-center">
        <span className="inline-block px-4 py-2 rounded-full bg-white/15 border border-white/20 text-white font-bold text-sm md:text-base text-balance">
          {t(`prizes.${prizeKey}`)}
        </span>
      </div>
    </div>
  );
}
