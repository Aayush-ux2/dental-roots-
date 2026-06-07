import { useState, useEffect, FormEvent } from 'react';
import { Star, MessageSquarePlus, User, Check } from 'lucide-react';
import { Review } from '../types';
import { initialReviews } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [username, setUsername] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync client-side reviews to initial static database + localStorage
  useEffect(() => {
    const localReviews = localStorage.getItem('dental_roots_reviews');
    if (localReviews) {
      setReviews(JSON.parse(localReviews));
    } else {
      localStorage.setItem('dental_roots_reviews', JSON.stringify(initialReviews));
      setReviews(initialReviews);
    }
  }, []);

  // Compute live averages
  const overallAverage = reviews.length > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const sumRatings = reviews.length;

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !userComment.trim()) {
      alert('Please fill out your name and the comment description.');
      return;
    }

    const newRev: Review = {
      id: 'rev-' + Math.random().toString(36).substr(2, 9),
      name: username.trim(),
      rating: userRating,
      comment: userComment.trim(),
      date: new Date().toISOString().split('T')[0],
      isCustom: true
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem('dental_roots_reviews', JSON.stringify(updated));

    setSubmitted(true);
    setUsername('');
    setUserComment('');
    setUserRating(5);

    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <section className="bg-primary py-20 px-4 select-none relative overflow-hidden text-white" id="testimonials">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0,0 L100,0 L100,100 Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Stats */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[12px] bg-white/20 border border-white/20 text-white font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
              Trust &amp; Clinical Excellence
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
              Your Smile, <br />Our Absolute Success
            </h2>
            
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-amber-300 text-amber-300" />
                  ))}
                </div>
                <p className="text-[13px] font-sans font-medium text-white/90">
                  Perfect <span className="font-extrabold">{overallAverage} ({sumRatings} Reviews)</span>
                </p>
              </div>
              
              <div className="w-[1px] h-10 bg-white/20 hidden sm:block"></div>
              
              <div className="space-y-0.5">
                <p className="text-lg font-bold font-serif">Open 7 Days</p>
                <p className="text-xs text-blue-100 font-sans">Daily 9:00 AM – 7:00 PM</p>
              </div>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 bg-white text-primary px-5 py-3 rounded-lg font-sans font-semibold text-sm hover:bg-slate-100 transition-all shadow-md group hover:translate-y-[-1px]"
            >
              <MessageSquarePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Write Patient Review
            </button>
          </div>

          {/* Right Column Reviews & Slide-in active Review composer */}
          <div className="lg:col-span-8 relative min-h-[350px]">
            <AnimatePresence mode="wait">
              {showForm ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-serif text-xl font-bold text-white">Leave Clinic Testimonial</h3>
                    <button 
                      onClick={() => setShowForm(false)} 
                      className="text-white/60 hover:text-white text-xs bg-white/10 px-2.5 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>

                  {submitted ? (
                    <div className="py-12 text-center space-y-3">
                      <div className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <Check className="w-6 h-6" />
                      </div>
                      <p className="font-serif font-bold text-lg">Thank You!</p>
                      <p className="text-xs text-white/80 max-w-xs mx-auto">
                        Your honest testimonial has been saved and is now averaged live in our patient charts.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] uppercase font-bold tracking-wider text-white/80">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Suman Shakya"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white focus:bg-white/20 placeholder-white/40"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] uppercase font-bold tracking-wider text-white/80">
                            Rating Scale : <span className="font-semibold text-amber-300">{userRating} / 5 Stars</span>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            value={userRating}
                            onChange={(e) => setUserRating(Number(e.target.value))}
                            className="w-full text-primary mt-3 accent-amber-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-white/80">
                          Treatment Experience Detail
                        </label>
                        <textarea
                          required
                          placeholder="Tell potential patients in Kathmandu about your clinical hygiene, dentist expertise, or service comfort..."
                          rows={3}
                          value={userComment}
                          onChange={(e) => setUserComment(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm focus:outline-none focus:border-white focus:bg-white/20 placeholder-white/40 resize-none font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-white text-primary font-bold rounded-lg hover:bg-slate-100 transition-all text-xs tracking-widest uppercase shadow-md"
                      >
                        Publish Live Testimonial
                      </button>
                    </form>
                  )}
                </motion.div>
              ) : (
                /* Static / Horizontal test slider cards with staggered delays */
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="max-h-[350px] overflow-y-auto pr-1 space-y-4 scrollbar-thin scrollbar-thumb-white/20">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 transition-all text-white relative shadow-xs"
                      >
                        {/* Rating stars */}
                        <div className="flex items-center gap-0.5 justify-start mb-2.5">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                          ))}
                        </div>

                        <p className="italic font-normal font-sans leading-relaxed text-slate-100 text-[15px] mb-4">
                          &ldquo;{rev.comment}&rdquo;
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-sm select-none">
                            {rev.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-white">{rev.name}</p>
                            <p className="text-[10px] text-white/60 font-sans tracking-wide">
                              verified patient &bull; {rev.date}
                            </p>
                          </div>
                        </div>

                        {rev.isCustom && (
                          <span className="absolute top-4 right-4 text-[9px] bg-slate-50 text-slate-700 px-1.5 py-0.2 rounded-full font-bold shadow-xs">
                            Active User Comment
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
