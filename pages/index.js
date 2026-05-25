import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import PrizesSection from '@/components/PrizesSection';
import WinnersSection from '@/components/WinnersSection';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>MASRVI - {t('landing.title')}</title>
        <meta name="description" content={t('landing.subtitle')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        {/* Hero Section with Green Theme */}
        <section className="relative overflow-hidden masrvi-gradient">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left Content */}
              <div className="flex-1 text-center md:text-right">
                <div className="inline-block mb-6">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424381_120-1uDefD1vhhxaUyEWoZbKOogvt8VlOX.jpg"
                    alt="Masrvi Logo"
                    width={200}
                    height={80}
                    className="h-20 w-auto object-contain bg-white rounded-2xl p-3"
                    priority
                  />
                </div>
                
                <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                  {t('landing.subtitle')}
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                  {t('landing.title')}
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl mx-auto md:mx-0 md:mr-0">
                  {t('landing.hero_description')}
                </p>
                
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 hover:bg-primary-50"
                >
                  {t('landing.cta')}
                  <span className="rtl:rotate-180">&#8592;</span>
                </Link>
              </div>

              {/* Right Image - Featured Prize */}
              <div className="flex-1 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl lantern-glow">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424376_121-d3XmxIzgbyaBRiIVSB9uHSYCXvsjrU.jpg"
                    alt="Grand Prize"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-16 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '⚡', titleKey: 'features.fast', descKey: 'features.fast_desc' },
                { icon: '🔒', titleKey: 'features.secure', descKey: 'features.secure_desc' },
                { icon: '🎁', titleKey: 'features.exclusive', descKey: 'features.exclusive_desc' },
                { icon: '📱', titleKey: 'features.app', descKey: 'features.app_desc' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 text-center border border-primary-100 hover:shadow-lg transition-shadow"
                >
                  <span className="text-3xl mb-3 block">{feature.icon}</span>
                  <h3 className="font-bold text-gray-900 mb-1">{t(feature.titleKey)}</h3>
                  <p className="text-sm text-gray-600">{t(feature.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PrizesSection />
        <WinnersSection />

        {/* CTA Section */}
        <section className="py-16 px-4 masrvi-gradient">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('landing.cta_title')}
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {t('landing.cta_description')}
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              {t('landing.cta')}
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424381_120-1uDefD1vhhxaUyEWoZbKOogvt8VlOX.jpg"
              alt="Masrvi Logo"
              width={120}
              height={50}
              className="h-12 w-auto mx-auto mb-4 object-contain"
            />
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} MASRVI By BMCI. {t('footer.rights')}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
