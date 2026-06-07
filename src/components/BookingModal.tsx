import { useState, useEffect, FormEvent, KeyboardEvent } from 'react';
import { X, Calendar, Clock, User, Phone, Stethoscope, CheckCircle2, Shield, CalendarDays, Trash2, ArrowRight } from 'lucide-react';
import { Appointment } from '../types';
import { dentists, services } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
}

export default function BookingModal({ isOpen, onClose, preSelectedServiceId }: BookingModalProps) {
  const [activeTab, setActiveTab] = useState<'book' | 'manage'>('book');
  
  // Booking Form State
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(preSelectedServiceId || 'preventative');
  const [selectedDentist, setSelectedDentist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [symptoms, setSymptoms] = useState('');
  
  // Successful Reservation Indicator
  const [successAppointment, setSuccessAppointment] = useState<Appointment | null>(null);

  // Search/Manage query
  const [searchPhone, setSearchPhone] = useState('');
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [searched, setSearched] = useState(false);

  // Default Time Slots in Dental Roots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:15 AM', '12:30 PM',
    '02:00 PM', '03:15 PM', '04:30 PM', '05:45 PM'
  ];

  // Set default pre-selected service whenever modal opens
  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedService(preSelectedServiceId);
    }
  }, [preSelectedServiceId, isOpen]);

  // Handle Form Submission
  const handleBook = (e: FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone || !selectedDate || !selectedSlot) {
      alert('Please fill out all mandatory fields (Name, Phone, Date, and Time Slot).');
      return;
    }

    const dentistObj = dentists.find(d => d.id === selectedDentist) || dentists[0];
    const serviceObj = services.find(s => s.id === selectedService) || services[0];

    const newAppointment: Appointment = {
      id: 'apt-' + Math.random().toString(36).substr(2, 9),
      patientName,
      phone: phone.trim(),
      service: serviceObj.title,
      date: selectedDate,
      slot: selectedSlot,
      dentistName: dentistObj.name,
      symptoms: symptoms || 'Regular Routine consultation checkup',
      status: 'confirmed'
    };

    // Save of appointment to LocalStorage
    const existing = localStorage.getItem('dental_roots_appointments');
    const appointments: Appointment[] = existing ? JSON.parse(existing) : [];
    appointments.push(newAppointment);
    localStorage.setItem('dental_roots_appointments', JSON.stringify(appointments));

    setSuccessAppointment(newAppointment);
    
    // Reset inputs
    setPatientName('');
    setPhone('');
    setSelectedDentist('');
    setSelectedDate('');
    setSelectedSlot('');
    setSymptoms('');
  };

  // Search local appointments
  const findAppointments = (phoneQuery: string) => {
    const existing = localStorage.getItem('dental_roots_appointments');
    const appointments: Appointment[] = existing ? JSON.parse(existing) : [];
    const matched = appointments.filter(apt => 
      apt.phone.toLowerCase().includes(phoneQuery.toLowerCase()) ||
      apt.patientName.toLowerCase().includes(phoneQuery.toLowerCase())
    );
    setMyAppointments(matched);
    setSearched(true);
  };

  // Trigger search on mount or keypress
  const handleSearchKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      findAppointments(searchPhone);
    }
  };

  // Cancel registered appointment
  const cancelAppointment = (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment checkup?')) {
      const existing = localStorage.getItem('dental_roots_appointments');
      if (existing) {
        const appointments: Appointment[] = JSON.parse(existing);
        const updated = appointments.filter(apt => apt.id !== id);
        localStorage.setItem('dental_roots_appointments', JSON.stringify(updated));
        setMyAppointments(updated.filter(apt => 
          apt.phone.toLowerCase().includes(searchPhone.toLowerCase()) || 
          apt.patientName.toLowerCase().includes(searchPhone.toLowerCase())
        ));
      }
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl w-full max-w-2xl px-6 py-8 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-slate-100"
          id="close-booking-modal"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <span className="material-symbols-outlined text-3xl font-bold">verified_user</span>
            <span className="font-serif font-bold text-xl">Dental Roots Kathmandu</span>
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-900 tracking-tight">
            Clinic Patient Portal
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Book rapid premium dental slots or track your pre-existing consultations securely.
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-gray-100 mb-6 bg-slate-50 p-1.5 rounded-lg">
          <button
            onClick={() => { setActiveTab('book'); setSuccessAppointment(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'book'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            Book Dental Visit
          </button>
          <button
            onClick={() => { setActiveTab('manage'); setSearched(false); setMyAppointments([]); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'manage'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Clock className="w-4 h-4" />
            Track / Cancel Appointment
          </button>
        </div>

        {/* Render Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'book' ? (
            <motion.div
              key="book-tab"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.15 }}
            >
              {successAppointment ? (
                /* Success Slate Card */
                <div className="text-center py-8 px-4 bg-green-50/50 border border-green-100 rounded-xl space-y-4">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">Appointment Provisioned!</h3>
                  <div className="max-w-md mx-auto text-sm text-slate-700 bg-white p-5 rounded-xl text-left border border-slate-100 space-y-3 shadow-xs">
                    <p className="flex justify-between border-b pb-1.5 border-dashed border-slate-100">
                      <span className="text-gray-400">Patient:</span>
                      <span className="font-semibold text-slate-800">{successAppointment.patientName}</span>
                    </p>
                    <p className="flex justify-between border-b pb-1.5 border-dashed border-slate-100">
                      <span className="text-gray-400">Oral Service:</span>
                      <span className="font-semibold text-slate-800">{successAppointment.service}</span>
                    </p>
                    <p className="flex justify-between border-b pb-1.5 border-dashed border-slate-100">
                      <span className="text-gray-400">Consultant:</span>
                      <span className="font-medium text-primary">{successAppointment.dentistName}</span>
                    </p>
                    <p className="flex justify-between border-b pb-1.5 border-dashed border-slate-100">
                      <span className="text-gray-400">Date:</span>
                      <span className="font-semibold text-slate-800">{successAppointment.date}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-400">Reserved Time Slot:</span>
                      <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded text-xs">
                        {successAppointment.slot}
                      </span>
                    </p>
                  </div>
                  
                  <div className="flex gap-4 max-w-sm mx-auto pt-2">
                    <button
                      onClick={() => setSuccessAppointment(null)}
                      className="flex-1 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-container font-medium transition-all text-sm shadow-sm"
                    >
                      Book Another Visit
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium transition-all text-sm"
                    >
                      Dismiss View
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-primary" />
                    Brought to you under Sterilization Autoclave Protocols.
                  </p>
                </div>
              ) : (
                /* Primary Appointment Booking Form */
                <form onSubmit={handleBook} className="space-y-5">
                  {/* Two Column Grid name & phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest">
                        Patient Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="e.g. Ramesh Giri"
                          className="w-full bg-slate-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 9841XXXXXX"
                          className="w-full bg-slate-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Two Column Dental Service and Preferred Doctor selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest">
                        Dentistry Service <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Stethoscope className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full bg-slate-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none"
                        >
                          {services.map(srv => (
                            <option key={srv.id} value={srv.id}>
                              {srv.title} ({srv.priceRange.split(' - ')[0]}~)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest">
                        Requested Consultant (Optional)
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <select
                          value={selectedDentist}
                          onChange={(e) => setSelectedDentist(e.target.value)}
                          className="w-full bg-slate-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none"
                        >
                          <option value="">Any Available Specialist</option>
                          {dentists.map(dent => (
                            <option key={dent.id} value={dent.id}>
                              {dent.name} (Orthodontist/Surgeon)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Calendar Choice */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest">
                      Requested Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-slate-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Available Time Slots Grid */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest">
                      Select Available Time Slot <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-1 text-center text-xs font-medium rounded-lg border transition-all ${
                            selectedSlot === slot
                              ? 'bg-primary border-primary text-white shadow-sm'
                              : 'bg-slate-50 border-gray-200 text-gray-700 hover:bg-slate-100'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Symptoms / Requests */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest">
                      Specific Symptoms or Requests
                    </label>
                    <textarea
                      placeholder="e.g. Sensitivity to hot/cold water, pain on top molar tooth or general cosmetics consultation."
                      rows={2}
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Form Submission */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary-container transition-all text-sm tracking-widest uppercase shadow-md flex items-center justify-center gap-2 hover:translate-y-[-1px]"
                  >
                    Confirm Booking Consultation
                  </button>
                </form>
              )}
            </motion.div>
          ) : (
            /* Manage / Look-up Tab */
            <motion.div
              key="manage-tab"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter patient name or phone number..."
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="flex-1 bg-slate-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => findAppointments(searchPhone)}
                  className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-container transition-all shadow-sm"
                >
                  Retrieve
                </button>
              </div>

              {searched && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-slate-800 border-b pb-2 flex justify-between items-center">
                    <span>Retrieved Direct Records ({myAppointments.length})</span>
                    {myAppointments.length > 0 && (
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-sans">
                        Auto-Synced (Local Devices)
                      </span>
                    )}
                  </h3>

                  {myAppointments.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-xl space-y-2">
                      <p className="font-semibold text-slate-700">No appointments found</p>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto px-4">
                        We could not match any dynamic slot bookings with that criteria. Ensure the registered text matches exactly.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {myAppointments.map(apt => (
                        <div 
                          key={apt.id}
                          className="bg-white border rounded-xl overflow-hidden border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
                        >
                          <div className="p-4 flex justify-between items-start gap-4">
                            <div className="space-y-1.5 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-serif font-bold text-slate-800 text-base">{apt.patientName}</span>
                                <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.2 rounded font-bold border border-green-100 uppercase tracking-widest">
                                  {apt.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 font-sans">
                                Phone Profile: <span className="text-slate-700 font-medium">{apt.phone}</span>
                              </p>
                              
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-2 text-xs border-t border-dashed border-slate-100 mt-2">
                                <div className="text-slate-600 font-medium">
                                  👩‍⚕️ Clinician: <span className="text-slate-800 font-semibold">{apt.dentistName}</span>
                                </div>
                                <div className="text-slate-600 font-medium">
                                  🦷 Service: <span className="text-slate-800 font-semibold">{apt.service}</span>
                                </div>
                                <div className="text-slate-600 font-medium col-span-2">
                                  📅 Scheduled: <span className="text-slate-900 font-bold">{apt.date}</span> at <span className="text-primary font-extrabold">{apt.slot}</span>
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => cancelAppointment(apt.id)}
                              className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors h-fit"
                              title="Cancel appointment request"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
