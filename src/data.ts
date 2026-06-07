import { Service, Dentist, Review } from './types';

export const services: Service[] = [
  {
    id: 'preventative',
    title: 'Preventative Care',
    description: 'Comprehensive cleanings, routine checkups, and digital X-rays to catch issues early.',
    detailedInfo: 'Our preventative checkup utilizes digital low-radiation radiography alongside ultrasonic scale and polish to maintain pristine enamel integrity and guard against long-term gum disorders.',
    priceRange: 'NPR 1,500 - 3,500',
    duration: '45 mins',
    IconName: 'health_and_safety',
    benefits: [
      'Comprehensive ultrasonic scale & polish',
      'Advanced digital diagnostic X-rays',
      'Individualized oral hygiene profiling',
      'Ph-mineral enamel defense treatment'
    ]
  },
  {
    id: 'restorative',
    title: 'Restorative Dentistry',
    description: 'Fillings, crowns, bridges, and root canal therapies to restore function and comfort.',
    detailedInfo: 'Using modern hypoallergenic composites and precise biological tissue management, we repair structural damages resulting from caries or trauma with complete aesthetic match.',
    priceRange: 'NPR 4,000 - 12,000',
    duration: '60 mins',
    IconName: 'settings_accessibility',
    benefits: [
      'Mercury-free aesthetic composite fillings',
      'Precision porcelain crowns and bridges',
      'Painless micro-laser root canal therapy',
      'Bite-comfort and muscle-load balancing'
    ]
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Treatments',
    description: 'Teeth whitening, veneers, and smile makeovers for a radiant, confident look.',
    detailedInfo: 'Crafted with premium lithium-disilicate veneers and laser cold-light activation, we customize tooth color shade, alignment, and balance to generate natural radiant smiles.',
    priceRange: 'NPR 8,000 - 25,000',
    duration: '90 mins',
    IconName: 'auto_fix_high',
    benefits: [
      'Cold-light hydrogen teeth whitening',
      'Handcrafted ultra-thin porcelain veneers',
      'Digital smile cosmetic proportion alignment',
      'Minor structural symmetry contouring'
    ]
  },
  {
    id: 'emergency',
    title: 'Emergency Dentistry',
    description: 'Prompt, compassionate relief for urgent care, available whenever you need us most.',
    detailedInfo: 'We prioritize patients with acute nerve flares, structural dental fractures, or avulsions for immediate direct relief same-day, with expert pain-neutralizing sedation.',
    priceRange: 'NPR 3,000 - 9,000',
    duration: '30 mins',
    IconName: 'medical_services',
    benefits: [
      'Immediate acute nerve pain neutralization',
      'Instant post-accident tooth stabilizing',
      'Same-day Priority Emergency booking slot',
      'Direct structural fracture patching'
    ]
  }
];

export const dentists: Dentist[] = [
  {
    id: 'dr-prajwal',
    name: 'Dr. Prajwal Maskey',
    role: 'Seniour Endodontist & Micro-Surgeon',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256&h=256',
    bio: 'With over 12 years of specialized root therapy experience, Dr. Prajwal utilizes digital surgical microscopes to conduct micro-conservative endodontic treatments without discomfort.',
    rating: 4.9
  },
  {
    id: 'dr-alina',
    name: 'Dr. Alina Shrestha',
    role: 'Aesthetic Orthodontist & Smile Architect',
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434e3b96f?auto=format&fit=crop&q=80&w=256&h=256',
    bio: 'Dr. Alina specializes in clear aligner therapy and complex skeletal expansions. She values gentle, empathetic care to create perfectly aligned, harmonic smiles.',
    rating: 5.0
  },
  {
    id: 'dr-saurav',
    name: 'Dr. Saurav Nepal',
    role: 'Oral Implantologist & Implant Surgeon',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256&h=256',
    bio: 'A graduate of reconstructive dental implants, Dr. Saurav specializes in guided computer implant placement and painless immediate loading full-arch treatments.',
    rating: 4.8
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    name: 'Anjali Shrestha',
    rating: 5,
    comment: 'The most gentle dental experience I\'ve had in Kathmandu. The environment is so calming, you almost forget you\'re at a clinic. Strongly recommend Dr. Alina!',
    date: '2026-05-18'
  },
  {
    id: 'rev-2',
    name: 'Rohan Maskey',
    rating: 5,
    comment: 'Sterilization and clinical technology here are strictly top-tier. I had a crown replaced by Dr. Prajwal; it felt absolutely painless and fits perfectly natural.',
    date: '2026-06-02'
  },
  {
    id: 'rev-3',
    name: 'Dolma Lama',
    rating: 4,
    comment: 'Extremely clean, modern interiors. Everyone is super friendly. Booking was fully convenient and they even walked me through the X-rays in details.',
    date: '2026-06-05'
  }
];

export const patientInfoChecklists = [
  {
    title: 'First-time Visit Preparation',
    items: [
      'Bring any recent traditional dental films or medical records (optional).',
      'List your active pharmaceutical records or previous systemic allergies.',
      'Arrive approximately 10 minutes beforehand to fill Kathmandu administrative pre-charts.',
      'Ensure a clean, light meal is consumed if scheduled for morning procedures.'
    ]
  },
  {
    title: 'Sterilization & Biological Protocol',
    items: [
      '100% Class-B Autoclave autoclaved instruments wrapped in single-use packages.',
      'Active physical and biological diagnostic spore testing on clinical processors.',
      'In-office medical-grade water purification to prevent bio-debris.',
      'Mandatory disposable surface barrier layers replaced between patients.'
    ]
  }
];
