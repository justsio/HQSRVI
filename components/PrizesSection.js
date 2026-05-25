import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const PRIZES = [
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
    featured: false,
  },
  {
    key: 'cash_100k',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5810143423896424383_121-55RdYoX9enwse4yarYS55d0jF5jwRu.jpg',
    featured: false,
  },
];

export default function PrizesSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('landing.prizes_title')}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t('landing.prizes_subtitle')}
          </p>
        </div>

        {/* Featured Prizes - Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {PRIZES.filter(p => p.featured).map((prize) => (
            <div
              key={prize.key}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={prize.image}
                  alt={t(`prizes.${prize.key}`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-bold rounded-full">
                    {t(`prizes.${prize.key}`)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cash Prizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRIZES.filter(p => !p.featured).map((prize) => (
            <div
              key={prize.key}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
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
