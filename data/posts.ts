
import { Post } from '../types';
import { USERS } from './users';
import { COMPANIES } from './companies';

export const POSTS: Post[] = [
  {
    id: "p1",
    authorId: USERS[2].id,
    authorName: USERS[2].name,
    authorHeadline: USERS[2].headline,
    authorAvatar: USERS[2].avatarUrl,
    content: "Just finished the marathon at the Pyramids! 🏃‍♂️🇪🇬 The energy was absolutely electric today. It's amazing to see our community growing stronger every year. Who else was there?",
    imageUrl: "https://images.unsplash.com/photo-1539650116455-251d932549d4?auto=format&fit=crop&w=800&q=80",
    likes: 450,
    comments: 32,
    timestamp: "2h ago"
  },
  {
    id: "p2",
    authorId: COMPANIES[5].id,
    authorName: COMPANIES[5].name,
    authorHeadline: "Fintech Company",
    authorAvatar: COMPANIES[5].logoUrl,
    content: "Excited to share that we've processed over 1 Billion transactions this year! 🚀 Thank you to our amazing team and loyal customers. We are hiring Java Developers to help us scale further!",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80",
    isJobUpdate: true,
    relatedJobId: "j5",
    likes: 1200,
    comments: 85,
    timestamp: "4h ago"
  },
  {
    id: "p3",
    authorId: USERS[1].id,
    authorName: USERS[1].name,
    authorHeadline: USERS[1].headline,
    authorAvatar: USERS[1].avatarUrl,
    content: "We are seeing a huge shift in candidate expectations regarding remote work. At Orange, we're committed to a flexible hybrid model. What are your thoughts on mandatory office days?",
    likes: 892,
    comments: 156,
    timestamp: "6h ago"
  },
  {
    id: "p4",
    authorId: USERS[3].id,
    authorName: USERS[3].name,
    authorHeadline: USERS[3].headline,
    authorAvatar: USERS[3].avatarUrl,
    content: "Who is going to the RiseUp Summit at the Greek Campus this year? 🏛️ I'll be giving a talk on 'User-Centric Design in Fintech'. Let's connect!",
    imageUrl: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80",
    likes: 340,
    comments: 45,
    timestamp: "1d ago"
  },
  {
    id: "p5",
    authorId: USERS[5].id,
    authorName: USERS[5].name,
    authorHeadline: USERS[5].headline,
    authorAvatar: USERS[5].avatarUrl,
    content: "Real Estate prices in Sheikh Zayed are skyrocketing. 📈 Just published a quick analysis on the impact of the new Monorail. Check the link in comments.",
    likes: 210,
    comments: 28,
    timestamp: "1d ago"
  },
  {
    id: "p6",
    authorId: COMPANIES[0].id,
    authorName: COMPANIES[0].name,
    authorHeadline: "Telecommunications",
    authorAvatar: COMPANIES[0].logoUrl,
    content: "We are proud to announce our new partnership with the Ministry of Communications to train 10,000 fresh graduates in Cloud Computing. ☁️🇪🇬 #DigitalEgypt",
    likes: 3200,
    comments: 120,
    timestamp: "2d ago"
  },
  {
    id: "p7",
    authorId: USERS[4].id,
    authorName: USERS[4].name,
    authorHeadline: USERS[4].headline,
    authorAvatar: USERS[4].avatarUrl,
    content: "Is anyone else experimenting with Gemini 3.0 for code generation? The reasoning capabilities for Go routines are mind-blowing. 🤯",
    likes: 150,
    comments: 67,
    timestamp: "2d ago"
  },
  {
    id: "p8",
    authorId: USERS[0].id,
    authorName: USERS[0].name,
    authorHeadline: USERS[0].headline,
    authorAvatar: USERS[0].avatarUrl,
    content: "Just updated my portfolio with the latest project for ProConnect Egypt. Check it out! 💻 #React #Frontend",
    likes: 89,
    comments: 12,
    timestamp: "3d ago"
  }
];
