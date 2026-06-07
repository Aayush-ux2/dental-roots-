export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  service: string;
  date: string;
  slot: string;
  dentistName: string;
  symptoms?: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'rescheduled' | 'completed';
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  isCustom?: boolean;
}

export interface Dentist {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  detailedInfo: string;
  priceRange: string;
  duration: string;
  IconName: string;
  benefits: string[];
}
