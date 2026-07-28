import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import WinnerAvatar from '@/components/WinnerAvatar';
import FeaturedWinnerCard from '@/components/FeaturedWinnerCard';

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

        {/* Featured prize winners - unified icon, rotating names */}
        {featuredWinners.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
            {featuredWinners.map((winner, index) => (
              <FeaturedWinnerCard
                key={`featured-${winner.prizeKey}`}
                prizeKey={winner.prizeKey}
                names={winner.names}
                index={index}
              />
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
