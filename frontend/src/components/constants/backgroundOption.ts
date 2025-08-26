import { BackgroundOption } from '@/components/BackgroundSwitcher';

export const backgroundOptions: BackgroundOption[] = [
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
  {
    name: 'Aqua Sky',
    value: 'bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-200',
  },
  {
    name: 'Peach Dream',
    value: 'bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-200',
  },
  {
    name: 'Spring Meadow',
    value: 'bg-gradient-to-br from-green-100 via-lime-100 to-yellow-100',
  },
  {
    name: 'Lavender Mist',
    value: 'bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100',
  },
];
