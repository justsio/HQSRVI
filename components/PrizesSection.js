import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const GRAND_PRIZE = {
  key: 'cash_10m',
  image: '/images/prize-cash-10m.jpg',
};

const SECONDARY_PRIZES = [
  {
    key: 'house',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0ddad2a6-2c60-41a2-a657-1da45818408a.jpeg',
  },
  {
    key: 'cash_5m',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1426895a-e3d6-48bd-a932-056dbc6ec4a8.jpeg',
  },
  {
    key: 'hilux',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a4def850-fc60-47c2-81b2-10a2f9b01bf5.jpeg',
  },
  {
    key: 'corolla',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cdda7ca0-f4b5-4c5c-bb25-03478401849b.jpeg',
  },
  {
    key: 'iphone',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d4b028ca-b75a-411c-ac11-ed2073594ec0.jpeg',
  },
];

export default function PrizesSection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 text-balance">
            {t('landing.prizes_title')}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base text-pretty">
            {t('landing.prizes_subtitle')}
          </p>
        </div>

        {/* Grand prize - hero card */}
        <div className="relative mb-8 md:mb-10">
          {/* Glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400 opacity-60 blur-lg" />
          <div className="relative group rounded-3xl overflow-hidden ring-2 ring-accent-400 shadow-2xl">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={GRAND_PRIZE.image}
                alt={t(`prizes.${GRAND_PRIZE.key}`)}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Grand badge */}
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-500 text-white text-sm font-bold shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {t('prizes.grand')}
              </div>

              {/* Prize name */}
              <div className="absolute bottom-0 inset-x-0 p-5 md:p-6">
                <p className="text-white font-extrabold text-2xl md:text-4xl drop-shadow-lg text-balance">
                  {t(`prizes.${GRAND_PRIZE.key}`)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary prizes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {SECONDARY_PRIZES.map((prize) => (
            <div
              key={prize.key}
              className="group glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={prize.image}
                  alt={t(`prizes.${prize.key}`)}
                  fill
                  sizes="(max-width: 640px) 100vw, 440px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-bold shadow-lg">
                  {t('prizes.secondary')}
                </div>
                <p className="absolute bottom-3 right-3 left-3 text-white font-bold text-sm md:text-base drop-shadow text-balance">
                  {t(`prizes.${prize.key}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
