
import React, { useState } from 'react';
import { FeedItem } from './FeedItem';
import { POSTS } from '../../data';
import { User, Post } from '../../types';
import { UrgentGigCard } from '../jobs/UrgentGigCard';
import { CareerProgressCard } from '../career/CareerProgressCard';

interface FeedContainerProps {
  user: User;
}

export const FeedContainer: React.FC<FeedContainerProps> = ({ user }) => {
  const [posts] = useState<Post[]>(POSTS);
  
  // SIMULATION: If user is user[1] (Sarah - simulated as a Standby for demo) or we just force it for the demo
  const [showUrgentGig, setShowUrgentGig] = useState(true);

  return (
    <div className="space-y-4">
      {/* 1. CAREER PROGRESSION (Long Term Value) */}
      <CareerProgressCard user={user} />

      {/* 2. URGENT GIG ALERT (Short Term Opportunity) */}
      {showUrgentGig && (
          <UrgentGigCard onAccept={() => {
              // Hide after accept simulation handled in card
              setTimeout(() => setShowUrgentGig(false), 2000);
          }} />
      )}

      {/* 3. SOCIAL POST CREATOR */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex gap-3">
          <img 
            src={user.avatarUrl} 
            className="w-10 h-10 rounded-full" 
            alt="Me" 
          />
          <div className="flex-1 bg-gray-100 rounded-full px-4 flex items-center cursor-text hover:bg-gray-200 transition-colors">
            <span className="text-gray-500 text-sm font-medium">Start a post, {user.name.split(' ')[0]}?</span>
          </div>
        </div>
        <div className="flex justify-between mt-3 px-2">
           <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium">
            <span className="text-blue-500">📷</span> Photo
           </button>
           <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium">
            <span className="text-green-500">🎥</span> Video
           </button>
           <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium">
            <span className="text-orange-500">📰</span> Write article
           </button>
        </div>
      </div>

      {/* 4. FEED STREAM */}
      {posts.map(post => (
        <FeedItem key={post.id} post={post} />
      ))}
    </div>
  );
};
