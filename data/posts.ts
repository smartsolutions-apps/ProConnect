import { Post } from '../types';
import { USERS } from './users';
import { COMPANIES } from './companies';

const BRANDFETCH_CLIENT_ID = "1idiSqP5yegNdsQZndZ";

export const POSTS: Post[] = [
  // --- EXISTING SOCIAL POSTS ---
  {
    id: 'p1',
    authorId: USERS[2].id,
    authorName: 'Ahmed Hassan',
    authorHeadline: 'Civil Engineer at Orascom',
    authorAvatar: 'https://i.pravatar.cc/150?u=ahmed',
    content: 'Just finished the marathon at the Pyramids! 🏃‍♂️🇪🇬 The energy was absolutely electric today.',
    imageUrl: "https://images.unsplash.com/photo-1539650116455-251d932549d4?auto=format&fit=crop&w=800&q=80",
    likes: 245,
    comments: 32,
    timestamp: "2h ago"
  },

  // --- REAL ESTATE SOCIAL PULSE ---
  {
    id: 'p_re_1',
    authorId: 'u_broker_1',
    authorName: 'Mostafa El-Naggar',
    authorHeadline: 'Elite Broker @ RE/MAX',
    authorAvatar: 'https://i.pravatar.cc/150?u=mostafa',
    content: 'Just closed a 50M EGP villa in Marassi! The secondary market in North Coast is absolutely on fire right now. If you are looking for ROI-positive investments, DM me for my private list. 🔥 #RealEstateEgypt #NorthCoast',
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    likes: 1204,
    comments: 89,
    timestamp: "30m ago"
  },
  {
    id: 'p_re_hassan_allam',
    authorId: 'u_re_expert',
    authorName: 'Sherif Fawzy',
    authorHeadline: 'Investment Consultant',
    authorAvatar: 'https://i.pravatar.cc/150?u=sherif',
    content: 'Hassan Allam just dropped the master plan for their new North Coast project. The layout looks incredible—huge focus on lagoons and low-density housing. Who has the brochure? I need to share it with my VIP clients.',
    likes: 45,
    comments: 12,
    timestamp: "1h ago"
  },
  {
    id: 'p_re_misr_italia',
    authorId: 'u_broker_3',
    authorName: 'Yasmine Ali',
    authorHeadline: 'Sales Manager @ Nawy',
    authorAvatar: 'https://i.pravatar.cc/150?u=yasmine',
    content: 'Misr Italia Properties is launching a new phase in IL Bosco New Capital. 8-year payment plans are still available. Great opportunity for first-time investors looking to enter the market.',
    likes: 89,
    comments: 4,
    timestamp: "3h ago"
  },
  {
    id: 'p_re_waterway',
    authorId: 'u_broker_4',
    authorName: 'Karim Ahmed',
    authorHeadline: 'Senior Advisor @ The Address',
    authorAvatar: 'https://i.pravatar.cc/150?u=karim',
    content: 'The Waterway developments always set a high bar for luxury. Just did a site visit at W-East and the finishing quality is unmatched. Fifth Settlement stays strong!',
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    likes: 230,
    comments: 15,
    timestamp: "5h ago"
  },
  {
    id: 'p_re_2',
    authorId: 'u_dev_1',
    authorName: 'Mountain View Official',
    authorHeadline: 'Leading Developer',
    authorAvatar: `https://cdn.brandfetch.io/domain/mountainviewegypt.com?c=${BRANDFETCH_CLIENT_ID}`,
    content: 'Spreading happiness at iCity New Cairo. Watch our latest handover ceremony as 50 families move into their dream homes today! 🏘️✨',
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    likes: 856,
    comments: 42,
    timestamp: "4h ago"
  },
  {
    id: 'p_re_3',
    authorId: 'u_broker_2',
    authorName: 'Laila Mourad',
    authorHeadline: 'Senior Consultant @ Nawy',
    authorAvatar: 'https://i.pravatar.cc/150?u=laila_re',
    content: 'A question for my fellow brokers: Are you seeing a shift towards the New Capital or is Fifth Settlement still king for your high-net-worth clients? 🏛️🤔',
    likes: 89,
    comments: 134,
    timestamp: "6h ago"
  }
];