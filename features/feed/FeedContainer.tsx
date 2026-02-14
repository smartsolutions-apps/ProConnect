
import React, { useState } from 'react';
import { FeedItem } from './FeedItem';
import { POSTS } from '../../data';
import { User, Post } from '../../types';
import { UrgentGigCard } from '../jobs/UrgentGigCard';
import { CareerProgressCard } from '../career/CareerProgressCard';
import { Image, Video, FileText, Sparkles } from 'lucide-react';
import { useHydratedData } from '../../context/DataHydrationContext';

interface FeedContainerProps {
  user: User;
}

export const FeedContainer: React.FC<FeedContainerProps> = ({ user }) => {
  const { newsFeed, isHydrating } = useHydratedData();
  const [localPosts] = useState<Post[]>(POSTS);
  const [showUrgentGig, setShowUrgentGig] = useState(true);

  // Merge static posts with hydrated news feed
  const combinedFeed = [...newsFeed, ...localPosts].sort((a, b) => {
    return a.timestamp === 'Just Now' ? -1 : 1;
  });

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* 1. SOCIAL POST CREATOR */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm border border-slate-100 dark:border-[#333333] p-5">
        <div className="flex gap-4">
          <img 
            src={user.avatarUrl} 
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-50 dark:ring-[#2d2d2d]" 
            alt="" 
          />
          <div className="flex-1 bg-slate-100 dark:bg-[#2d2d2d] rounded-2xl px-5 flex items-center cursor-text hover:bg-slate-200 dark:hover:bg-[#333333] transition-colors group">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-bold">What's on your mind, {user.name.split(' ')[0]}?</span>
          </div>
        </div>
        <div className="flex justify-between mt-5 px-1">
           <PostAction icon={<Image size={18} className="text-blue-500" />} label="Media" />
           <PostAction icon={<Video size={18} className="text-emerald-500" />} label="Video" />
           <PostAction icon={<FileText size={18} className="text-amber-500" />} label="Insight" />
           <button className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95">
             Post
           </button>
        </div>
      </div>

      {/* 2. CAREER PROGRESSION */}
      <CareerProgressCard user={user} />

      {/* 3. URGENT GIG ALERT */}
      {showUrgentGig && (
          <UrgentGigCard onAccept={() => setTimeout(() => setShowUrgentGig(false), 2000)} />
      )}

      {/* 4. FEED STREAM */}
      <div className="space-y-4">
        {isHydrating && (
            <div className="flex justify-center py-4">
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )}
        {combinedFeed.map(post => (
          <FeedItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const PostAction = ({ icon, label }: any) => (
  <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-colors">
    {icon} <span>{label}</span>
  </button>
);
