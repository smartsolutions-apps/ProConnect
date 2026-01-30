
import { CareerLevel } from '../types';
import { Shield, Zap, Crown, Briefcase, Star } from 'lucide-react';

export interface LevelConfig {
  id: CareerLevel;
  label: string;
  icon: any;
  color: string;
  requirements: {
    shifts: number;
    rating: number;
    reliability: number;
  };
  perks: string[];
  nextLevel?: CareerLevel;
}

export const CAREER_LEVELS: Record<CareerLevel, LevelConfig> = {
  STARTER: {
    id: 'STARTER',
    label: 'Starter',
    icon: Briefcase,
    color: 'text-gray-600 bg-gray-100 border-gray-200',
    requirements: { shifts: 0, rating: 0, reliability: 0 },
    perks: ['Access to Standard Shifts', 'Weekly Payouts'],
    nextLevel: 'EXPERIENCED'
  },
  EXPERIENCED: {
    id: 'EXPERIENCED',
    label: 'Experienced',
    icon: Shield,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    requirements: { shifts: 5, rating: 4.0, reliability: 80 },
    perks: ['Access to "Experienced" Filters', 'Priority Support', '+5% Base Pay'],
    nextLevel: 'LEAD'
  },
  LEAD: {
    id: 'LEAD',
    label: 'Team Lead',
    icon: Star,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    requirements: { shifts: 15, rating: 4.5, reliability: 90 },
    perks: ['Access to Supervisory Roles', 'Instant Payouts', '+15% Base Pay', 'Squad Leader Badge'],
    nextLevel: 'SUPERVISOR'
  },
  SUPERVISOR: {
    id: 'SUPERVISOR',
    label: 'Supervisor',
    icon: Zap,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    requirements: { shifts: 30, rating: 4.8, reliability: 95 },
    perks: ['Manage Teams (Earn Override)', 'Direct Chat with Event Ops', 'VIP Event Access'],
    nextLevel: 'EVENT_OPS'
  },
  EVENT_OPS: {
    id: 'EVENT_OPS',
    label: 'Event Ops',
    icon: Crown,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
    requirements: { shifts: 50, rating: 4.9, reliability: 98 },
    perks: ['Full-Time Offer Eligibility', 'Profit Sharing', 'Regional Management'],
    nextLevel: undefined
  }
};
