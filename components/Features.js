import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      key: 'fast',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
    },
    {
      key: 'secure',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
    },
    {
      key: 'exclusive',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      ),
    },
    {
      key: 'app',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
        />
      ),
    },
  ];

  return (
    <section className="py-12 md:py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {features.map((feature) => (
          <div
            key={feature.key}
            className="glass-card rounded-2xl p-5 md:p-6 text-center card-hover"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-600 dark:text-primary-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {feature.icon}
              </svg>
            </div>
            <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1">
              {t(`features.${feature.key}`)}
            </h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {t(`features.${feature.key}_desc`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
