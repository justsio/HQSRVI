import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import BottomSheet from '@/components/BottomSheet';
import { useContest } from '@/context/ContestContext';
import { playSuccess, playClick, playShare, playCelebrate } from '@/utils/sound';

const PRIZE_PREVIEW = [
  { key: 'house', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0ddad2a6-2c60-41a2-a657-1da45818408a.jpeg', tier: 'grand' },
  { key: 'cash_5m', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1426895a-e3d6-48bd-a932-056dbc6ec4a8.jpeg', tier: 'secondary' },
  { key: 'hilux_one', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a4def850-fc60-47c2-81b2-10a2f9b01bf5.jpeg', tier: 'secondary' },
  { key: 'corolla_one', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cdda7ca0-f4b5-4c5c-bb25-03478401849b.jpeg', tier: 'secondary' },
  { key: 'iphone_one', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d4b028ca-b75a-411c-ac11-ed2073594ec0.jpeg', tier: 'secondary' },
];

// Next draw: upcoming Friday 21:00 local.
function getNextDraw() {
  const now = new Date();
  const target = new Date(now);
  const diff = (5 - now.getDay() + 7) % 7;
  target.setDate(now.getDate() + diff);
  target.setHours(21, 0, 0, 0);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 7);
  return target;
}

function getRemaining(target) {
  const total = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(total / 86400000),
    hours: Math.floor((total / 3600000) % 24),
    minutes: Math.floor((total / 60000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export default function SharePage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { phone } = useContest();
  const [siteUrl, setSiteUrl] = useState('');
  const [shareCount, setShareCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const REQUIRED_SHARES = 5;

  const testPhone = router.query.phone || phone;

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
      const queryPhone = router.query.phone;
      if (!queryPhone && !phone) {
        router.replace('/register');
        return;
      }
      setSiteUrl(window.location.origin);
      playSuccess();

      const currentPhone = queryPhone || phone;
      const savedCount = localStorage.getItem(`shareCount_${currentPhone}`);
      if (savedCount) setShareCount(parseInt(savedCount, 10));
    }
  }, [router.isReady, router.query.phone, phone, router]);

  useEffect(() => {
    const target = getNextDraw();
    setTime(getRemaining(target));
    const interval = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(interval);
  }, []);

  const shareText =
    i18n.language === 'fr'
      ? `Rejoignez le concours MASRVI et gagnez des prix precieux!\n${siteUrl}`
      : `انضم لمسابقة مصرفي واربح جوائز قيمة!\n${siteUrl}`;

  const trackShare = async (platform) => {
    const currentPhone = testPhone || phone;
    const newCount = Math.min(shareCount + 1, REQUIRED_SHARES);
    if (newCount >= REQUIRED_SHARES && shareCount < REQUIRED_SHARES) {
      playCelebrate();
    } else if (newCount > shareCount) {
      playShare();
    } else {
      playClick();
    }
    setShareCount(newCount);
    localStorage.setItem(`shareCount_${currentPhone}`, newCount.toString());
    try {
      await axios.post('/api/track-share', { phone: currentPhone, platform });
    } catch (error) {
      console.error('Track share error:', error);
    }
  };

  const handleWhatsApp = () => {
    trackShare('WhatsApp');
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
  };
  const handleMessenger = () => {
    trackShare('Messenger');
    window.open(`fb-messenger://share?link=${encodeURIComponent(siteUrl)}`, '_blank', 'noopener,noreferrer');
  };
  const handleSnapchat = () => {
    trackShare('Snapchat');
    window.open(`https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(siteUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async () => {
    playClick();
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackShare('CopyLink');
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  if (!isReady) return null;
  if (!testPhone && !phone) return null;

  const isEligible = shareCount >= REQUIRED_SHARES;
  const remainingShares = REQUIRED_SHARES - shareCount;

  const timeUnits = [
    { value: time.days, label: t('countdown.days') },
    { value: time.hours, label: t('countdown.hours') },
    { value: time.minutes, label: t('countdown.minutes') },
    { value: time.seconds, label: t('countdown.seconds') },
  ];

  const events = [
    { icon: 'live', title: t('share.event_live_title'), desc: t('share.event_live_desc'), tag: t('share.event_live_tag'), tagColor: 'bg-red-500' },
    { icon: 'gala', title: t('share.event_gala_title'), desc: t('share.event_gala_desc'), tag: t('share.event_gala_tag'), tagColor: 'bg-primary-600' },
    { icon: 'double', title: t('share.event_double_title'), desc: t('share.event_double_desc'), tag: t('share.event_double_tag'), tagColor: 'bg-accent-500' },
  ];

  const eventIcon = (type) => {
    if (type === 'live') {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55-2.28A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.9L15 14M5 8h8a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2z" />
        </svg>
      );
    }
    if (type === 'gala') {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  };

  return (
    <>
      <Head>
        <title>{`MASRVI - ${t('share.success')}`}</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100" />

      <BottomSheet backHref="/" backLabel={t('registration.back')}>
        <div className="flex flex-col items-center text-center pt-2 pb-6">
          {/* Logo */}
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7923244c-5be4-4f29-bbe9-96c23ebaebc9.jpeg"
            alt="Masrvi Logo"
            width={120}
            height={50}
            className="h-12 w-auto mb-5 object-contain"
          />

          {/* Success check */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 mb-4 rounded-full bg-primary-100 flex items-center justify-center"
          >
            <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-balance">{t('share.success')}</h1>
          <p className="text-gray-600 mb-6 text-pretty">{t('share.message')}</p>

          {/* Countdown to next draw */}
          <div className="w-full rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-4 mb-6 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-400" />
              </span>
              <p className="text-sm font-semibold text-white/90">{t('share.next_draw')}</p>
            </div>
            <div className="grid grid-cols-4 gap-2" dir="ltr">
              {timeUnits.map((unit) => (
                <div key={unit.label} className="bg-white/10 border border-white/20 rounded-xl py-2.5 flex flex-col items-center">
                  <span className="text-xl md:text-2xl font-extrabold text-white tabular-nums leading-none">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="mt-1 text-[10px] font-medium text-white/70">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div className="w-full grid grid-cols-3 gap-2 mb-6">
            {[
              { value: '+250K', label: t('share.stat_participants') },
              { value: '15Mrd', label: t('share.stat_prizes') },
              { value: '+1200', label: t('share.stat_winners') },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl py-3 px-1">
                <p className="text-base md:text-lg font-extrabold text-primary-600 leading-tight">{s.value}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Prizes reminder carousel */}
          <div className="w-full mb-6 text-right rtl:text-right">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-bold text-gray-900">{t('share.prizes_reminder')}</h2>
                <p className="text-xs text-gray-500">{t('share.prizes_reminder_desc')}</p>
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x" style={{ scrollbarWidth: 'none' }}>
              {PRIZE_PREVIEW.map((prize) => (
                <div key={prize.key} className="shrink-0 w-40 snap-start glass-card rounded-2xl overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image src={prize.image} alt={t(`prizes.${prize.key}`)} fill className="object-cover" sizes="160px" />
                    <span className={`absolute top-2 ${i18n.dir() === 'rtl' ? 'right-2' : 'left-2'} px-2 py-0.5 rounded-full text-white text-[10px] font-bold shadow ${prize.tier === 'grand' ? 'bg-primary-600' : 'bg-accent-500'}`}>
                      {prize.tier === 'grand' ? t('prizes.grand') : t('prizes.secondary')}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800 p-2 text-center leading-snug">{t(`prizes.${prize.key}`)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Events section */}
          <div className="w-full mb-6">
            <div className="text-right rtl:text-right mb-3">
              <h2 className="text-base font-bold text-gray-900">{t('share.events_title')}</h2>
              <p className="text-xs text-gray-500">{t('share.events_desc')}</p>
            </div>
            <div className="flex flex-col gap-3">
              {events.map((ev) => (
                <div key={ev.title} className="glass-card rounded-2xl p-3 flex items-center gap-3 text-right">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                    {eventIcon(ev.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 justify-start">
                      <p className="font-bold text-gray-900 text-sm truncate">{ev.title}</p>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-white text-[10px] font-bold ${ev.tagColor}`}>{ev.tag}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invite banner */}
          <div className="w-full mb-6 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 p-4 text-right shadow-lg">
            <h2 className="text-base font-bold text-white mb-1">{t('share.invite_title')}</h2>
            <p className="text-xs text-white/90 mb-3 leading-snug">{t('share.invite_desc')}</p>
            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-3 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copied ? t('share.copied') : t('share.copy_link')}
            </button>
          </div>

          {/* Share Progress */}
          <div className="mb-5 w-full">
            <p className="text-sm font-semibold text-gray-700 mb-3">{t('share.share_progress')}</p>

            {/* Animated progress bar */}
            <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden mb-3" dir="ltr">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                initial={{ width: 0 }}
                animate={{ width: `${(shareCount / REQUIRED_SHARES) * 100}%` }}
                transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              />
            </div>

            <div className="flex justify-center gap-3 mb-3">
              {[...Array(REQUIRED_SHARES)].map((_, index) => (
                <motion.div
                  key={index}
                  animate={index === shareCount - 1 ? { scale: [1, 1.25, 1] } : {}}
                  transition={{ duration: 0.45 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index < shareCount ? 'bg-primary-500 text-white' : 'bg-white text-gray-400'
                  }`}
                  style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}
                >
                  {index < shareCount ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Motivational message / celebration */}
            {isEligible ? (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-4 shadow-lg"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3" />
                  </svg>
                  <p className="text-white font-bold text-sm">{t('share.celebrate_title')}</p>
                </div>
                <p className="text-white/80 text-xs">{t('share.celebrate_desc')}</p>
              </motion.div>
            ) : (
              <p className="text-primary-700 font-semibold text-sm text-balance">
                {shareCount === 0
                  ? t('share.motivate_start')
                  : remainingShares === 1
                    ? t('share.motivate_last')
                    : t('share.motivate_progress').replace('{count}', remainingShares)}
              </p>
            )}
          </div>

          {/* Chance boost reminder */}
          <p className="w-full text-xs text-gray-500 mb-3 flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-accent-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
            {t('share.chance_boost')}
          </p>

          {/* Share buttons */}
          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="relative w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-3 text-lg shadow-lg"
            >
              {!isEligible && (
                <span className={`absolute -top-2 ${i18n.dir() === 'rtl' ? 'left-3' : 'right-3'} px-2 py-0.5 rounded-full bg-accent-500 text-white text-[10px] font-bold shadow animate-bounce`}>
                  {t('share.share_now')}
                </span>
              )}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('share.whatsapp')}
            </button>
            <button
              type="button"
              onClick={handleMessenger}
              className="w-full py-4 bg-[#0084FF] hover:bg-[#0073e6] text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-3 text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z" />
              </svg>
              {t('share.messenger')}
            </button>
            <button
              type="button"
              onClick={handleSnapchat}
              className="w-full py-4 bg-[#FFFC00] hover:bg-[#e6e300] text-gray-900 font-semibold rounded-2xl transition-colors flex items-center justify-center gap-3 text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.464 0-.879.045-1.258.135-.195.029-.42.059-.57.059h-.045c-.329 0-.524-.15-.569-.42-.061-.18-.105-.359-.149-.553-.044-.195-.089-.465-.149-.57-1.873-.284-2.92-.702-3.161-1.271-.03-.075-.044-.149-.044-.224 0-.24.165-.465.419-.509 3.266-.54 4.731-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.45-.884-.674-1.332-.809-.12-.045-.241-.09-.345-.119-.823-.33-1.228-.72-1.213-1.168 0-.359.285-.689.734-.838.149-.059.329-.089.509-.089.135 0 .314.015.479.104.39.18.749.286 1.033.301.195 0 .326-.045.401-.091-.007-.165-.017-.33-.03-.51l-.003-.06c-.104-1.627-.225-3.654.299-4.847C7.859 1.07 11.216.793 12.206.793z" />
              </svg>
              {t('share.snapchat')}
            </button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
