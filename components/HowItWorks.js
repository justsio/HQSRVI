import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      key: 'step1',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      ),
    },
    {
      key: 'step2',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      ),
    },
    {
      key: 'step3',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4zM7 4H4v2a3 3 0 003 3M17 4h3v2a3 3 0 01-3 3"
        />
      ),
    },
  ];

  return (
    <section className="py-12 md:py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t('howitworks.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            {t('howitworks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {steps.map((step, i) => (
            <div
              key={step.key}
              className="relative glass-card rounded-2xl p-6 md:p-7 text-center card-hover"
            >
              <div className="absolute -top-3 right-6 w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                {i + 1}
              </div>
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {step.icon}
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t(`howitworks.${step.key}_title`)}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {t(`howitworks.${step.key}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
