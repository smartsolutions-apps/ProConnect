import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Briefcase } from 'lucide-react';
import { Post } from '../types';

interface FeedItemProps {
  post: Post;
}

export const FeedItem: React.FC<FeedItemProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3">
          <img 
            src={post.authorAvatar} 
            alt={post.authorName} 
            className="w-10 h-10 rounded-full object-cover border border-gray-100"
          />
          <div>
            <h4 className="text-sm font-bold text-gray-900 hover:underline cursor-pointer">
              {post.authorName}
            </h4>
            <p className="text-xs text-gray-500 line-clamp-1">{post.authorHeadline}</p>
            <p className="text-xs text-gray-400 mt-0.5">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Job Card Attachment if available */}
      {post.isJobUpdate && (
        <div className="mb-4 bg-blue-50 rounded-lg p-3 border border-blue-100 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Briefcase size={20} className="text-brand-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-brand-900">We're hiring!</p>
            <p className="text-xs text-brand-700">View this job opportunity at {post.authorName}</p>
          </div>
          <button className="px-3 py-1 bg-brand-600 text-white text-xs font-bold rounded-md hover:bg-brand-700">
            View Job
          </button>
        </div>
      )}

      {/* Image Attachment */}
      {post.imageUrl && (
        <div className="mb-4 -mx-4">
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="w-full h-auto object-cover max-h-96"
          />
        </div>
      )}

      {/* Social Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex gap-1">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-gray-50 transition-colors ${liked ? 'text-red-500' : 'text-gray-500'}`}
          >
            <Heart size={18} className={liked ? "fill-current" : ""} />
            <span className="text-xs font-medium">{likesCount}</span>
          </button>
          
          <button className="flex items-center gap-1.5 px-2 py-1.5 text-gray-500 rounded hover:bg-gray-50 transition-colors">
            <MessageCircle size={18} />
            <span className="text-xs font-medium">{post.comments}</span>
          </button>
          
          <button className="flex items-center gap-1.5 px-2 py-1.5 text-gray-500 rounded hover:bg-gray-50 transition-colors">
            <Share2 size={18} />
            <span className="text-xs font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};