import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Returns the next draw date: upcoming Friday at 21:00 local time.
function getNextDraw() {
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay(); // 0 = Sunday ... 5 = Friday
  let diff = (5 - day + 7) % 7;
  target.setDate(now.getDate() + diff);
  target.setHours(21, 0, 0, 0);
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }
  return target;
}

function getRemaining(target) {
  const total = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    const target = getNextDraw();
    setTime(getRemaining(target));
    const interval = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: time.days, label: t('countdown.days') },
    { value: time.hours, label: t('countdown.hours') },
    { value: time.minutes, label: t('countdown.minutes') },
    { value: time.seconds, label: t('countdown.seconds') },
  ];

  return (
    <div className="w-full max-w-md mx-auto md:mx-0 animate-fade-in-up">
      <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-400" />
        </span>
        <p className="text-sm md:text-base font-semibold text-white/90">{t('countdown.title')}</p>
      </div>
      <div className="grid grid-cols-4 gap-2 md:gap-3" dir="ltr">
        {units.map((unit, i) => (
          <div
            key={unit.label}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3 md:py-4 flex flex-col items-center animate-pop-in"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <span className="text-2xl md:text-4xl font-extrabold text-white tabular-nums leading-none">
              {mounted ? String(unit.value).padStart(2, '0') : '--'}
            </span>
            <span className="mt-1 text-[10px] md:text-xs font-medium text-white/70 uppercase tracking-wide">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
