import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import WinnerAvatar from '@/components/WinnerAvatar';
import { playNotify } from '@/utils/sound';

const NAMES = [
  'Cheikhna Sarr',
  'Fatimetou Mint Ahmed',
  'Mohamed Lemine',
  'Aicha Ba',
  'Sidi Ould Brahim',
  'Mariem Mint Sidi',
  'Abdellahi Ould Cheikh',
  'Khadijetou Diallo',
  'Yacoub Ould Cheikh',
  'Selma Mint Mohamed',
  'Hamady Ba',
  'Zeinabou Mint Ely',
];

const AMOUNTS = ['2,500', '5,000', '7,500', '10,000', '15,000', '25,000'];

function randomWinner() {
  return {
    id: Date.now() + Math.random(),
    name: NAMES[Math.floor(Math.random() * NAMES.length)],
    amount: AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)],
  };
}

export default function WinnerNotifications() {
  const { t } = useTranslation();
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const soundRef = useRef(false);
  const hideTimer = useRef(null);
  const removeTimer = useRef(null);

  useEffect(() => {
    soundRef.current = soundOn;
  }, [soundOn]);

  const pushToast = useCallback(() => {
    const winner = randomWinner();
    setToast(winner);
    setVisible(true);
    if (soundRef.current) {
      playNotify();
    }
    clearTimeout(hideTimer.current);
    clearTimeout(removeTimer.current);
    // Slide out after a few seconds, then unmount.
    hideTimer.current = setTimeout(() => setVisible(false), 4500);
    removeTimer.current = setTimeout(() => setToast(null), 4900);
  }, []);

  useEffect(() => {
    // First notification shortly after load, then on a recurring interval.
    const first = setTimeout(pushToast, 3500);
    const interval = setInterval(pushToast, 9000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
      clearTimeout(hideTimer.current);
      clearTimeout(removeTimer.current);
    };
  }, [pushToast]);

  const toggleSound = (e) => {
    e.stopPropagation();
    const next = !soundOn;
    setSoundOn(next);
    // The tap itself unlocks the audio context on mobile browsers.
    if (next) playNotify();
  };

  return (
    <>
      {/* Sound enable toggle */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={t('notify.sound_on')}
        aria-pressed={soundOn}
        className={`fixed top-20 left-3 z-[60] inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border transition-colors ${
          soundOn
            ? 'bg-primary-600 text-white border-primary-500'
            : 'bg-white/90 text-primary-700 border-primary-200 animate-soft-pulse'
        }`}
      >
        {soundOn ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.657 6.343a8 8 0 010 11.314M11 5L6 9H2v6h4l5 4V5z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
          </svg>
        )}
      </button>

      {/* Toast */}
      <div
        aria-live="polite"
        className="fixed top-20 right-3 left-16 sm:left-auto z-[60] flex justify-end pointer-events-none"
      >
        {toast && (
          <div
            className={`pointer-events-auto w-full sm:w-80 max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-primary-100 dark:border-gray-700 p-3 flex items-center gap-3 transition-all duration-400 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
            dir="rtl"
          >
            <WinnerAvatar key={toast.id} name={toast.name} size="sm" badge float />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-primary-700 dark:text-primary-300 font-bold text-sm">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
                </span>
                {t('notify.title')}
              </p>
              <p className="font-extrabold text-gray-900 dark:text-white text-sm truncate">{toast.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {t('notify.won', { amount: `${toast.amount} MRU` })}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
