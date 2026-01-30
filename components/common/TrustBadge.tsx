
import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

interface TrustBadgeProps {
  completed: number;
  booked: number;
  size?: 'sm' | 'md' | 'lg';
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ completed, booked, size = 'md' }) => {
  // Guard against division by zero
  const score = booked === 0 ? 0 : Math.round((completed / booked) * 100);

  // Determine Tier
  let tier: 'ELITE' | 'RELIABLE' | 'RISK' | 'NEW' = 'NEW';
  if (booked > 0) {
    if (score >= 95) tier = 'ELITE';
    else if (score >= 80) tier = 'RELIABLE';
    else tier = 'RISK';
  }

  // Styles Map
  const styles = {
    ELITE: {
      bg: 'bg-gradient-to-r from-amber-100 to-yellow-100',
      text: 'text-amber-800',
      border: 'border-amber-200',
      icon: <ShieldCheck className="fill-amber-500 text-white" size={size === 'lg' ? 24 : size === 'md' ? 18 : 14} />,
      label: 'Elite Promoter'
    },
    RELIABLE: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      icon: <CheckCircle2 className="text-green-600" size={size === 'lg' ? 24 : size === 'md' ? 18 : 14} />,
      label: 'Reliable'
    },
    RISK: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      icon: <ShieldAlert className="text-red-600" size={size === 'lg' ? 24 : size === 'md' ? 18 : 14} />,
      label: 'High Risk'
    },
    NEW: {
      bg: 'bg-gray-50',
      text: 'text-gray-600',
      border: 'border-gray-200',
      icon: <ShieldCheck className="text-gray-400" size={size === 'lg' ? 24 : size === 'md' ? 18 : 14} />,
      label: 'Newcomer'
    }
  };

  const currentStyle = styles[tier];
  const sizeClasses = size === 'lg' ? 'px-4 py-2 text-base' : size === 'md' ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs';

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border shadow-sm ${currentStyle.bg} ${currentStyle.border} ${sizeClasses}`}>
      {currentStyle.icon}
      <div>
        <p className={`font-bold ${currentStyle.text} leading-none`}>
          {currentStyle.label}
        </p>
        {booked > 0 && (
          <p className="text-[10px] opacity-80 font-medium leading-none mt-0.5">
             {score}% Reliability ({completed}/{booked} shifts)
          </p>
        )}
      </div>
    </div>
  );
};
