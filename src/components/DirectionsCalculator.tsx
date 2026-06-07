import { useState } from 'react';
import { MapPin, Navigation, Car, Bus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RouteDetail {
  timeByCar: string;
  timeByBus: string;
  recommendedTransport: string;
  routeHighlight: string;
  parkingTip: string;
}

const localRoutes: Record<string, RouteDetail> = {
  'thamel': {
    timeByCar: '15-20 mins',
    timeByBus: '25 mins',
    recommendedTransport: 'Pathao ride / Local Microbus from Kantipath',
    routeHighlight: 'Head south via Kantipath, take the Ring Road exit towards Satdobato, and proceed directly past Kathmandu bus-lane markings.',
    parkingTip: 'Complimentary two-wheeler parking available immediately in our front paved lane; limited basement slots.'
  },
  'lalitpur': {
    timeByCar: '10-15 mins',
    timeByBus: '20 mins',
    recommendedTransport: 'Sajha Yatayat Bus passing Jhamsikhel line',
    routeHighlight: 'Cross Bagmati bridge, follow Ring Road north-east, exit towards primary transit corridors.',
    parkingTip: 'Two-wheeler basement slots recommended during afternoon peaks.'
  },
  'gongabu': {
    timeByCar: '25-30 mins',
    timeByBus: '40 mins',
    recommendedTransport: 'Sajha Yatayat directly on the Ring Road',
    routeHighlight: 'Follow Ring Road south-east past Balaju, keep left towards primary Kathmandu bus terminal corridor.',
    parkingTip: 'We recommend arriving by scooter/Pathao or local bus to avoid heavy Ring Road traffic bottlenecks.'
  },
  'bhaktapur': {
    timeByCar: '35-45 mins',
    timeByBus: '60 mins',
    recommendedTransport: 'Express Microbus from Bhaktapur highway line',
    routeHighlight: 'Follow Araniko Highway past Koteshwor, take the exit and proceed directly around the Kathmandu bus-lane system.',
    parkingTip: 'Free reserved car parking space is provided on the western entrance of the clinic compound.'
  }
};

export default function DirectionsCalculator() {
  const [startPoint, setStartPoint] = useState<string>('thamel');
  const route = localRoutes[startPoint];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-lg font-sans max-w-sm w-full mx-auto md:mx-0">
      <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wider uppercase mb-4">
        <Navigation className="w-5 h-5 text-accent-teal animate-pulse" />
        <span>Kathmandu Travel Guide</span>
      </div>

      <p className="text-xs text-gray-500 mb-4 leading-relaxed">
        Select your starting Kathmandu hub to view tailored transport estimates, direct routes, and clinic parking recommendations:
      </p>

      {/* Select Start Base */}
      <div className="relative mb-5">
        <MapPin className="absolute left-3 top-3 w-4 h-4 text-primary" />
        <select
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none font-semibold text-slate-800"
        >
          <option value="thamel">From Thamel / Kantipath</option>
          <option value="lalitpur">From Lalitpur (Patan / Jhamsikhel)</option>
          <option value="gongabu">From Gongabu Ring Road Terminal</option>
          <option value="bhaktapur">From Bhaktapur Highway Line</option>
        </select>
      </div>

      {/* Route estimation cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={startPoint}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
          className="space-y-4 text-xs"
        >
          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border">
            <div className="flex items-center gap-2 text-slate-700">
              <Car className="w-4 h-4 text-primary" />
              <div>
                <p className="text-gray-400 font-medium scale-90 origin-left">By Taxi / Aligner</p>
                <p className="font-extrabold text-slate-800">{route.timeByCar}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-700 border-l pl-3">
              <Bus className="w-4 h-4 text-accent-teal" />
              <div>
                <p className="text-gray-400 font-medium scale-90 origin-left">By Local Bus</p>
                <p className="font-extrabold text-slate-800">{route.timeByBus}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <span className="font-bold text-slate-800">🚃 Recommended Transit:</span>
              <p className="text-gray-600 mt-0.5 leading-relaxed">{route.recommendedTransport}</p>
            </div>
            <div>
              <span className="font-bold text-slate-800">🧭 Direction Path:</span>
              <p className="text-gray-600 mt-0.5 leading-relaxed font-normal">{route.routeHighlight}</p>
            </div>
            <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-amber-800 block">Vehicular Parking Tip</span>
                <p className="text-amber-700 mt-0.5 font-normal leading-relaxed">{route.parkingTip}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
