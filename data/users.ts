
import { User, UserAvailability } from '../types';

export const USERS: User[] = [
  {
    id: "u_me",
    name: "Mohamed Ali",
    headline: "Senior React Developer | Ex-Vodafone",
    avatarUrl: "https://i.pravatar.cc/150?u=u_me",
    location: "New Cairo, Cairo",
    university: "American University in Cairo (AUC)",
    skills: ["React", "TypeScript", "Node.js", "Firebase", "System Design"],
    verifiedSkills: ["TypeScript", "System Design"], // Initial verified skills
    workStyle: {
      leadership: 7,
      teamwork: 9,
      independence: 6,
      creativity: 8,
      logic: 8
    },
    availability: UserAvailability.ONE_MONTH_NOTICE,
    salaryExpectations: {
      min: 45000,
      expected: 60000,
      currency: 'EGP',
      period: 'Monthly'
    },
    softSkills: [
        { id: 'sb1', type: 'PROBLEM_SOLVER', endorsements: 12 },
        { id: 'sb2', type: 'MORALE_BOOSTER', endorsements: 5 },
        { id: 'sb3', type: 'PUNCTUAL', endorsements: 8 }
    ],
    interviewAvailability: {
      days: ["Mon", "Wed", "Fri"],
      startHour: 17, // 5 PM
      endHour: 20    // 8 PM
    },
    challenges: [
      {
        type: 'CODE',
        id: 'ch_1',
        title: "Optimizing Virtual List Performance",
        description: "Reduced render time for a 10,000 item list by 85% using windowing.",
        language: "typescript",
        solutionExplanation: "The initial implementation rendered all DOM nodes at once, causing UI freeze. I implemented a custom virtualizer to only render items in the viewport + buffer.",
        code: `
// Custom Virtualizer Hook
const useVirtualizer = ({ itemCount, itemHeight, containerHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    itemCount - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight)
  );

  const visibleItems = useMemo(() => {
    return Array.from({ length: endIndex - startIndex + 1 }, (_, i) => ({
      index: i + startIndex,
      style: {
        position: 'absolute',
        top: (i + startIndex) * itemHeight,
        height: itemHeight,
      },
    }));
  }, [startIndex, endIndex, itemHeight]);

  return { visibleItems, onScroll: (e) => setScrollTop(e.target.scrollTop) };
};
        `.trim()
      }
    ],
    shiftsBooked: 24,
    shiftsCompleted: 23, // 96% Reliability
    careerLevel: 'LEAD', // <--- CAREER LEVEL ADDED
    wallet: {
        balance: 4500,
        pending: 1200,
        history: [
            { id: 'txn_1', title: 'Cityscape - Usher', date: '2d ago', amount: 450, status: 'PENDING', type: 'EARNING' },
            { id: 'txn_2', title: 'Auto Mach - Model', date: '1w ago', amount: 750, status: 'PENDING', type: 'EARNING' },
            { id: 'txn_3', title: 'Withdrawal to Vodafone Cash', date: '2w ago', amount: -2000, status: 'COMPLETED', type: 'WITHDRAWAL', method: 'Vodafone Cash' },
            { id: 'txn_4', title: 'Cairo ICT Day 3', date: '2w ago', amount: 500, status: 'COMPLETED', type: 'EARNING' },
            { id: 'txn_5', title: 'Cairo ICT Day 2', date: '2w ago', amount: 500, status: 'COMPLETED', type: 'EARNING' },
            { id: 'txn_6', title: 'Cairo ICT Day 1', date: '2w ago', amount: 500, status: 'COMPLETED', type: 'EARNING' }
        ]
    },
    gamification: { points: 1250, rank: 42, badges: ['Top Rated', 'Speedy'] },
    rating: 4.9,
    skillInsights: [
      {
        id: 'si_1',
        jobId: 'j5', // Fawry (Java Backend)
        jobTitle: 'Senior Backend Engineer (Java)',
        companyName: 'Fawry',
        date: '2 days ago',
        matchScore: 65,
        missingSkills: ['Java', 'Spring Boot', 'Microservices Architecture'],
        advice: 'Your Node.js background is strong, but Fawry\'s core payments infrastructure relies heavily on Java. Pivot to Spring Boot to unlock fintech roles.',
        recommendedAction: 'Udemy: Java Spring Boot Masterclass'
      },
      {
        id: 'si_2',
        jobId: 'j9', // Etisalat (Cloud Architect)
        jobTitle: 'Cloud Architect',
        companyName: 'Etisalat Misr',
        date: '1 week ago',
        matchScore: 72,
        missingSkills: ['Azure DevOps', 'Advanced Networking'],
        advice: 'You have good general cloud knowledge, but this role specifically requires deep Azure networking expertise.',
        recommendedAction: 'Microsoft Certified: Azure Solutions Architect Expert'
      }
    ]
  },
  {
    id: "u_sarah",
    name: "Sarah El-Sayed",
    headline: "HR Director at Orange Egypt",
    avatarUrl: "https://i.pravatar.cc/150?u=u_sarah",
    location: "Smart Village, Giza",
    skills: ["Talent Acquisition", "HR Strategy", "Leadership"],
    verifiedSkills: ["Talent Acquisition"],
    shiftsBooked: 10,
    shiftsCompleted: 10,
    careerLevel: 'EXPERIENCED',
    gamification: { points: 5000, rank: 3, badges: ['Ambassador', 'Connector'] },
    rating: 5.0
  },
  {
    id: "u_ahmed",
    name: "Ahmed Hassan",
    headline: "Civil Engineer at Orascom",
    avatarUrl: "https://i.pravatar.cc/150?u=u_ahmed",
    location: "6th of October, Giza",
    skills: ["AutoCAD", "Project Management", "Structural Engineering"],
    shiftsBooked: 5,
    shiftsCompleted: 3, // 60% Reliability (High Risk)
    careerLevel: 'STARTER',
    gamification: { points: 200, rank: 156, badges: [] },
    rating: 3.5
  },
  {
    id: "u_laila",
    name: "Laila Mourad",
    headline: "Senior UX Designer at Instabug",
    avatarUrl: "https://i.pravatar.cc/150?u=u_laila",
    location: "Zamalek, Cairo",
    skills: ["Figma", "User Research", "Prototyping"],
    verifiedSkills: ["Figma"],
    challenges: [
        {
            type: 'DESIGN',
            id: 'ch_des_1',
            title: "E-Commerce Checkout Redesign",
            description: "Simplifying the checkout flow to reduce cart abandonment.",
            beforeImageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80", // Placeholder for "Cluttered UI"
            afterImageUrl: "https://images.unsplash.com/photo-1556742102-de63836034d2?auto=format&fit=crop&w=800&q=80" // Placeholder for "Clean UI"
        }
    ],
    shiftsBooked: 12,
    shiftsCompleted: 11,
    careerLevel: 'EXPERIENCED',
    gamification: { points: 4200, rank: 12, badges: ['Visionary'] },
    rating: 4.7
  },
  {
    id: "u_omar",
    name: "Omar Samy",
    headline: "Backend Engineer (Go)",
    avatarUrl: "https://i.pravatar.cc/150?u=u_omar",
    location: "Maadi, Cairo",
    skills: ["Go", "Kubernetes", "Microservices"],
    verifiedSkills: ["Go"],
    shiftsBooked: 8,
    shiftsCompleted: 7,
    careerLevel: 'EXPERIENCED',
    gamification: { points: 1800, rank: 89, badges: ['Coder'] },
    rating: 4.5
  },
  {
    id: "u_nour",
    name: "Nour El-Sherif",
    headline: "Product Manager at Valu",
    avatarUrl: "https://i.pravatar.cc/150?u=u_nour",
    location: "Heliopolis, Cairo",
    skills: ["Product Strategy", "Agile", "Data Analysis"],
    shiftsBooked: 15,
    shiftsCompleted: 15,
    careerLevel: 'LEAD',
    gamification: { points: 6500, rank: 1, badges: ['Super Star', 'Mentor'] },
    rating: 5.0
  },
  {
    id: "u_youssef",
    name: "Youssef Magdy",
    headline: "Data Scientist at CIB",
    avatarUrl: "https://i.pravatar.cc/150?u=u_youssef",
    location: "New Cairo, Cairo",
    skills: ["Python", "Machine Learning", "SQL"],
    verifiedSkills: ["Python", "SQL"],
    shiftsBooked: 0,
    shiftsCompleted: 0,
    careerLevel: 'STARTER',
    gamification: { points: 0, rank: 999, badges: [] },
    rating: 0
  },
  {
    id: "u_dina",
    name: "Dina Kamel",
    headline: "Digital Marketing Manager",
    avatarUrl: "https://i.pravatar.cc/150?u=u_dina",
    location: "Alexandria",
    skills: ["SEO", "Content Strategy", "Performance Marketing"],
    shiftsBooked: 40,
    shiftsCompleted: 35,
    careerLevel: 'SUPERVISOR',
    gamification: { points: 5800, rank: 2, badges: ['Influencer'] },
    rating: 4.8
  }
];

export const CURRENT_USER = USERS[0];
