import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Briefcase, ExternalLink } from 'lucide-react';
import { Post } from '../../types';

interface FeedItemProps {
  post: Post;
}

const FALLBACK_AVATAR = "https://ui-avatars.com/api/?background=f1f5f9&color=475569&bold=true";

export const FeedItem: React.FC<FeedItemProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
    setLiked(!liked);
  };

  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm border border-slate-100 dark:border-[#333333] overflow-hidden transition-all hover:shadow-md mb-4">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img
            src={post.authorAvatar}
            alt=""
            className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-50 dark:ring-[#2d2d2d]"
            onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.authorName)}&background=f1f5f9&color=475569&bold=true`; }}
          />
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1 hover:text-indigo-600 transition-colors cursor-pointer">
              {post.authorName}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{post.authorHeadline} • {post.timestamp}</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-[#2d2d2d] rounded-full transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-[14px] text-slate-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Attachments */}
      {post.imageUrl && (
        <div className="relative aspect-video w-full bg-slate-100 dark:bg-[#2d2d2d]">
          <img
            src={post.imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {post.isJobUpdate && (
        <div className="mx-4 mb-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-sm">
              <Briefcase size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-xs font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">Hiring Now</p>
              <p className="text-sm font-bold text-indigo-950 dark:text-white">New role at {post.authorName}</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-full transition-all active:scale-95 flex items-center gap-2">
            View Job <ExternalLink size={14} />
          </button>
        </div>
      )}

      {/* Social Actions */}
      <div className="px-2 py-1 flex items-center border-t border-slate-50 dark:border-[#333333]">
        <SocialAction
          icon={<Heart size={18} className={liked ? "fill-rose-500 text-rose-500" : ""} />}
          label={likesCount.toLocaleString()}
          active={liked}
          onClick={handleLike}
        />
        <SocialAction icon={<MessageCircle size={18} />} label={post.comments.toString()} />
        <SocialAction icon={<Share2 size={18} />} label="Share" />
      </div>
    </div>
  );
};

const SocialAction = ({ icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-xs font-bold ${active ? 'text-rose-600' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#2d2d2d]'
      }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);