import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/**
 * Masrvi-style bottom sheet card that slides up from the bottom over a dimmed backdrop.
 * - Large rounded top corners (28px), background #F4F4F2
 * - Covers ~92% of viewport height
 * - Spring slide-up animation (~350ms)
 */
export default function BottomSheet({
  children,
  backHref,
  backLabel,
  onBack,
  showBack = true,
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Dimmed backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Sheet */}
      <motion.div
        className="relative w-full mx-auto max-w-md flex flex-col"
        style={{
          height: '92vh',
          backgroundColor: '#F4F4F2',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
        }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1.5 rounded-full bg-gray-300" />
        </div>

        {/* Back link (top-right in RTL) */}
        {showBack && (
          <div className="px-5 pt-2">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors text-base font-medium"
              >
                <span className="rtl:rotate-180 text-lg leading-none">&#10094;</span>
                <span>{backLabel}</span>
              </button>
            ) : (
              <Link
                href={backHref || '/'}
                className="inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors text-base font-medium"
              >
                <span className="rtl:rotate-180 text-lg leading-none">&#10094;</span>
                <span>{backLabel}</span>
              </Link>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 pt-2">{children}</div>
      </motion.div>
    </div>
  );
}

export { AnimatePresence };
