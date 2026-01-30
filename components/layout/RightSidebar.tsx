import React from 'react';

export const RightSidebar: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24">
      <h3 className="text-sm font-bold text-gray-900 mb-4">Add to your feed</h3>
      <div className="space-y-4">
        {[
          { name: "Wuzzuf", type: "Company" },
          { name: "Ministry of Comm.", type: "Government" },
          { name: "RiseUp Summit", type: "Event" }
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-500">{item.type}</p>
              <button className="mt-2 text-brand-600 border border-brand-600 rounded-full px-3 py-1 text-xs font-semibold hover:bg-brand-50 transition-colors">
                + Follow
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
        ProConnect Egypt © 2024
      </div>
    </div>
  );
};