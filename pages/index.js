import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import PrizesSection from '@/components/PrizesSection';
import WinnersSection from '@/components/WinnersSection';
import LiveHype from '@/components/LiveHype';
import Countdown from '@/components/Countdown';
import StatsBar from '@/components/StatsBar';
import Features from '@/components/Features';
import { playRegister } from '@/utils/sound';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();

  const goToRegister = () => {
    playRegister();
    // Small delay so the chime is audible before the route transition.
    setTimeout(() => {
      router.push('/register');
    }, 220);
  };

  return (
    <>
      <Head>
        <title>MASRVI - {t('landing.title')}</title>
        <meta name="description" content={t('landing.subtitle')} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <main
        onClick={goToRegister}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') goToRegister();
        }}
        aria-label={t('landing.cta')}
        className="cursor-pointer bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      >
        {/* Hero Section - Premium Emerald Theme */}
        <section className="relative overflow-hidden masrvi-hero dark:masrvi-hero-dark">
          {/* Floating decorative orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-40 md:w-72 h-40 md:h-72 bg-accent-400/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 animate-float" />
            <div className="absolute bottom-10 right-0 w-52 md:w-96 h-52 md:h-96 bg-primary-300/20 rounded-full blur-3xl translate-x-1/4 animate-float-slow" />
            <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 animate-float" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 pt-8 pb-14 md:py-24">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
              {/* Left Content */}
              <div className="flex-1 text-center md:text-right w-full">
                {/* Logo */}
                <div className="inline-block mb-5 md:mb-7 animate-fade-in-up">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7923244c-5be4-4f29-bbe9-96c23ebaebc9.jpeg"
                    alt="Masrvi Logo"
                    width={420}
                    height={168}
                    className="h-28 md:h-40 w-auto object-contain drop-shadow-xl"
                    priority
                  />
                </div>

                {/* Urgency Badge */}
                <div className="flex justify-center md:justify-start mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/90 text-white text-xs md:text-sm font-bold shadow-lg animate-soft-pulse">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{t('urgency.badge')}</span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-5 leading-tight text-balance animate-fade-in-up stagger-1">
                  {t('landing.title')}
                </h1>

                <p className="text-base md:text-xl text-white/90 mb-6 max-w-xl mx-auto md:mx-0 md:mr-0 leading-relaxed animate-fade-in-up stagger-2">
                  {t('landing.hero_description')}
                </p>

                {/* Trust chips */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mb-7 animate-fade-in-up stagger-3">
                  {[t('urgency.free'), t('urgency.instant'), t('urgency.trusted')].map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs md:text-sm font-medium"
                    >
                      <svg className="w-3.5 h-3.5 text-accent-300" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {chip}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goToRegister(); }}
                  className="inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-white text-primary-700 text-lg md:text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:bg-primary-50 btn-primary animate-fade-in-up stagger-4"
                >
                  {t('landing.cta')}
                  <span className="rtl:rotate-180">&#8592;</span>
                </button>

                {/* Countdown - Urgency */}
                <div className="mt-8 md:mt-10">
                  <Countdown />
                </div>

                {/* Live Hype - Social proof */}
                <div className="mt-8 md:mt-10 max-w-md mx-auto md:mx-0 animate-fade-in-up stagger-5">
                  <LiveHype />
                </div>
              </div>

              {/* Right Image - Featured Prize */}
              <div className="flex-1 relative w-full animate-scale-in">
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl lantern-glow">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/daa02e9a-fc45-4951-8f42-ef57c9dd946f.jpeg"
                    alt={t('prizes.cash_10m')}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-accent-500 text-white text-xs md:text-sm font-bold shadow-lg">
                    {t('prizes.grand')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg className="w-full h-12 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path className="fill-gray-50 dark:fill-gray-900" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
            </svg>
          </div>
        </section>

        {/* Social Proof Stats */}
        <StatsBar />

        <PrizesSection />
        <Features />
        <WinnersSection />

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-4 masrvi-hero dark:masrvi-hero-dark relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-400/10 rounded-full blur-3xl animate-float-slow" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 text-balance">
              {t('landing.cta_title')}
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
              {t('landing.cta_description')}
            </p>

            {/* Countdown reminder */}
            <div className="mb-8 md:mb-10">
              <Countdown />
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goToRegister(); }}
              className="inline-flex items-center gap-2 px-10 md:px-12 py-4 md:py-5 bg-white text-primary-700 text-lg md:text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 btn-primary"
            >
              {t('landing.cta')}
              <span className="rtl:rotate-180">&#8592;</span>
            </button>
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
