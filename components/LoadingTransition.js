import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Full white "native splash" transition shown between steps.
 * Site logo centered with a small thin spinner below it.
 */
export default function LoadingTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7923244c-5be4-4f29-bbe9-96c23ebaebc9.jpeg"
        alt="Masrvi Logo"
        width={200}
        height={80}
        className="h-20 w-auto object-contain"
        priority
      />
      <div className="mt-8 w-7 h-7 border-2 border-gray-200 border-t-primary-500 rounded-full animate-spin" />
    </motion.div>
  );
}
