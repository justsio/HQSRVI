import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out shortly after mount
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 900);

    // Complete and remove splash after fade animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-white via-primary-50 to-primary-100 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo */}
      <div className="animate-fade-in-up">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7923244c-5be4-4f29-bbe9-96c23ebaebc9.jpeg"
          alt="Masrvi Logo"
          width={220}
          height={88}
          className="h-24 md:h-32 w-auto object-contain mb-8"
          priority
        />
      </div>

      {/* Spinner */}
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>

      {/* Loading text */}
      <p className="mt-6 text-primary-700/80 text-sm animate-pulse">
        جاري التحميل...
      </p>
    </div>
  );
}
