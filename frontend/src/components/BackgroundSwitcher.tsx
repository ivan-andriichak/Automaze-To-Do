'use client';

import { useState } from 'react';

interface BackgroundOption {
  name: string;
  value: string;
}

const backgroundOptions: BackgroundOption[] = [
  { name: 'Default White', value: 'bg-white' },
  { name: 'Light Gray', value: 'bg-gray-100' },
  { name: 'Soft Blue', value: 'bg-blue-50' },
  { name: 'Mint Green', value: 'bg-green-50' },
  {
    name: 'Pastel Gradient',
    value: 'bg-gradient-to-br from-purple-100 to-blue-200',
  },
  {
    name: 'Sunset Gradient',
    value: 'bg-gradient-to-br from-yellow-100 via-red-100 to-pink-200',
  },
];

interface BackgroundSwitcherProps {
  onBackgroundChange: (backgroundClass: string) => void;
}

export default function BackgroundSwitcher({
  onBackgroundChange,
}: BackgroundSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (backgroundClass: string) => {
    onBackgroundChange(backgroundClass);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Change background">
        {/* Іконка "три крапки" */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200"
          onMouseLeave={() => setIsOpen(false)}>
          <ul className="p-2">
            {backgroundOptions.map(option => (
              <li key={option.name}>
                <button
                  onClick={() => handleSelect(option.value)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                  <span
                    className={`w-4 h-4 rounded-full mr-3 border ${option.value}`}></span>
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
