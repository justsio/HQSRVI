import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function PinKeypad({ value, onChange, maxLength = 4, instruction }) {
  // 12 slots (4 rows x 3 cols): 10 digits in randomized positions + 2 empty slots
  const [keys, setKeys] = useState(Array(12).fill(null));

  const shuffleKeys = useCallback(() => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const slots = Array(12).fill(null);

    // Pick 10 random distinct positions out of 12 for the digits
    const positions = [...Array(12).keys()];
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    // Shuffle the digits themselves
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    numbers.forEach((num, idx) => {
      slots[positions[idx]] = num;
    });

    setKeys(slots);
  }, []);

  useEffect(() => {
    shuffleKeys();
  }, [shuffleKeys]);

  const handlePress = (num) => {
    if (num !== null && value.length < maxLength) {
      onChange(value + num);
    }
  };

  const handleReset = () => {
    onChange('');
    shuffleKeys();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Instruction Text */}
      {instruction && (
        <p className="text-gray-500 text-center text-base mb-8 leading-relaxed">
          {instruction}
        </p>
      )}

      {/* PIN Dots + Reset icon */}
      <div className="flex items-center justify-center gap-5 mb-10">
        <div className="flex gap-4">
          {[...Array(maxLength)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: i < value.length ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.2 }}
              className={`w-3.5 h-3.5 rounded-full transition-colors duration-200 ${
                i < value.length ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
          aria-label="Reset PIN"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M1 4v6h6M23 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Scrambled circular keypad - 3 cols x 4 rows */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-4 mx-auto">
        {keys.map((num, index) =>
          num === null ? (
            <div key={index} className="w-16 h-16" aria-hidden="true" />
          ) : (
            <motion.button
              key={index}
              type="button"
              onClick={() => handlePress(num)}
              whileTap={{ scale: 0.88, backgroundColor: '#E5E5E5' }}
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-semibold text-gray-900"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            >
              {num}
            </motion.button>
          )
        )}
      </div>
    </div>
  );
}
