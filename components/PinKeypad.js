import { useState, useEffect, useCallback } from 'react';

export default function PinKeypad({ value, onChange, maxLength = 4, instruction }) {
  const [gridNumbers, setGridNumbers] = useState(Array(16).fill(null));

  // Shuffle numbers into random grid positions
  const shuffleNumbers = useCallback(() => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const positions = Array(16).fill(null);
    
    // Shuffle array using Fisher-Yates
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    // Place numbers in random positions (leaving 6 empty)
    const availablePositions = [...Array(16).keys()];
    for (let i = availablePositions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
    }
    
    numbers.forEach((num, idx) => {
      positions[availablePositions[idx]] = num;
    });
    
    setGridNumbers(positions);
  }, []);

  useEffect(() => {
    shuffleNumbers();
  }, [shuffleNumbers]);

  const handleNumberPress = (num) => {
    if (num !== null && value.length < maxLength) {
      onChange(value + num);
    }
  };

  const handleDelete = () => {
    onChange(value.slice(0, -1));
  };

  return (
    <div className="w-full">
      {/* Instruction Text */}
      {instruction && (
        <p className="text-gray-400 text-center text-base mb-6 leading-relaxed">
          {instruction}
        </p>
      )}

      {/* PIN Dots Display with Refresh Button */}
      <div className="flex items-center justify-center gap-6 mb-8">
        <div className="flex gap-4">
          {[...Array(maxLength)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                i < value.length
                  ? 'bg-primary-400'
                  : 'bg-primary-200'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            onChange(''); // Clear the entered PIN
            shuffleNumbers(); // Also reshuffle the numbers
          }}
          className="p-1 text-gray-600 hover:text-primary-600 transition-colors"
          aria-label="Reset PIN"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M1 4v6h6M23 20v-6h-6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Scrambled Keypad - 4x4 Grid */}
      <div className="bg-white rounded-t-3xl p-6 shadow-lg">
        <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
          {gridNumbers.map((num, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleNumberPress(num)}
              disabled={num === null}
              className={`w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center text-2xl font-semibold transition-all ${
                num === null
                  ? 'border-gray-100 bg-transparent cursor-default'
                  : 'border-gray-200 text-gray-800 hover:bg-primary-50 hover:border-primary-300 active:bg-primary-100 active:scale-95'
              }`}
            >
              {num !== null ? num : ''}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
