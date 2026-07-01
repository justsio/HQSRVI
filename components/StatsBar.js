import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

export default function StatsBar() {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const participants = useCountUp(52400, active);
  const prizesM = useCountUp(15, active);
  const winners = useCountUp(1280, active);
  const satisfaction = useCountUp(98, active);

  const stats = [
    { value: `+${participants.toLocaleString('en-US')}`, label: t('stats.participants') },
    { value: `${prizesM}M+ MRU`, label: t('stats.prizes') },
    { value: `+${winners.toLocaleString('en-US')}`, label: t('stats.winners') },
    { value: `${satisfaction}%`, label: t('stats.satisfaction') },
  ];

  return (
    <section ref={ref} className="py-10 md:py-14 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="sr-only">{t('stats.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl py-5 md:py-7 px-3 text-center"
            >
              <p className="text-2xl md:text-4xl font-extrabold gradient-text tabular-nums leading-none" dir="ltr">
                {stat.value}
              </p>
              <p className="mt-2 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
