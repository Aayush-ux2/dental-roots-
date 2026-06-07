import { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Phone, Clock, Star, Award, Shield, 
  ShieldCheck, Heart, Smile, Menu, X, ChevronRight, Info, Users, 
  Sparkles, Stethoscope, Mail, ThumbsUp, Activity, HelpCircle
} from 'lucide-react';
import { services, dentists, patientInfoChecklists } from './data';
import { Service } from './types';
import BookingModal from './components/BookingModal';
import ReviewsSection from './components/ReviewsSection';
import ServiceDetailModal from './components/ServiceDetailModal';
import DirectionsCalculator from './components/DirectionsCalculator';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Booking overlay state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activePreselectedService, setActivePreselectedService] = useState<string | undefined>(undefined);

  // Service detail overlay state
  const [activeServiceDetail, setActiveServiceDetail] = useState<Service | null>(null);

  // Active Specialist index slider state
  const [selectedDentistId, setSelectedDentistId] = useState(dentists[0].id);

  // Mobile menu open / close toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic FAQ Accordion state
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | null>(0);

  // Pre-selected service selection logic
  const handleBookDirect = (serviceId: string) => {
    setActivePreselectedService(serviceId);
    setActiveServiceDetail(null);
    setIsBookingOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setActivePreselectedService(undefined);
    setIsBookingOpen(true);
  };

  // Scroll Helper
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeSpecialist = dentists.find(d => d.id === selectedDentistId) || dentists[0];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 relative selection:bg-primary/20">
      
      {/* 1. Header & Navigation (Fixed glassmorphic navbar) */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/90 backdrop-blur-md shadow-xs border-b border-gray-100 transition-all duration-300">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
          
          {/* Clinic Brand */}
          <a onClick={() => scrollToSection('hero')} className="flex items-center gap-2.5 cursor-pointer group">
            <div className="bg-primary text-white p-1 rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-2xl font-bold select-none block">verified_user</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-extrabold text-lg leading-tight text-primary flex items-center gap-1">
                Dental Roots
              </span>
              <span className="text-[10px] text-slate-400 font-sans font-bold tracking-widest uppercase -mt-0.5">
                Clinical Excellence
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-primary hover:text-primary-container border-b-2 border-primary pb-0.5 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-slate-600 hover:text-primary transition-colors cursor-pointer"
            >
              About Clinic
            </button>
            <button 
              onClick={() => scrollToSection('specialties')}
              className="text-slate-600 hover:text-primary transition-colors cursor-pointer"
            >
              Specialized Services
            </button>
            <button 
              onClick={() => scrollToSection('patient-info')}
              className="text-slate-600 hover:text-primary transition-colors cursor-pointer"
            >
              Patient Info
            </button>
            <button 
              onClick={() => scrollToSection('location')}
              className="text-slate-600 hover:text-primary transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </nav>

          {/* Action Call Header */}
          <div className="hidden sm:flex items-center gap-4">
            <a href="tel:+9779705261457" className="text-xs text-right font-medium text-slate-500 hover:text-slate-900 transition-colors hidden xl:block">
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Emergency Relief</p>
              <p className="font-extrabold text-primary">+977 970-5261457</p>
            </a>
            
            <button 
              onClick={handleOpenGeneralBooking}
              className="bg-primary text-white hover:bg-primary-container px-6 py-2.5 rounded-lg font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-sm hover:translate-y-[-1px]"
              id="header-book-appointment"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-slate-600 p-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-150 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col text-sm font-semibold">
                <button onClick={() => scrollToSection('hero')} className="text-left text-primary pb-1.5 border-b border-slate-100 cursor-pointer">Home</button>
                <button onClick={() => scrollToSection('about')} className="text-left text-slate-600 pb-1.5 border-b border-slate-100 cursor-pointer">About Clinic</button>
                <button onClick={() => scrollToSection('specialties')} className="text-left text-slate-600 pb-1.5 border-b border-slate-100 cursor-pointer">Specialized Services</button>
                <button onClick={() => scrollToSection('patient-info')} className="text-left text-slate-600 pb-1.5 border-b border-slate-100 cursor-pointer">Patient Info</button>
                <button onClick={() => scrollToSection('location')} className="text-left text-slate-600 pb-1.5 border-b border-slate-100 cursor-pointer">Contact &amp; Map</button>

                <div className="pt-2 flex flex-col gap-3">
                  <a href="tel:+9779705261457" className="text-xs text-center py-2 bg-slate-50 border rounded-lg text-primary font-bold">
                    Call Emergency: +977 970-5261457
                  </a>
                  <button 
                    onClick={handleOpenGeneralBooking}
                    className="w-full bg-primary text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Request Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero / Welcome Banner */}
      <section className="relative min-h-[85vh] flex items-center bg-slate-100 overflow-hidden pt-16" id="hero">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Dental Roots Clinic Interior" 
            className="w-full h-full object-cover placeholder-opacity-50 filter brightness-[0.98]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL1OC7DoskSJChyYCJ8Dc0X5K5_-Vvj5NNgTcJ3oeXT8a7TYPh9aKnknY0bAKrIGGESqm-RqnQSH1xZ1Bx2dmcudnl1gDcm4TCOr0mRm5alBc6sozH4L6O9js-5L5pSg6JiEAamQYAsipyR43iQlKrCJTsDNfNQLvitas45z1cCTER2LP3QDQ1tMhqpPiLzGivHPsDCnX40TQE12_62IR0py4Gg98cqq5tKio-oEUDqUX8R1DbLANSbN2zJRGerSX8TYaqegjwPA"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 hero-overlay"></div>
        </div>

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 md:px-8 w-full">
          <div className="max-w-2xl space-y-6 md:space-y-8 text-left">
            <span className="inline-flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-widest bg-blue-100/60 backdrop-blur-md px-3 py-1 rounded-full border border-blue-200">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              Your Oral Health Catalyst
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-primary font-bold leading-[1.1] tracking-tight">
              Your Journey to a Confident, <br className="hidden md:block" />
              Healthy Smile Begins Here.
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Experience gentle, world-class dental care right in the heart of Kathmandu. At Dental Roots, your comfort is our absolute, priority.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={handleOpenGeneralBooking}
                className="bg-primary hover:bg-primary-container text-white px-8 py-3.5 rounded-lg font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-lg text-center hover:translate-y-[-1px]"
                id="hero-schedule-visit"
              >
                Schedule Your Visit
              </button>
              <button 
                onClick={() => scrollToSection('specialties')}
                className="border-2 border-primary text-primary px-8 py-3.5 rounded-lg font-sans font-semibold text-xs tracking-wider uppercase hover:bg-primary/5 transition-all text-center"
              >
                Explore Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Section (Welcome + Specialized doctors highlights tab) */}
      <section className="py-24 max-w-[1240px] mx-auto px-4 md:px-8" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column grid of clinician selection photo + floating badge */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-slate-200 border-2 border-white">
              <img 
                alt="Kind dentist and smiling patient in clean office environment" 
                className="w-full h-full object-cover object-center" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3_0McZQ-XvDzg3zkgHgTcEEEgEALC5kbpmwRuyPahOlUYqpwPdbRta5kcw39OCb-samLcmkIaGqvlYwAOOcOVivvl1AckQC17b3u_vtvtyL7apEkGe4TF3IYzdDKPIEcPgswjzjwR24oyZRpwn9T_fnKXXXdgAm2GwUSoU2zjP7FLaabQKAd9Z6WfMqDwwiMI1PKt0T0uQyJv-jTKem-4Hj_Kwg7mslEI2cTY447YhaDCHtAwDqustVWZpqUeiKN0UettltyTzA"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Float badge */}
            <div className="absolute -bottom-6 -right-4 bg-white px-6 py-4 rounded-xl shadow-lg border border-slate-100 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="text-primary bg-blue-50 p-2.5 rounded-lg">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-serif font-black text-xl text-primary leading-tight">15+ Years</p>
                  <p className="font-sans font-bold text-[10px] text-gray-400 uppercase tracking-widest">Excellence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column welcoming description and clinical items */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs text-primary font-bold uppercase tracking-widest block">
                About Our Clinic
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Welcome to Dental Roots
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                Where cutting-edge dental technology meets compassionate care. We understand that visiting the dentist can bring anxiety, which is why we have meticulously designed our practice to be a serene, welcoming sanctuary. Our team of experienced professionals is dedicated to preserving your natural smile through preventative, restorative, and cosmetic dentistry tailored uniquely to you.
              </p>
            </div>

            {/* Static Key Lists with Material icons */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg h-fit flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl font-bold select-none">volunteer_activism</span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-slate-800 text-sm">Patient-First Philosophy</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">We take the time to listen to your concerns and explain every procedure clearly with absolute patient comfort.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg h-fit flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl font-bold select-none">biotech</span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-slate-800 text-sm">Modern Environment</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Equipped with contemporary digital x-rays, dental implants, and micro-lasers to ensure precise and pain-free treatments.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg h-fit flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl font-bold select-none">sanitizer</span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-slate-800 text-sm">Sterilization Excellence</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Adhering to strict international safety, autoclave packaging, and chemical monitoring protocols for patient peace of mind.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialist Showcase Sub-section (Dynamic Doctor Profiles Interactive Tab) */}
        <div className="mt-20 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8">
          <div className="max-w-xl text-left space-y-2 mb-8">
            <span className="text-[10px] text-accent-teal uppercase font-black tracking-widest block">In-House Professionals</span>
            <h3 className="text-2xl font-bold font-serif text-slate-900 tracking-tight">Meet Kathmandu's Top Medical Team</h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              Dental Roots is managed by senior board-certified micro-dentists. Switch between specialist profiles to verify their expert experience:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* List Tab buttons left */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {dentists.map((dent) => (
                <button
                  key={dent.id}
                  onClick={() => setSelectedDentistId(dent.id)}
                  className={`p-4 rounded-xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
                    selectedDentistId === dent.id
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100/50'
                  }`}
                >
                  <img
                    src={dent.avatar}
                    alt={dent.name}
                    className="w-10 h-10 rounded-full object-cover border"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`font-serif font-bold text-sm ${selectedDentistId === dent.id ? 'text-white' : 'text-slate-800'}`}>
                      {dent.name}
                    </p>
                    <p className={`text-[10px] truncate ${selectedDentistId === dent.id ? 'text-blue-100' : 'text-slate-500'}`}>
                      {dent.role.split(' & ')[0]}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              ))}
            </div>

            {/* Content card right */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
              <img
                src={activeSpecialist.avatar}
                alt={activeSpecialist.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover shadow-sm bg-slate-200 border"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-3 text-left flex-1">
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded text-[10px] font-bold border border-amber-100">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  {activeSpecialist.rating.toFixed(1)} Specialist Rating
                </span>
                <div>
                  <h4 className="font-serif font-bold text-xl text-slate-900 leading-tight">
                    {activeSpecialist.name}
                  </h4>
                  <p className="text-xs text-primary font-bold">{activeSpecialist.role}</p>
                </div>
                <p className="text-xs leading-relaxed text-slate-500 font-sans border-t pt-3 border-slate-100 font-normal">
                  {activeSpecialist.bio}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActivePreselectedService(undefined);
                      setIsBookingOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-black hover:text-primary-container transition-all group"
                  >
                    <span>Request Visit Slot with {activeSpecialist.name.split(' ')[1]}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Specialties / Services Grid */}
      <section className="py-24 bg-slate-100" id="specialties">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs text-primary font-bold uppercase tracking-widest block">
              Dentistry Specialties
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Our Specialized Services
            </h2>
            <p className="text-sm text-slate-500 font-sans">
              World-class, biological dental solutions centered around Kathmandu patient safety and smile aesthetics.
            </p>
          </div>

          {/* Grid Layout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv) => (
              <div 
                key={srv.id}
                role="button"
                onClick={() => setActiveServiceDetail(srv)}
                className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/60 hover:shadow-md hover:border-slate-300 transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Rounded Medical Icon box */}
                  <div className="w-12 h-12 bg-slate-50 text-primary border rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                    <span className="material-symbols-outlined text-2xl font-bold select-none">{srv.IconName}</span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {srv.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 mt-6 flex items-center justify-between text-xs font-bold text-primary">
                  <span>Explore Protocol</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Direct Reviews Section */}
      <ReviewsSection />

      {/* 6. Patient Guidelines Accordion (Patient Info) */}
      <section className="py-24 max-w-[1240px] mx-auto px-4 md:px-8 text-left" id="patient-info">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs text-primary font-bold uppercase tracking-widest block">Patient Handbook</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Need-to-know Clinical Guidelines</h2>
            <p className="text-sm text-slate-500 font-sans leading-relaxed">
              We value clarity and safety. Review our first-time visit preparatives or sterilizing procedures below to guarantee complete peace of mind:
            </p>
            
            <div className="bg-slate-100 p-4 rounded-xl border flex items-start gap-2.5">
              <HelpCircle className="w-5 h-5 text-accent-teal shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Our Kathmandu reception is open 7 days a week. Feel free to contact our senior front-desk at <a href="mailto:contact@dentalroots.com" className="text-primary font-bold underline">dentalroots.bizz.st</a> for advanced procedural accommodations.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {patientInfoChecklists.map((list, idx) => (
              <div 
                key={idx}
                className="bg-white border rounded-xl overflow-hidden shadow-xs hover:border-slate-350 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenAccordionIdx(openAccordionIdx === idx ? null : idx)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 text-left font-serif font-bold text-base text-slate-800 transition-colors cursor-pointer"
                >
                  <span>{list.title}</span>
                  <span className="material-symbols-outlined select-none text-slate-400 font-bold transition-transform duration-200 transform">
                    {openAccordionIdx === idx ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openAccordionIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-100"
                    >
                      <div className="p-6 space-y-3">
                        {list.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex gap-3 items-start text-xs select-none">
                            <div className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center font-sans font-bold text-[10px] shrink-0 mt-0.5">
                              {itemIdx + 1}
                            </div>
                            <p className="text-slate-600 font-medium leading-relaxed font-sans">{item}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Map & Directions Sector (Location) */}
      <section className="h-[520px] relative bg-slate-100" id="location">
        <div className="absolute inset-0 grayscale contrast-[0.95] hover:grayscale-0 transition-all duration-700">
          <img 
            alt="Kathmandu clinical location maps interface" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAANpQ5Th3yTXfNZjsedkhkVTgbYf7zRLQrkKFRFWVJafvAXeDO1LnlgmxLyA9W91QJd-ngVt28c8V3EUefiuXJq2ukDhHEiy3DiSCicTXEbvvBMPx-FWH_gRfBDHKtXfKdaiDDK5eZooobhWKMpS0ex7N3UJ2zdZ3QiDXzOIFdBkN4iHxaRbWPPDDOKzoGmNin5pJfld4j9qh3zv0mnhLLgInrqe0c5TuPGgDowcjjT7dbYbyjX9edyrK_zdT-nMpReLwaksG0Og"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Floating Travel Guide & Directions widgets centered together */}
        <div className="absolute inset-x-0 bottom-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-10 max-w-[1240px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 pointer-events-none">
          
          {/* Card left: Directions Calculator */}
          <div className="pointer-events-auto">
            <DirectionsCalculator />
          </div>

          {/* Card right: Original Google location card */}
          <div className="bg-white p-5 rounded-xl shadow-2xl flex items-center gap-3 border pointer-events-auto max-w-xs w-full animate-bounce mt-4 md:mt-0">
            <span className="material-symbols-outlined text-primary text-3xl font-bold select-none bg-blue-50 p-2 rounded-lg">
              location_on
            </span>
            <div>
              <p className="font-serif font-black text-slate-800 text-sm">Dental Roots Clinic</p>
              <p className="text-[11px] text-gray-500 font-sans mt-0.5">Bus Lane, Kathmandu 44600</p>
              <p className="text-[10px] text-primary font-bold font-sans tracking-wide uppercase mt-1">
                Open Daily &bull; Kathmandu, Nepal
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Elegant Footer */}
      <footer className="bg-slate-900 py-16 text-slate-400 border-t border-slate-800 text-left">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            
            {/* Column 1 Branding */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-primary text-2xl font-bold select-none p-1 bg-white/10 rounded">
                  verified_user
                </span>
                <span className="font-serif font-black text-lg">Dental Roots</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Providing premium state-of-the-art dental care with autoclaved safety, micro-dentistry technology, and comfortable sedation in Kathmandu.
              </p>
            </div>

            {/* Column 2 Contacts */}
            <div className="space-y-4">
              <h4 className="font-sans font-bold text-xs uppercase text-white tracking-widest">
                Contact Office
              </h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary font-bold text-base select-none">phone</span>
                  <a href="tel:+9779705261457" className="hover:text-white transition-colors">+977 970-5261457</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary font-bold text-base select-none">public</span>
                  <a href="http://dentalroots.bizz.st" target="_blank" rel="norereferrer" className="hover:text-white transition-colors">dentalroots.bizz.st</a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary font-bold text-base select-none">place</span>
                  <span>Bus Lane, Kathmandu 44600, Nepal</span>
                </li>
              </ul>
            </div>

            {/* Column 3 Working Hours */}
            <div className="space-y-4">
              <h4 className="font-sans font-bold text-xs uppercase text-white tracking-widest">
                Opening Hours
              </h4>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span>Mon – Sun</span>
                  <span className="font-bold text-white">9:00 AM – 7:00 PM</span>
                </li>
                <li className="text-[10px] text-slate-500 leading-relaxed italic">
                  Available daily, including public holidays, to ensure rapid care.
                </li>
              </ul>
            </div>

            {/* Column 4 Internal Resources */}
            <div className="space-y-4">
              <h4 className="font-sans font-bold text-xs uppercase text-white tracking-widest">
                Clinical Resources
              </h4>
              <nav className="flex flex-col gap-2.5 text-xs">
                <button onClick={() => scrollToSection('patient-info')} className="text-left hover:text-white transition-colors cursor-pointer">
                  Patient Preparation Checklist
                </button>
                <button onClick={() => scrollToSection('specialties')} className="text-left hover:text-white transition-colors cursor-pointer">
                  Autoclave Autosterility Protocol
                </button>
                <button onClick={() => scrollToSection('about')} className="text-left hover:text-white transition-colors cursor-pointer">
                  World-Class Micro-Laser Treatments
                </button>
              </nav>
            </div>

          </div>

          {/* Copyright section */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; 2026 Dental Roots Clinic Kathmandu. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 block">
                World-class Smile Architects
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* 9. Booking trigger modals overlays */}
      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
            preSelectedServiceId={activePreselectedService}
          />
        )}
      </AnimatePresence>

      {/* 10. Service detail detailer overlay modals */}
      <AnimatePresence>
        {activeServiceDetail && (
          <ServiceDetailModal
            service={activeServiceDetail}
            onClose={() => setActiveServiceDetail(null)}
            onBookDirect={handleBookDirect}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
