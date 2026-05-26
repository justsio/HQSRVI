import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import PrizesSection from '@/components/PrizesSection';
import WinnersSection from '@/components/WinnersSection';
import CountdownTimer from '@/components/CountdownTimer';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>MASRVI - {t('landing.title')}</title>
        <meta name="description" content={t('landing.subtitle')} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <main className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section with Green Theme */}
        <section className="relative overflow-hidden masrvi-gradient dark:masrvi-gradient-dark">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-primary-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-accent-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-24">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* Left Content */}
              <div className="flex-1 text-center md:text-right">
                {/* Logo - Bigger */}
                <div className="inline-block mb-6 md:mb-8 animate-fade-in-up">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7923244c-5be4-4f29-bbe9-96c23ebaebc9.jpeg"
                    alt="Masrvi Logo"
                    width={280}
                    height={112}
                    className="h-20 md:h-28 w-auto object-contain"
                    priority
                  />
                </div>
                
                <div className="inline-block mb-4 md:mb-6 px-4 md:px-5 py-2 md:py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm md:text-base font-medium animate-fade-in-up stagger-1">
                  {t('landing.subtitle')}
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6 leading-tight animate-fade-in-up stagger-2">
                  {t('landing.title')}
                </h1>
                
                <p className="text-base md:text-xl text-white/90 mb-6 md:mb-10 max-w-xl mx-auto md:mx-0 md:mr-0 animate-fade-in-up stagger-3">
                  {t('landing.hero_description')}
                </p>
                
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-white text-primary-700 text-lg md:text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 hover:bg-primary-50 btn-primary animate-fade-in-up stagger-4"
                >
                  {t('landing.cta')}
                  <span className="rtl:rotate-180">&#8592;</span>
                </Link>

                {/* Countdown Timer */}
                <div className="mt-10 md:mt-12 animate-fade-in-up stagger-5">
                  <CountdownTimer />
                </div>
              </div>

              {/* Right Image - Featured Prize */}
              <div className="flex-1 relative w-full animate-scale-in">
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl lantern-glow">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424383_121-55RdYoX9enwse4yarYS55d0jF5jwRu.jpg"
                    alt="Grand Prize"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-12 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path className="fill-gray-50 dark:fill-gray-900" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10 md:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: '⚡', titleKey: 'features.fast', descKey: 'features.fast_desc' },
                { icon: '🔒', titleKey: 'features.secure', descKey: 'features.secure_desc' },
                { icon: '🎁', titleKey: 'features.exclusive', descKey: 'features.exclusive_desc' },
                { icon: '📱', titleKey: 'features.app', descKey: 'features.app_desc' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-5 md:p-6 text-center card-hover"
                >
                  <span className="text-3xl md:text-4xl mb-3 block">{feature.icon}</span>
                  <h3 className="font-bold text-primary-700 dark:text-primary-400 text-sm md:text-base">{t(feature.titleKey)}</h3>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2">{t(feature.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PrizesSection />
        <WinnersSection />

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-4 masrvi-gradient dark:masrvi-gradient-dark relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              {t('landing.cta_title')}
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
              {t('landing.cta_description')}
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-10 md:px-12 py-4 md:py-5 bg-white text-primary-700 text-lg md:text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 btn-primary"
            >
              {t('landing.cta')}
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-8 md:py-10 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7923244c-5be4-4f29-bbe9-96c23ebaebc9.jpeg"
              alt="Masrvi Logo"
              width={140}
              height={56}
              className="h-14 md:h-16 w-auto mx-auto mb-4 md:mb-5 object-contain"
            />
            <p className="text-gray-400 text-sm md:text-base">
              &copy; {new Date().getFullYear()} MASRVI By BMCI. {t('footer.rights')}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
