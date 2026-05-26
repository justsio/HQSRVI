import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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

  const totalBatches = useMemo(
    () => Math.max(1, Math.ceil(winners.length / BATCH_SIZE)),
    [winners.length]
  );

  useEffect(() => {
    if (winners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBatch((prev) => {
        const nextBatch = prev + 1;
        return nextBatch >= totalBatches ? 0 : nextBatch;
      });
      setFadeKey((k) => k + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalBatches, winners.length]);

  const visibleWinners = winners.slice(
    currentBatch * BATCH_SIZE,
    currentBatch * BATCH_SIZE + BATCH_SIZE
  );

  if (winners.length === 0) return null;

  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            {t('landing.winners_title')}
          </h2>
        </div>

        <div key={fadeKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 fade-transition">
          {visibleWinners.map((winner, index) => (
            <div
              key={`${winner.name}-${winner.phone_masked}-${index}`}
              className="glass-card rounded-xl md:rounded-2xl p-4 md:p-5 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-gray-900 text-sm md:text-base truncate">{winner.name}</p>
                  <p className="text-xs md:text-sm text-gray-500 ltr-input">{winner.phone_masked}</p>
                  <p className="text-primary-600 font-bold text-sm md:text-base mt-1 truncate">{winner.prize}</p>
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
