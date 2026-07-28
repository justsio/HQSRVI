import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ErrorModal from '@/components/ErrorModal';
import BottomSheet from '@/components/BottomSheet';
import LoadingTransition from '@/components/LoadingTransition';
import { useContest } from '@/context/ContestContext';

const OTP_LENGTH = 6;
// Set to true to use brand green instead of black for the active confirm button
const USE_BRAND_GREEN = false;

export default function OtpPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { phone, entryCode, clearRegistration } = useContest();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const inputRef = useRef(null);

  // For testing/preview, use query param or context
  const testPhone = router.query.phone || phone;

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
      const queryPhone = router.query.phone;
      if (!queryPhone && !phone) {
        router.replace('/register');
      }
    }
  }, [router.isReady, router.query.phone, phone, router]);

  // Auto-focus the hidden input on mount to trigger the native numeric keyboard
  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => inputRef.current?.focus(), 450);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  const handleInputChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH);
    setOtp(digits);
  };

  const focusInput = () => inputRef.current?.focus();

  const handleSubmit = async () => {
    if (otp.length !== OTP_LENGTH || loading) return;
    setLoading(true);

    try {
      const { data } = await axios.post('/api/verify-otp', {
        phone,
        entryCode,
        otpCode: otp,
      });

      if (data.success) {
        // Native-app style loading splash before next step
        setTransitioning(true);
        setTimeout(() => {
          router.push('/share');
        }, 700);
      } else {
        setLoading(false);
        setShowError(true);
      }
    } catch {
      setLoading(false);
      setShowError(true);
    }
  };

  const handleErrorClose = () => {
    setShowError(false);
    clearRegistration();
    router.push('/register');
  };

  // Show full phone number
  const displayPhone = testPhone || phone || '';
  const fullPhone = displayPhone ? `+222 ${displayPhone}` : '';
  const isComplete = otp.length === OTP_LENGTH;

  if (!isReady) return null;
  if (!testPhone && !phone) return null;

  const activeBtnColor = USE_BRAND_GREEN ? '#1db488' : '#111111';

  return (
    <>
      <Head>
        <title>{`MASRVI - ${t('otp.title')}`}</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100" />

      <AnimatePresence>
        {transitioning && <LoadingTransition key="loading" />}
      </AnimatePresence>

      {!transitioning && (
        <BottomSheet backHref="/register" backLabel={t('registration.back')}>
          <div className="flex flex-col items-center text-center pt-2">
            {/* Animated orange phone/arc icon */}
            <motion.div
              className="relative w-20 h-20 mb-5 flex items-center justify-center"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="absolute inset-0 rounded-full bg-orange-100" />
              <span className="absolute inset-1.5 rounded-full border-[3px] border-orange-300/60" />
              <svg
                className="relative w-9 h-9 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
              >
                <rect x="7" y="2" width="10" height="20" rx="2.5" ry="2.5" />
                <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth={2.5} strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Title + subtitles */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{t('otp.title')}</h1>
            <p className="text-gray-500 text-sm mb-1">{t('otp.subtitle')}</p>
            <p className="text-gray-900 font-bold text-base ltr-input mb-8" dir="ltr">
              {fullPhone}
            </p>

            {/* Floating OTP cells */}
            <div
              className="relative w-full max-w-xs mb-10"
              onClick={focusInput}
            >
              {/* Invisible input that drives the cells */}
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={OTP_LENGTH}
                value={otp}
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label={t('otp.placeholder')}
              />
              <div className="flex justify-center gap-2.5" dir="ltr">
                {[...Array(OTP_LENGTH)].map((_, i) => {
                  const filled = i < otp.length;
                  const isCurrent = i === otp.length;
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-center bg-white rounded-[14px] transition-all ${
                        isCurrent ? 'ring-2 ring-primary-400' : ''
                      }`}
                      style={{
                        width: '48px',
                        height: '56px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {filled && (
                          <motion.span
                            key={otp[i]}
                            initial={{ scale: 0.4, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.15 }}
                            className="text-2xl font-bold text-gray-900"
                          >
                            {otp[i]}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Confirm button (state machine) */}
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={!isComplete || loading}
              animate={{
                backgroundColor: isComplete ? activeBtnColor : '#BDBDBD',
              }}
              transition={{ duration: 0.2 }}
              className={`w-full max-w-xs py-4 rounded-full text-white font-bold text-base flex items-center justify-center gap-2 ${
                isComplete && !loading ? 'shadow-lg cursor-pointer' : 'cursor-not-allowed'
              }`}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                t('otp.verify')
              )}
            </motion.button>

            {/* Cancel text button */}
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="mt-4 text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
            >
              {t('otp.cancel')}
            </button>
          </div>
        </BottomSheet>
      )}

      <ErrorModal
        isOpen={showError}
        title={t('errors.title')}
        message={t('errors.invalid_otp')}
        buttonText={t('errors.retry')}
        onClose={handleErrorClose}
      />
    </>
  );
}
