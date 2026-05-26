import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const PRIZES = [
  {
    key: 'cash_100k',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424383_121-55RdYoX9enwse4yarYS55d0jF5jwRu.jpg',
    featured: true,
    isGrandPrize: true,
  },
  {
    key: 'house',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424377_121-nDAA7VmoR4pL2sdEhSTRMvXVPSV1Ei.jpg',
    featured: true,
  },
  {
    key: 'corolla',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424376_121-d3XmxIzgbyaBRiIVSB9uHSYCXvsjrU.jpg',
    featured: true,
  },
  {
    key: 'hilux',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424378_121-vO7oALJVjdeVoieM2ZqIL9vSlzccAz.jpg',
    featured: true,
  },
  {
    key: 'cash_500k',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424379_121-4MRIWC7tdKaD13Cw64maDyKjITh20w.jpg',
    featured: true,
  },
];

export default function PrizesSection() {
  const { t } = useTranslation();

  const grandPrize = PRIZES.find(p => p.isGrandPrize);
  const otherPrizes = PRIZES.filter(p => !p.isGrandPrize);

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

        {/* Grand Prize - Full Width Featured */}
        {grandPrize && (
          <div className="mb-6 md:mb-8">
            <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                <Image
                  src={grandPrize.image}
                  alt={t(`prizes.${grandPrize.key}`)}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Other Prizes - Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {otherPrizes.map((prize) => (
            <div
              key={prize.key}
              className="group glass-card rounded-xl md:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={prize.image}
                  alt={t(`prizes.${prize.key}`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
