import type { PricingPlan } from '../types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'half-day',
    name: 'Half Day Bounce',
    price: '$275',
    duration: 'Up to 4 hours',
    features: [
      '1 Bounce House of Your Choice',
      'Free Delivery & Setup',
      'Full Sanitization',
      'Free Pickup',
    ],
    isPopular: false,
  },
  {
    id: 'full-day',
    name: 'Full Day Bounce',
    price: '$450',
    duration: 'Up to 8 hours',
    features: [
      'Everything in Half Day, plus:',
      'Extended rental time',
      'Priority scheduling',
    ],
    isPopular: true,
  },
  {
    id: 'weekend',
    name: 'Weekend Bundle',
    price: '$750',
    duration: 'Full Weekend (Sat & Sun)',
    features: [
        'Everything in Full Day, plus:',
        '2-day rental',
        'Best value',
    ],
    isPopular: false,
  },
];
