import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function CountdownTimer() {
  const { t } = useTranslation();
  
  // Set initial time: 3 days, 14 hours, 23 minutes
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 23,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                // Timer finished
                clearInterval(timer);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: t('countdown.days'), key: 'days' },
    { value: timeLeft.hours, label: t('countdown.hours'), key: 'hours' },
    { value: timeLeft.minutes, label: t('countdown.minutes'), key: 'minutes' },
    { value: timeLeft.seconds, label: t('countdown.seconds'), key: 'seconds' },
  ];

  return (
    <div className="w-full">
      <h3 className="text-white/90 text-sm md:text-base font-medium text-center mb-4">
        {t('countdown.title')}
      </h3>
      
      <div className="flex justify-center items-center gap-2 md:gap-4" dir="ltr">
        {timeUnits.map((unit, index) => (
          <div key={unit.key} className="flex items-center">
            {/* Time Unit Box */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                <span className="text-2xl md:text-4xl font-bold text-white">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-white/70 text-xs md:text-sm mt-2 font-medium">
                {unit.label}
              </span>
            </div>
            
            {/* Separator */}
            {index < timeUnits.length - 1 && (
              <div className="flex flex-col items-center justify-center mx-1 md:mx-2 -mt-6">
                <span className="text-white/50 text-xl md:text-3xl font-bold">:</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
