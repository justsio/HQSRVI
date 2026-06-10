import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const WINNER_NAMES = [
  'Cheikhna Sarr',
  'Fatimetou Mint Ahmed',
  'Mohamed Lemine',
  'Aicha Ba',
  'Sidi Ould Brahim',
  'Mariem Mint Sidi',
  'Abdellahi Ould Cheikh',
  'Khadijetou Diallo',
];

const WINNER_AMOUNTS = ['5,000', '10,000', '2,500', '25,000', '7,500', '15,000'];

export default function LiveHype() {
  const { t } = useTranslation();

  const [winner, setWinner] = useState({ name: 'Cheikhna Sarr', amount: '5,000' });
  const [activeCount, setActiveCount] = useState(15850);

  // Rotate the "recent winner" every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const name = WINNER_NAMES[Math.floor(Math.random() * WINNER_NAMES.length)];
      const amount = WINNER_AMOUNTS[Math.floor(Math.random() * WINNER_AMOUNTS.length)];
      setWinner({ name, amount });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Live participant counter that fluctuates upward
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCount((prev) => prev + Math.floor(Math.random() * 7) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleShare = (platform, e) => {
    if (e) e.stopPropagation();
    const text = encodeURIComponent(t('landing.hero_description'));
    const url = encodeURIComponent(shareUrl);
    let link = '';
    if (platform === 'facebook') {
      link = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'telegram') {
      link = `https://t.me/share/url?url=${url}&text=${text}`;
    } else if (platform === 'whatsapp') {
      link = `https://wa.me/?text=${text}%20${url}`;
    }
    if (typeof window !== 'undefined') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full min-w-0 flex flex-col gap-4">
      {/* Recent Winner Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg px-5 h-[120px] max-w-full overflow-hidden flex items-center gap-4 animate-fade-in-up">
        <div className="shrink-0 w-12 h-12 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4zM7 4H4v2a3 3 0 003 3M17 4h3v2a3 3 0 01-3 3" />
          </svg>
        </div>
        <div className="flex-1 min-w-0 text-right flex flex-col justify-center gap-1" dir="rtl">
          <p className="text-xs md:text-sm text-white/70 font-medium truncate">{t('hype.new_winner')}</p>
          <p className="text-base md:text-lg font-extrabold text-white truncate" title={winner.name}>
            {winner.name}
          </p>
          <p className="text-sm md:text-base font-semibold text-white/90 truncate">
            {t('hype.won_amount', { amount: `${winner.amount} MRU` })}
          </p>
        </div>
      </div>
        <div className="flex-1 min-w-0 text-right">
          <p className="text-xs md:text-sm text-white/70 font-medium truncate">{t('hype.new_winner')}</p>
          <p className="text-base md:text-lg font-bold text-white truncate" dir="rtl" title={winner.name}>
            {winner.name}
          </p>
          <p className="text-sm md:text-base font-semibold text-white/90 truncate" dir="rtl">
            {t('hype.won_amount', { amount: `${winner.amount} MRU` })}
          </p>
        </div>
      </div>

      {/* Live Participant Counter */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg px-5 h-[96px] flex items-center justify-between gap-4 animate-fade-in-up stagger-1">
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-300" />
        </span>
        <div className="flex-1 text-center">
          <p className="text-2xl md:text-3xl font-extrabold text-white tabular-nums leading-tight" dir="ltr">
            {activeCount.toLocaleString('ar-EG')}
          </p>
          <p className="text-xs md:text-sm text-white/70 font-medium">{t('hype.active_now')}</p>
        </div>
        <div className="shrink-0 w-12 h-12 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a3 3 0 10-2.5-4.66" />
          </svg>
        </div>
      </div>

      {/* Share With Friends Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg px-5 py-5 animate-fade-in-up stagger-2">
        <h3 className="text-base md:text-lg font-bold text-white text-right mb-1">{t('hype.share_title')}</h3>
        <p className="text-xs md:text-sm text-white/70 text-right mb-4">{t('hype.share_desc')}</p>
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          <button
            type="button"
            onClick={(e) => handleShare('whatsapp', e)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white text-sm font-semibold transition-transform active:scale-95 min-h-[44px]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.755zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
            </svg>
            <span>{t('hype.whatsapp')}</span>
          </button>
          <button
            type="button"
            onClick={(e) => handleShare('telegram', e)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#229ED9] text-white text-sm font-semibold transition-transform active:scale-95 min-h-[44px]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            <span>{t('hype.telegram')}</span>
          </button>
          <button
            type="button"
            onClick={(e) => handleShare('facebook', e)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1877F2] text-white text-sm font-semibold transition-transform active:scale-95 min-h-[44px]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>{t('hype.facebook')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
