import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import WinnerAvatar from '@/components/WinnerAvatar';

const BATCH_SIZE = 8;

export default function WinnersSection() {
  const { t } = useTranslation();
  const [winners, setWinners] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    fetch('/api/winners')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setWinners(data.winners);
      })
      .catch(console.error);
  }, []);

  const featuredWinners = useMemo(
    () => winners.filter((w) => w.featured),
    [winners]
  );
  const regularWinners = useMemo(
    () => winners.filter((w) => !w.featured),
    [winners]
  );

  const totalBatches = useMemo(
    () => Math.max(1, Math.ceil(regularWinners.length / BATCH_SIZE)),
    [regularWinners.length]
  );

  useEffect(() => {
    if (regularWinners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBatch((prev) => {
        const nextBatch = prev + 1;
        return nextBatch >= totalBatches ? 0 : nextBatch;
      });
      setFadeKey((k) => k + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalBatches, regularWinners.length]);

  const visibleWinners = regularWinners.slice(
    currentBatch * BATCH_SIZE,
    currentBatch * BATCH_SIZE + BATCH_SIZE
  );

  if (winners.length === 0) return null;

  const prizeLabel = (winner) =>
    winner.prizeKey ? t(`prizes.${winner.prizeKey}`) : winner.prize;

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-primary-50 via-white to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            {t('landing.winners_title')}
          </h2>
        </div>

        {/* Featured prize winners - highlighted */}
        {featuredWinners.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-8">
            {featuredWinners.map((winner, index) => (
              <div
                key={`featured-${winner.name}-${index}`}
                className="group relative rounded-2xl p-5 overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-accent-400/40 rounded-full blur-2xl" />

                {/* Prize badge */}
                <div className="relative flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-bold shadow">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {t('prizes.grand')}
                  </span>
                </div>

                <div className="relative flex items-center gap-3 md:gap-4">
                  <WinnerAvatar name={winner.name} size="md" float />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white text-sm md:text-base truncate">{winner.name}</p>
                    <p className="text-xs md:text-sm text-white/70 ltr-input">{winner.phone_masked}</p>
                    <p className="text-white font-extrabold text-sm md:text-base mt-1.5 text-balance">
                      {prizeLabel(winner)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cash winners - rotating */}
        <div key={fadeKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {visibleWinners.map((winner, index) => (
            <div
              key={`${winner.name}-${winner.phone_masked}-${index}`}
              className="group relative glass-card rounded-2xl p-4 md:p-5 overflow-hidden opacity-0 animate-fade-in-up transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Decorative corner glow */}
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-accent-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-center gap-3 md:gap-4">
                <WinnerAvatar name={winner.name} size="md" float />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-gray-900 text-sm md:text-base truncate">{winner.name}</p>
                  <p className="text-xs md:text-sm text-gray-500 ltr-input">{winner.phone_masked}</p>
                  <span className="inline-block mt-1.5 px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 font-bold text-xs md:text-sm truncate max-w-full">
                    {prizeLabel(winner)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalBatches > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {Array.from({ length: totalBatches }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setCurrentBatch(i);
                  setFadeKey((k) => k + 1);
                }}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-colors ${
                  i === currentBatch ? 'bg-primary-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to batch ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
