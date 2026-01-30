
export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  REMOTE = 'Remote',
  HYBRID = 'Hybrid',
  ON_SITE = 'On-site',
  TEMPORARY = 'Temporary / Gig',
  INTERNSHIP = 'Internship'
}

export enum ApplicationStatus {
  APPLIED = 'Applied',
  VIEWED = 'Viewed by HR',
  SHORTLISTED = 'Shortlisted',
  INTERVIEW = 'Interview',
  OFFER = 'Offer',
  REJECTED = 'Rejected'
}

export enum UserAvailability {
  IMMEDIATELY = 'Immediately',
  ONE_MONTH_NOTICE = '1 Month Notice',
  OPEN_TO_OFFERS = 'Open to Offers'
}

export type CareerLevel = 'STARTER' | 'EXPERIENCED' | 'LEAD' | 'SUPERVISOR' | 'EVENT_OPS';

export interface WorkStyle {
  leadership: number;
  teamwork: number;
  independence: number;
  creativity: number;
  logic: number;
}

export interface SalaryExpectations {
  min: number;
  expected: number;
  currency: string;
  period: 'Monthly' | 'Yearly';
}

export type ChallengeType = 'CODE' | 'DESIGN';

export interface CodeChallenge {
  type: 'CODE';
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  solutionExplanation: string;
}

export interface DesignChallenge {
  type: 'DESIGN';
  id: string;
  title: string;
  description: string;
  beforeImageUrl: string;
  afterImageUrl: string;
}

export type Challenge = CodeChallenge | DesignChallenge;

export type SoftSkillType = 'PROBLEM_SOLVER' | 'PUNCTUAL' | 'MORALE_BOOSTER' | 'LEADERSHIP' | 'MENTOR';

export interface SoftSkillBadge {
  id: string;
  type: SoftSkillType;
  endorsements: number;
}

export interface InterviewAvailability {
  days: string[]; // e.g. ["Mon", "Wed", "Fri"]
  startHour: number; // 24h format, e.g., 17 for 5 PM
  endHour: number; // 24h format, e.g., 20 for 8 PM
}

export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED' | 'PROCESSING';

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  type: 'EARNING' | 'WITHDRAWAL';
  method?: string; // For withdrawals e.g. "Vodafone Cash"
}

export interface Wallet {
  balance: number;
  pending: number;
  history: Transaction[];
}

export interface GamificationProfile {
  points: number;
  rank: number;
  badges: string[];
}

export interface Squad {
  id: string;
  name: string;
  avatarUrl?: string; // Optional squad logo
  members: User[];
  averageReliability: number; // 0-100
  averageRating: number; // 0-5.0
  totalShiftsCompleted: number;
  vibe: string[]; // e.g., ["High Energy", "Tech Savvy"]
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  role: 'admin' | 'user';
  type: 'broadcast' | 'message';
  content: string;
  timestamp: string; // ISO String or relative time
  avatarUrl?: string;
  isRead?: boolean;
}

export interface Zone {
  id: string;
  name: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  capacity: number;
  assignedUsers: User[];
}

export type AssetStatus = 'AVAILABLE' | 'ASSIGNED' | 'RETURNED' | 'LOST';

export interface Asset {
  id: string;
  type: string;
  name: string; // e.g., "iPad Pro #4"
  status: AssetStatus;
  assignedTo?: string; // User ID
  assignedToName?: string; // User Name for display
  lastUpdated: string;
}

// NEW: Skill Gap Analysis Type
export interface SkillInsight {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  date: string;
  matchScore: number; // 0-100
  missingSkills: string[];
  advice: string;
  recommendedAction: string; // e.g., "Take a course on Coursera"
}

export type UserRole = 'seeker' | 'company' | 'admin';

export interface User {
  id: string;
  name: string;
  headline: string;
  avatarUrl: string;
  location: string;
  university?: string;
  skills: string[];
  verifiedSkills?: string[]; // NEW: List of skills that passed the quiz
  workStyle?: WorkStyle;
  availability?: UserAvailability;
  salaryExpectations?: SalaryExpectations;
  challenges?: Challenge[];
  softSkills?: SoftSkillBadge[];
  interviewAvailability?: InterviewAvailability;
  appliedEvents?: string[]; // IDs of events they are pooling for
  
  // CAREER PROGRESSION
  careerLevel?: CareerLevel;

  // GIG ECONOMY RELIABILITY METRICS
  shiftsBooked?: number;
  shiftsCompleted?: number;
  
  // FINTECH WALLET
  wallet?: Wallet;

  // GAMIFICATION
  gamification?: GamificationProfile;
  rating?: number; // 0.0 to 5.0

  // SKILL GAP ANALYSIS
  skillInsights?: SkillInsight[];
}

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  industry: string;
  location: string;
  description?: string;
  attendingEvents?: string[]; // IDs of events they are attending
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  type: JobType;
  postedAt: string;
  description: string;
  applicantsCount: number;
  salaryRange?: string;
  isEasyApply: boolean;
  isDirectOffer?: boolean; // NEW: Indicates a direct re-hire offer
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  status: ApplicationStatus;
  appliedDate: string; // ISO String
  lastUpdate: string;
  lastUpdateDate: string; // ISO String for sorting
  
  // SQUAD MODE
  type?: 'individual' | 'squad';
  squad?: Squad;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorHeadline: string;
  authorAvatar: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  timestamp: string;
  isJobUpdate?: boolean;
  relatedJobId?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  imageUrl: string;
  category: string;
  date: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  imageUrl: string;
  description: string;
  roles: string[]; // e.g., "Promoters", "Sales", "Hostess"
  attendeeCount: number; // Companies attending
  dailyRate: number; // EGP per shift
}
