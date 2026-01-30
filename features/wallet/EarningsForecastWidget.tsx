
import React from 'react';
import { TrendingUp, AlertCircle, Calendar, DollarSign, Info } from 'lucide-react';

interface WeeklyForecast {
  week: string;
  confirmed: number; // Booked shifts
  potential: number; // Estimated based on demand
  isHighDemand?: boolean;
}

const FORECAST_DATA: WeeklyForecast[] = [
  { week: 'Nov 1-7', confirmed: 1500, potential: 500, isHighDemand: false },
  { week: 'Nov 8-14', confirmed: 1000, potential: 1200, isHighDemand: false },
  { week: 'Nov 15-21', confirmed: 2000, potential: 3500, isHighDemand: true }, // Cairo ICT Surge
  { week: 'Nov 22-28', confirmed: 0, potential: 2000, isHighDemand: false },
];

export const EarningsForecastWidget: React.FC = () => {
  const totalProjected = FORECAST_DATA.reduce((acc, w) => acc + w.confirmed + w.potential, 0);
  const maxVal = Math.max(...FORECAST_DATA.map(w => w.confirmed + w.potential)) * 1.1;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp size={20} className="text-brand-600" />
            Income Forecast
          </h3>
          <p className="text-sm text-gray-500">Based on your reliability score (96%) and seasonal demand.</p>
        </div>
        <div className="bg-brand-50 px-4 py-2 rounded-xl text-right">
          <p className="text-xs font-bold text-brand-600 uppercase tracking-wider">Projected (Nov)</p>
          <p className="text-xl font-black text-brand-900">EGP {totalProjected.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex items-end justify-between h-48 gap-2 sm:gap-4 mb-6 px-2">
        {FORECAST_DATA.map((week, idx) => {
          const confirmedHeight = (week.confirmed / maxVal) * 100;
          const potentialHeight = (week.potential / maxVal) * 100;
          
          return (
            <div key={idx} className="flex-1 flex flex-col justify-end group cursor-help relative">
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center shadow-xl">
                <p className="font-bold mb-1">{week.week}</p>
                <div className="flex justify-between text-gray-300">
                    <span>Booked:</span> <span>{week.confirmed}</span>
                </div>
                <div className="flex justify-between text-brand-200">
                    <span>Potential:</span> <span>{week.potential}</span>
                </div>
              </div>

              {/* Bars */}
              <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden flex flex-col justify-end transition-all hover:brightness-95">
                {/* High Demand Indicator */}
                {week.isHighDemand && (
                    <div className="absolute top-0 inset-x-0 h-full bg-yellow-50/50 flex flex-col items-center pt-2">
                        <div className="animate-bounce">
                            <span className="text-[10px] font-bold text-yellow-600 bg-yellow-100 px-1.5 py-0.5 rounded-full border border-yellow-200">
                                🔥 HIGH DEMAND
                            </span>
                        </div>
                    </div>
                )}

                {/* Potential Segment (Top) */}
                <div 
                    className="w-full bg-brand-200/50 pattern-diagonal-lines-sm text-center relative border-t border-brand-100 transition-all duration-500 ease-out"
                    style={{ height: `${potentialHeight}%` }}
                >
                </div>
                
                {/* Confirmed Segment (Bottom) */}
                <div 
                    className={`w-full transition-all duration-500 ease-out flex items-end justify-center ${week.isHighDemand ? 'bg-yellow-500' : 'bg-brand-600'}`}
                    style={{ height: `${confirmedHeight}%` }}
                >
                    {week.confirmed > 0 && (
                        <span className="text-[10px] font-bold text-white/90 mb-1 hidden sm:block">
                            {week.confirmed >= 1000 ? `${(week.confirmed/1000).toFixed(1)}k` : week.confirmed}
                        </span>
                    )}
                </div>
              </div>
              
              {/* X-Axis Label */}
              <p className="text-center text-xs font-bold text-gray-500 mt-3">{week.week}</p>
            </div>
          );
        })}
      </div>

      {/* Insights / Legend */}
      <div className="bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row gap-4 text-sm">
         <div className="flex items-start gap-2 flex-1">
            <div className="p-1 bg-brand-100 rounded text-brand-600 mt-0.5"><DollarSign size={14}/></div>
            <div>
                <span className="font-bold text-gray-900 block">Stability Tip</span>
                <span className="text-gray-500">
                    Week 3 is peak season (Cairo ICT). Apply for "Standby" shifts to capture potential surge pricing (+50%).
                </span>
            </div>
         </div>
         <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-brand-600 rounded-sm"></div>
                <span className="text-xs text-gray-600">Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-brand-200 rounded-sm pattern-diagonal-lines-sm"></div>
                <span className="text-xs text-gray-600">Potential</span>
            </div>
         </div>
      </div>
    </div>
  );
};
