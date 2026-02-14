
import { User, UserAvailability } from '../types';

export const USERS: User[] = [
  {
    id: "u_me",
    // Fix: Added slug property
    slug: "mohamed-ali",
    uid: "mohamed_123",
    email: "mohamed@emaar.com",
    name: "Mohamed Ali",
    role: "user", // Part of Claim Profile Architecture
    headline: "Lead Frontend Engineer @ Emaar",
    avatarUrl: "https://i.pravatar.cc/150?u=mohamed",
    location: "New Cairo, Cairo",
    university: "American University in Cairo (AUC)",
    skills: ["React", "TypeScript", "Node.js", "System Design"],
    verifiedSkills: ["TypeScript", "System Design"],
    workStyle: {
      leadership: 8,
      teamwork: 9,
      independence: 7,
      creativity: 8,
      logic: 9
    },
    availability: UserAvailability.OPEN_TO_OFFERS,
    salaryExpectations: {
      min: 55000,
      expected: 75000,
      currency: 'EGP',
      period: 'Monthly'
    },
    shiftsBooked: 45,
    shiftsCompleted: 44,
    careerLevel: 'LEAD',
    wallet: {
        balance: 12500,
        pending: 3500,
        history: []
    },
    gamification: {
      points: 2450,
      rank: 12,
      badges: ["Early Adopter", "Verified Expert"]
    },
    rating: 4.9
  },
  {
    id: "u2",
    // Fix: Added slug property
    slug: "sarah-el-sayed",
    name: "Sarah El-Sayed",
    role: "company_admin",
    managedCompanyId: "c1", // Claims Vodafone Egypt
    headline: "HR Director @ Vodafone Intelligent Solutions",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah_h",
    location: "Maadi, Cairo",
    skills: ["Recruitment", "Organizational Development"],
    rating: 5.0
  },
  {
    id: "u3",
    // Fix: Added slug property
    slug: "ahmed-hassan",
    name: "Ahmed Hassan",
    role: "user",
    headline: "Senior Civil Engineer @ Orascom",
    avatarUrl: "https://i.pravatar.cc/150?u=ahmed",
    location: "Sheikh Zayed, Giza",
    skills: ["Civil Engineering", "Project Management"],
    shiftsBooked: 30,
    shiftsCompleted: 28,
    careerLevel: 'EXPERIENCED',
    rating: 4.8
  },
  {
    id: "u4",
    // Fix: Added slug property
    slug: "laila-mourad",
    name: "Laila Mourad",
    role: "user",
    headline: "UX Designer & Researcher",
    avatarUrl: "https://i.pravatar.cc/150?u=laila",
    location: "Heliopolis, Cairo",
    skills: ["Figma", "UX Research", "Arabic (Native)"],
    shiftsBooked: 20,
    shiftsCompleted: 20,
    careerLevel: 'EXPERIENCED',
    rating: 4.9
  },
  {
    id: "u_admin",
    // Fix: Added slug property
    slug: "system-super-admin",
    name: "System Super Admin",
    role: "super_admin",
    headline: "Platform Operations Control",
    avatarUrl: "https://i.pravatar.cc/150?u=admin",
    location: "New Cairo",
    skills: ["System Administration", "Data Operations"],
  },
  {
    id: "u5",
    // Fix: Added slug property
    slug: "omar-sharif",
    name: "Omar Sharif",
    role: "user",
    headline: "Full Stack Developer",
    avatarUrl: "https://i.pravatar.cc/150?u=omar",
    location: "Zamalek, Cairo",
    skills: ["React", "Node.js", "MongoDB"],
    shiftsBooked: 15,
    shiftsCompleted: 14,
    careerLevel: 'EXPERIENCED',
    rating: 4.7
  },
  {
    id: "u6",
    // Fix: Added slug property
    slug: "nour-mansour",
    name: "Nour Mansour",
    role: "user",
    headline: "Product Manager",
    avatarUrl: "https://i.pravatar.cc/150?u=nour",
    location: "New Cairo, Cairo",
    skills: ["Agile", "Product Strategy"],
    shiftsBooked: 10,
    shiftsCompleted: 10,
    careerLevel: 'EXPERIENCED',
    rating: 5.0
  },
  {
    id: "u7",
    // Fix: Added slug property
    slug: "youssef-ibrahim",
    name: "Youssef Ibrahim",
    role: "user",
    headline: "Technical Support Specialist",
    avatarUrl: "https://i.pravatar.cc/150?u=youssef",
    location: "Dokki, Giza",
    skills: ["Networking", "Linux"],
    shiftsBooked: 25,
    shiftsCompleted: 24,
    careerLevel: 'EXPERIENCED',
    rating: 4.6
  },
  {
    id: "u8",
    // Fix: Added slug property
    slug: "dina-fouad",
    name: "Dina Fouad",
    role: "user",
    headline: "Event Coordinator",
    avatarUrl: "https://i.pravatar.cc/150?u=dina",
    location: "Nasr City, Cairo",
    skills: ["Communication", "Planning"],
    shiftsBooked: 50,
    shiftsCompleted: 49,
    careerLevel: 'LEAD',
    rating: 4.9
  }
];

export const CURRENT_USER = USERS[0];
