'use client';

import { useEffect, useRef, useState } from 'react';
import DotsHorizontalIcon from '@/components/icons/DotsHorizontalIcon';
import { backgroundOptions } from './constants/backgroundOption';

export interface BackgroundOption {
  name: string;
  value: string;
}

interface BackgroundSwitcherProps {
  onBackgroundChange: (backgroundClass: string) => void;
}

export default function BackgroundSwitcher({
  onBackgroundChange,
}: BackgroundSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (backgroundClass: string) => {
    onBackgroundChange(backgroundClass);
    setIsOpen(false);
  };

  return (
    <div className="relative" tabIndex={-1} ref={menuRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Change background">
        <DotsHorizontalIcon className="h-6 w-6 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
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
