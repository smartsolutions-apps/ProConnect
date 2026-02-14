
import { Post } from '../../types';

const BRANDFETCH_CLIENT_ID = "1idiSqP5yegNdsQZndZ";

const CACHED_NEWS: Post[] = [
  {
    id: 'news_re_1',
    authorId: 'admin_re',
    authorName: 'Invest-Gate Egypt',
    authorHeadline: 'Industry Media',
    authorAvatar: `https://cdn.brandfetch.io/domain/invest-gate.me?c=${BRANDFETCH_CLIENT_ID}`,
    content: 'Market Update: Central Bank interest rate changes and the impact on New Capital commercial units. Read the full analysis on how developers are adjusting payment plans.',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    likes: 342,
    comments: 56,
    timestamp: 'Just Now'
  },
  {
    id: 'news_re_2',
    authorId: 'ora_admin',
    authorName: 'Ora Developers',
    authorHeadline: 'Developer Announcement',
    authorAvatar: `https://cdn.brandfetch.io/domain/oradevelopers.com?c=${BRANDFETCH_CLIENT_ID}`,
    content: 'Ora Developers officially launches Silversands North Coast new phase. Brokers, check your portals for updated inventory and commission scales. #LuxuryLiving',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    likes: 890,
    comments: 120,
    timestamp: '2h ago'
  },
  {
    id: 'news_re_3',
    authorId: 'aqarmap_insights',
    authorName: 'Aqarmap Trends',
    authorHeadline: 'Market Data',
    authorAvatar: `https://cdn.brandfetch.io/domain/aqarmap.com.eg?c=${BRANDFETCH_CLIENT_ID}`,
    content: 'Latest demand index shows a 12% increase in searches for Townhouses in Sheikh Zayed. Buyers are moving away from apartments towards gated villa communities.',
    likes: 567,
    comments: 42,
    timestamp: '5h ago'
  },
  {
    id: 'news_2',
    authorId: 'admin',
    authorName: 'ProConnect Tech',
    authorHeadline: 'Tech Tracker',
    authorAvatar: 'https://logo.clearbit.com/proconnect.eg',
    content: 'Vodafone Egypt and Ericsson announce completion of 5G trials in Smart Village. Expect public rollout in major Cairo districts by late 2025.',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    likes: 856,
    comments: 42,
    timestamp: '1h ago'
  }
];

export const fetchIndustryNews = async (sector: 'TECH' | 'REAL_ESTATE'): Promise<Post[]> => {
  try {
    // Filter logic for demo
    if (sector === 'REAL_ESTATE') {
        return CACHED_NEWS.filter(p => p.id.includes('re') || p.content.includes('Capital'));
    }
    return CACHED_NEWS.filter(p => !p.id.includes('re'));
  } catch (err) {
    console.error("News Fetch Error:", err);
    return [];
  }
};
