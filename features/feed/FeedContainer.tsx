import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bot, Image, Video, FileText } from 'lucide-react';
import { UrgentGigCard } from '../jobs/UrgentGigCard';
import { CareerProgressCard } from '../career/CareerProgressCard';

interface NewsPost {
  id: string;
  content: string;
  originalTitle: string;
  originalLink: string;
  source: string;
  category: string;
  imageUrl?: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  createdAt?: any;
  likes: number;
  comments: number;
}

interface FeedContainerProps {
  user: any; // Using any for flexibility with User type
}

export const FeedContainer: React.FC<FeedContainerProps> = ({ user }) => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [showUrgentGig, setShowUrgentGig] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const postsRef = collection(db, 'posts');

    let q;
    if (activeTab === 'All') {
      q = query(postsRef, orderBy('createdAt', 'desc'));
    } else {
      q = query(postsRef, where('category', '==', activeTab), orderBy('createdAt', 'desc'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsPost[];
      // Filter out hidden posts
      setPosts(fetchedPosts.filter((p: any) => !p.isHidden));
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [activeTab]);

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-20">

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

      {/* 3. FILTER TABS */}
      <div className="sticky top-16 bg-slate-50 dark:bg-[#121212] z-10 pt-2 pb-2 -mx-4 px-4 overflow-x-auto no-scrollbar flex gap-2">
        {['All', 'Market News', 'Construction', 'Events', 'Market Reports & Analysis'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all text-sm
                            ${activeTab === tab
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md transform scale-105'
                : 'bg-white dark:bg-[#1e1e1e] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#333] hover:bg-slate-100 dark:hover:bg-[#252525]'
              }
                        `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 4. URGENT GIG ALERT (Filtered out if looking at news specifically? Maybe keep it) */}
      {showUrgentGig && activeTab === 'All' && (
        <UrgentGigCard onAccept={() => setTimeout(() => setShowUrgentGig(false), 2000)} />
      )}

      {/* 5. FEED STREAM */}
      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-[#1e1e1e] rounded-xl p-4 border border-slate-200 dark:border-[#333] h-48 animate-pulse"></div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.filter(p => !p.content?.includes("Failed to generate")).map(post => (
            <div key={post.id} className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] shadow-sm overflow-hidden hover:shadow-md transition-shadow">

              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-slate-100 dark:border-[#333]" />
                    {post.author.role === 'AI News Engine' && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 border-2 border-white dark:border-[#1e1e1e]">
                        <Bot size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1">
                      {post.author.name}
                      {post.author.role === 'AI News Engine' && (
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold">BOT</span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {post.category} • {post.source}
                    </p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-2">
                <p className="text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed text-sm">
                  {post.content}
                </p>
              </div>

              {/* Media Rendering */}
              {post.author.role === 'AI News Engine' ? (
                // BOT STYLE: Full Width Image with Distinct Styling
                <div className="mt-3 mb-1">
                  <div className="h-72 bg-slate-50 dark:bg-[#111] overflow-hidden border-y border-slate-100 dark:border-[#333] flex items-center justify-center">
                    <img
                      src={post.imageUrl}
                      alt="News Visual"
                      className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="px-4 py-3 bg-blue-50/30 dark:bg-blue-900/10">
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
                      AI Market Intelligence
                    </p>
                    <a href={post.originalLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:underline">
                      {post.originalTitle} <span className="text-slate-400 font-normal ml-1">({post.source})</span>
                    </a>
                  </div>
                </div>
              ) : (post.category && post.imageUrl) ? (
                // USER LINK STYLE: Link Preview Card
                <div className="mx-4 mt-2 mb-2">
                  <a href={post.originalLink} target="_blank" rel="noreferrer" className="block border border-slate-200 dark:border-[#333] rounded-lg p-3 bg-slate-50 dark:bg-[#1a1a1a] hover:bg-slate-100 dark:hover:bg-[#252525] transition-colors flex gap-4 items-start group">
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt="Thumbnail"
                        className="w-20 h-20 md:w-24 md:h-24 rounded object-cover flex-shrink-0 bg-slate-200 dark:bg-[#333]"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.originalTitle}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {post.source} • {post.category}
                      </p>
                    </div>
                  </a>
                </div>
              ) : post.imageUrl ? (
                // STANDARD USER IMAGE: Full Width Image
                <div className="mt-2 h-48 bg-slate-100 dark:bg-[#111] overflow-hidden">
                  <img src={post.imageUrl} alt="Post Visual" className="w-full h-full object-cover" />
                </div>
              ) : null}

              {/* Original Source Link (Hidden for Bot and Link Cards) */}
              {!((post.category && post.imageUrl) || post.author.role === 'AI News Engine') && post.originalLink && (
                <div className="px-4 py-2">
                  <a href={post.originalLink} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline truncate block">
                    Source: {post.originalTitle}
                  </a>
                </div>
              )}

              {/* Actions */}
              <div className="px-4 py-3 border-t border-slate-100 dark:border-[#333] flex items-center gap-6 mt-2">
                <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors text-sm font-medium group">
                  <Heart size={18} className="group-hover:fill-current" /> {post.likes}
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors text-sm font-medium">
                  <MessageCircle size={18} /> {post.comments}
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors text-sm font-medium ml-auto">
                  <Share2 size={18} /> Share
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-slate-100 dark:bg-[#1e1e1e] rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot size={32} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No updates yet</h3>
          <p className="text-slate-500 text-sm">Be the first to generate news from the Admin Console!</p>
        </div>
      )}
    </div>
  );
};

const PostAction = ({ icon, label }: any) => (
  <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-colors">
    {icon} <span>{label}</span>
  </button>
);
