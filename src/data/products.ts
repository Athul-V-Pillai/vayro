import { Product } from '../types';

/**
 * vayro Central Product Configuration & Pricing
 * Edit prices, shipping estimates, and feature copy in this single file.
 */

export const CURRENCY_SYMBOL = '₹';
export const CURRENCY_CODE = 'INR';

export const formatPrice = (amount: number): string => {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString('en-IN')}`;
};

export const SITE_DISCLAIMERS = {
  drowsiness: "Drowsiness detection is an assistance feature, not a guarantee of safety. Drivers remain fully responsible for vehicle operation at all times.",
  ambientMode: "Ambient Mode does not guarantee complete awareness of traffic sounds. Always maintain situational awareness while driving.",
  prototypeNotice: "Concept visualization. Device specifications and appearance reflect active prototype engineering and may evolve prior to batch manufacturing.",
  shippingBatch: "Estimated dispatch: Q3 2026 (Priority Founder Batch 1)",
  compliance: "The vayro ecosystem is engineered to operate strictly in accordance with local traffic safety regulations and is specifically configured to discourage any driver interaction while the vehicle is in motion."
};

export const PRODUCTS: Product[] = [
  {
    id: 'vayro-pro',
    name: 'vayro Pro',
    subtitle: 'Dual-Camera Dashcam + Ergonomic Pro Neckband Earbuds',
    tagline: 'All-day endurance for long-haul drivers and highway commuters.',
    price: 6999,
    badge: 'Founder Edition',
    estimatedShipping: 'Batch 1 • Ships Q3 2026',
    modelType: 'pro',
    shortDesc: 'A dual-camera dashcam paired with ultra-low latency flexible neckband earbuds and 28-hour active battery life.',
    description: 'The vayro Pro pairs our high-definition dual-camera dashcam with the ergonomic Pro Neckband. It is designed for drivers who want zero-drop audio alerts, physical tactile controls, and magnetic secure-clasp earbuds that rest comfortably around the collar for multi-hour shifts.',
    colors: [
      { name: 'Matte Obsidian', hex: '#0F1318', badge: 'Signature' },
      { name: 'Stealth Titanium', hex: '#2C353D' },
      { name: 'Teal Pulse Accent', hex: '#115E59' }
    ],
    highlights: [
      'Dual-Lens Dashcam: 4K HDR Road Camera + 1080p Stealth IR Cabin Eye-Tracker',
      'On-device AI NPU: Instant PERCLOS drowsiness analysis',
      'Ergonomic Pro Neckband: Flexible liquid silicone collar with magnetic snap earbuds',
      'Ultra-Low Latency Alert: Sub-120ms directional auditory intervention chime',
      '28-Hour Continuous Playtime with Rapid USB-C Quick Charge (10 min = 6 hrs)',
      'Smart Ambient Mode: Automatic acoustic pass-through for traffic sirens and horns'
    ],
    specs: [
      {
        category: 'Dashcam Unit',
        items: [
          { label: 'Front Road Camera', value: '4K Ultra-HD (3840x2160) @ 30fps, 155° FOV, F/1.8' },
          { label: 'Driver Cabin Camera', value: '1080p FHD with 940nm stealth IR illuminator array' },
          { label: 'Neural Processing Unit', value: 'Edge-AI NPU running real-time facial orientation & PERCLOS models' },
          { label: 'Mount System', value: 'Magnetic high-adhesion windshield ball socket with quick release' }
        ]
      },
      {
        category: 'Pro Neckband Earbuds',
        items: [
          { label: 'Form Factor', value: 'Ergonomic weighted U-neckband with contoured silicone' },
          { label: 'Battery Capacity', value: 'Up to 28 hours active monitoring & playback' },
          { label: 'Charging', value: 'USB-C fast charge (10 min charge provides 6 hours)' },
          { label: 'Controls', value: 'Tactile physical buttons for volume, track, and manual cabin mic mute' },
          { label: 'Wireless Protocol', value: 'Bluetooth 5.3 Low Energy + Ultra-Low Latency Safety Link' }
        ]
      }
    ],
    whatsInTheBox: [
      { item: 'vayro Dual-Camera AI Dashcam Unit', qty: '1x' },
      { item: 'vayro Pro Ergonomic Wireless Neckband', qty: '1x' },
      { item: 'Magnetic Windshield Quick-Mount with 3M adhesive', qty: '1x' },
      { item: '12V Car Power Adapter with dual USB-C PD outputs', qty: '1x' },
      { item: '3.5m Heavy-Duty Braided USB-C Power Cable', qty: '1x' },
      { item: 'Ergonomic Silicone Ear Tips (S, M, L)', qty: '3 pairs' },
      { item: 'Trim Tool & Cable Routing Clips', qty: '1 set' },
      { item: 'Quick Start Safety Manual & Priority Founder Card', qty: '1x' }
    ],
    comparison: {
      batteryLife: '28 Hours Continuous',
      formFactor: 'Flexible Contoured Neckband',
      contents: 'Dashcam + Neckband earbuds',
      controls: 'Raised Tactile Physical Buttons',
      chargingCase: 'Not required (Direct USB-C)',
      alertLatency: '< 120ms Direct BLE Link',
      ancSupport: 'Active Noise Cancellation',
      ambientMode: 'Smart Ambient Auto-Switch'
    }
  },
  {
    id: 'vayro-lite',
    name: 'vayro Lite',
    subtitle: 'Dual-Camera Dashcam + True Wireless Earbuds & Smart Case',
    tagline: 'Ultra-compact true wireless freedom with pocketable smart charging case.',
    price: 5999,
    badge: 'Popular Choice',
    estimatedShipping: 'Batch 1 • Ships Q3 2026',
    modelType: 'lite',
    shortDesc: 'A dual-camera dashcam paired with compact True Wireless earbuds and a smart charging case.',
    description: 'vayro Lite delivers the full driver-safety AI detection suite paired with sleek, lightweight True Wireless earbuds. Designed for everyday city commuters and weekend drivers who value minimalist aesthetics and pocket portability. When placed in the smart case, the earbuds recharge instantly while keeping you connected for hands-free driving assistance.',
    colors: [
      { name: 'Matte Obsidian', hex: '#0F1318', badge: 'Signature' },
      { name: 'Arctic Chalk', hex: '#E2E8F0' },
      { name: 'Gunmetal Gray', hex: '#334155' }
    ],
    highlights: [
      'Dual-Lens Dashcam: 4K HDR Road Camera + 1080p Stealth IR Cabin Eye-Tracker',
      'On-device AI NPU: Real-time PERCLOS analysis',
      'True Wireless Earbuds: Ultra-lightweight 4.2g per bud with ergonomic canal lock',
      'Smart Pocket Case: 24-hour total reserve with fast magnetic docking',
      'Interactive Case Lid: Magnetic hall-effect sensor with auto-connect on open',
      'Smart Ambient Mode: Dynamic sound adjustment when car speed exceeds 40 km/h'
    ],
    specs: [
      {
        category: 'Dashcam Unit',
        items: [
          { label: 'Front Road Camera', value: '4K Ultra-HD (3840x2160) @ 30fps, 155° FOV, F/1.8' },
          { label: 'Driver Cabin Camera', value: '1080p FHD with 940nm stealth IR illuminator array' },
          { label: 'Neural Processing Unit', value: 'Edge-AI NPU running real-time facial orientation & PERCLOS models' },
          { label: 'Mount System', value: 'Magnetic high-adhesion windshield ball socket with quick release' }
        ]
      },
      {
        category: 'Lite True Wireless Earbuds',
        items: [
          { label: 'Form Factor', value: 'True Wireless in-ear with charging pebble case' },
          { label: 'Battery Capacity', value: '6 hours per charge + 18 hours in case (24 hours total)' },
          { label: 'Charging', value: 'USB-C fast charge (15 min in case provides 3.5 hours)' },
          { label: 'Controls', value: 'Capacitive touch sensors with haptic chime response' },
          { label: 'Wireless Protocol', value: 'Bluetooth 5.3 Low Energy + Ultra-Low Latency Safety Link' }
        ]
      }
    ],
    whatsInTheBox: [
      { item: 'vayro Dual-Camera AI Dashcam Unit', qty: '1x' },
      { item: 'vayro Lite True Wireless Earbuds (Left & Right)', qty: '1 pair' },
      { item: 'Smart Magnetic Charging Case with Hall Sensor', qty: '1x' },
      { item: 'Magnetic Windshield Quick-Mount with 3M adhesive', qty: '1x' },
      { item: '12V Car Power Adapter with dual USB-C PD outputs', qty: '1x' },
      { item: '3.5m Heavy-Duty Braided USB-C Power Cable', qty: '1x' },
      { item: 'Ergonomic Silicone Ear Tips (S, M, L)', qty: '3 pairs' },
      { item: 'Quick Start Safety Manual & Priority Founder Card', qty: '1x' }
    ],
    comparison: {
      batteryLife: '24 Hours Total (6h buds + 18h case)',
      formFactor: 'Compact True Wireless In-Ear',
      contents: 'Dashcam + True Wireless earbuds with charging case',
      controls: 'Capacitive Touch Sensors',
      chargingCase: 'Included (Magnetic Pebble)',
      alertLatency: '< 130ms Direct BLE Link',
      ancSupport: 'Active Noise Cancellation',
      ambientMode: 'Smart Ambient Auto-Switch'
    }
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Detect',
    tagline: 'On-Device Facial & Eye Biometrics',
    description: 'The driver-facing camera equipped with 940nm stealth infrared illumination monitors PERCLOS (Percentage of Eye Closure), micro-blink velocity, yawning duration, and head nod downward trajectory at 60 fps.',
    detail: 'Processed on the dedicated neural engine without sending a single frame of cabin video to the cloud.'
  },
  {
    step: '02',
    title: 'Alert',
    tagline: 'Sub-120ms Latency Audio Intervention',
    description: 'The moment drowsiness thresholds or micro-sleep indicators trigger, the dashcam transmits a prioritized ultra-low latency directional alert signal directly to your paired vayro Pro or Lite earbuds.',
    detail: 'Bypasses standard OS bluetooth audio buffering for immediate acoustic wake-up pulse delivery.'
  },
  {
    step: '03',
    title: 'Stay Safe',
    tagline: 'Smart Ambient Awareness & Rest Prompts',
    description: 'The auditory alert breaks the fatigue trance instantly. Simultaneously, the companion system gently prompts a nearest safe-rest stop recommendation on your dashboard display.',
    detail: 'Automatic Ambient Mode ensures you retain situational awareness of surrounding horns, sirens, and traffic.'
  }
];

export const USE_CASES = [
  {
    title: 'Long-Haul Truckers',
    role: 'Commercial Freight & Logistics',
    description: '12-hour interstate night routes induce severe monotony. vayro Pro’s 28-hour neckband keeps drivers actively monitored through foggy dawn transitions without oversized headsets.',
    stat: 'Monitors through darkness with zero IR glare.'
  },
  {
    title: 'Taxi & Rideshare Operators',
    role: 'Uber, Ola, Urban Drivers',
    description: 'Continuous passenger interaction and late-night surge hours strain driver alertness. vayro provides hands-free calling plus discreet, non-intrusive safety monitoring.',
    stat: 'Discreet in-ear warning protects passengers & driver.'
  },
  {
    title: 'Delivery & Courier Drivers',
    role: 'Last-Mile & Parcel Logistics',
    description: 'Intense delivery schedules and stop-and-go urban traffic cause cognitive exhaustion. vayro helps protect driver wakefulness throughout demanding routes.',
    stat: 'Discreet alerts support attentive delivery driving.'
  },
  {
    title: 'Night-Shift Healthcare & Workers',
    role: 'Post-Shift Commuters',
    description: 'Driving home after a 12-hour night hospital shift or factory rotation is when micro-sleep incidents spike dramatically. vayro provides the extra layer of vigilance.',
    stat: 'Protects the vulnerable 4:00 AM - 7:00 AM homeward drive.'
  },
  {
    title: 'Private Highway Drivers',
    role: 'Family Road Trips & Commutes',
    description: 'Monotonous 6-lane expressways easily lull private vehicle drivers into highway hypnosis. Dual 4K road capture records scenic memories while keeping your family safe.',
    stat: 'Dual 4K + 1080p peace of mind on every family journey.'
  }
];

export const FAQS = [
  {
    question: 'How does vayro detect drowsiness without false alarms?',
    answer: 'vayro utilizes a specialized computer vision neural network trained on thousands of hours of driver biometrics. Rather than simply detecting when eyes close for a blink, it calculates PERCLOS (the percentage of time the eyelid covers 80% or more of the pupil over a rolling time window), detects progressive eyelid drooping, measures head-pitch nodding angles, and correlates yawn frequency. This filters out regular blinking, looking in side-mirrors, and normal head motion.'
  },
  {
    question: 'Does the interior camera shine bright lights in my eyes at night?',
    answer: 'No. The driver-monitoring camera is illuminated by custom 940nm stealth infrared LEDs. 940nm wavelength is completely invisible to human retinas (zero red glow, zero glare), ensuring zero driver distraction or eye strain while illuminating facial landmarks in pitch-black conditions.'
  },
  {
    question: 'Is my cabin video uploaded to cloud servers or watched by anyone?',
    answer: 'No. Facial tracking, eye analysis, and drowsiness detection are computed on the dashcam’s dedicated Edge-AI NPU chip. No cabin video or facial biometrics are uploaded to cloud servers or external parties. Footage remains on your local MicroSD card, under your complete control.'
  },
  {
    question: 'How do the companion earbuds work with the dashcam?',
    answer: 'The dashcam unit and companion earbuds (vayro Pro or Lite) form a dedicated low-latency wireless Bluetooth link. If fatigue or micro-sleep is detected, an emergency intervention chime is transmitted directly to your ear within 120 milliseconds. Unlike a generic car speaker chime that sleeping drivers may ignore or passenger conversations drown out, direct binaural audio ensures rapid cognitive arousal.'
  },
  {
    question: 'What is Smart Ambient Mode and how does it keep me safe?',
    answer: 'Smart Ambient Mode utilizes the earbuds’ external microphones to actively pipe in crucial traffic acoustics—such as emergency vehicle sirens, honking horns, passing cyclists, and railway crossings. While driving, Ambient Mode prevents sensory isolation. Please note: Ambient Mode does not guarantee complete awareness of all traffic sounds, and drivers must maintain attentive situational awareness at all times.'
  },
  {
    question: 'When will orders ship?',
    answer: 'We are currently in active prototype validation. Founder Batch 1 orders are projected to begin dispatch in Q3 2026 and include priority manufacturing queue placement plus complimentary lifetime firmware upgrades.'
  },
  {
    question: 'What is the return and warranty policy?',
    answer: 'Orders are fully refundable at any time prior to physical dispatch with zero cancellation fees. Once shipped, all vayro hardware units come backed by our comprehensive 1-Year Limited Manufacturer Hardware Replacement Warranty.'
  }
];
