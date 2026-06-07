import { X, Clock, HelpCircle, UserCheck, ShieldAlert, Award } from 'lucide-react';
import { Service } from '../types';
import { dentists } from '../data';
import { motion } from 'motion/react';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onBookDirect: (serviceId: string) => void;
}

export default function ServiceDetailModal({ service, onClose, onBookDirect }: ServiceDetailModalProps) {
  if (!service) return null;

  // Let's find recommended dentist match based on service classification
  const getRecommendedDentist = () => {
    if (service.id === 'preventative') return dentists[1]; // Dr. Alina
    if (service.id === 'restorative') return dentists[0]; // Dr. Prajwal
    if (service.id === 'cosmetic') return dentists[1]; // Dr. Alina
    if (service.id === 'emergency') return dentists[2]; // Dr. Saurav
    return dentists[0];
  };

  const expertDentist = getRecommendedDentist();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl w-full max-w-lg p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        {/* Close trigger */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header styling */}
        <div className="space-y-2 border-b pb-4 mb-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wider uppercase">
            <span className="material-symbols-outlined text-2xl font-bold bg-slate-100 p-2 rounded-lg">
              {service.IconName}
            </span>
            <span>Dental Roots Specialty</span>
          </div>
          <h3 className="text-2xl font-bold font-serif text-slate-900 tracking-tight">
            {service.title}
          </h3>
        </div>

        {/* Detailed Description */}
        <p className="text-sm text-gray-600 leading-relaxed font-sans mb-4">
          {service.detailedInfo}
        </p>

        {/* Duration & Price Estimate Card */}
        <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl mb-4 text-xs font-semibold">
          <div className="flex items-center gap-2 text-slate-700">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="text-gray-400 font-medium">Session Duration</p>
              <p className="font-extrabold text-slate-800 text-sm mt-0.5">{service.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-700 border-l pl-4">
            <span className="material-symbols-outlined text-xl text-primary font-bold">payments</span>
            <div>
              <p className="text-gray-400 font-medium">Estimated Pricing</p>
              <p className="font-extrabold text-slate-800 text-sm mt-0.5">{service.priceRange}</p>
            </div>
          </div>
        </div>

        {/* Biological Benefits & Protocol Checklist */}
        <div className="space-y-2.5 mb-5">
          <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-widest flex items-center gap-1.5">
            <Award className="w-4 h-4 text-accent-teal" />
            Clinical Protocol &amp; Benefits
          </h4>
          <ul className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-150">
            {service.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                <span className="material-symbols-outlined text-green-600 text-base font-bold select-none mt-0.5">
                  check_circle
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recomended Specialist Highlight */}
        <div className="bg-slate-50 border rounded-xl p-4 mb-6 relative">
          <div className="flex items-center gap-3">
            <img
              src={expertDentist.avatar}
              alt={expertDentist.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-0.5">
              <span className="text-[10px] text-primary uppercase font-bold tracking-wider flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                Recommended Specialist
              </span>
              <p className="font-serif font-bold text-slate-800 text-sm">{expertDentist.name}</p>
              <p className="text-xs text-gray-500">{expertDentist.role}</p>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 italic mt-3 pt-2.5 border-t border-slate-200/60 leading-relaxed">
            &ldquo;{expertDentist.bio.split('.')[0]}&rdquo;
          </p>
        </div>

        {/* Action Button: Schedules service direct */}
        <div className="flex gap-2">
          <button
            onClick={() => onBookDirect(service.id)}
            className="flex-1 py-3 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary-container text-xs uppercase tracking-widest transition-all shadow-md text-center hover:translate-y-[-1px]"
          >
            Direct Appointment with Specialist
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
