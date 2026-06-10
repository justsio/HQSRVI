import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const PRIZES = [
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

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            {t('landing.prizes_title')}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            {t('landing.prizes_subtitle')}
          </p>
        </div>

        {/* Prizes - One per row */}
        <div className="flex flex-col gap-5 md:gap-6">
          {PRIZES.map((prize) => (
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
                />
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs md:text-sm font-bold shadow-lg ${
                    prize.tier === 'grand' ? 'bg-primary-600' : 'bg-accent-500'
                  }`}
                >
                  {prize.tier === 'grand' ? t('prizes.grand') : t('prizes.secondary')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
