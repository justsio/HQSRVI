import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const PRIZES = [
  {
    key: 'cash_10m',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/daa02e9a-fc45-4951-8f42-ef57c9dd946f.jpeg',
    tier: 'grand',
  },
  {
    key: 'house',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0ddad2a6-2c60-41a2-a657-1da45818408a.jpeg',
    tier: 'grand',
  },
  {
    key: 'cash_5m',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1426895a-e3d6-48bd-a932-056dbc6ec4a8.jpeg',
    tier: 'secondary',
  },
  {
    key: 'hilux',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a4def850-fc60-47c2-81b2-10a2f9b01bf5.jpeg',
    tier: 'secondary',
  },
  {
    key: 'corolla',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cdda7ca0-f4b5-4c5c-bb25-03478401849b.jpeg',
    tier: 'secondary',
  },
  {
    key: 'iphone',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d4b028ca-b75a-411c-ac11-ed2073594ec0.jpeg',
    tier: 'secondary',
  },
];

export default function PrizesSection() {
  const { t } = useTranslation();

  const grandPrizes = PRIZES.filter((p) => p.tier === 'grand');
  const secondaryPrizes = PRIZES.filter((p) => p.tier === 'secondary');

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            {t('landing.prizes_title')}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            {t('landing.prizes_subtitle')}
          </p>
        </div>

        {/* Grand Prizes - Two Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          {grandPrizes.map((prize) => (
            <div
              key={prize.key}
              className="group glass-card rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={prize.image}
                  alt={t(`prizes.${prize.key}`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary-600 text-white text-xs md:text-sm font-bold shadow-lg">
                  {t('prizes.grand')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Prizes - Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {secondaryPrizes.map((prize) => (
            <div
              key={prize.key}
              className="group glass-card rounded-xl md:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={prize.image}
                  alt={t(`prizes.${prize.key}`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-accent-500 text-white text-[10px] md:text-xs font-bold shadow">
                  {t('prizes.secondary')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
