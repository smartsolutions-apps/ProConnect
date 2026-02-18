import React from 'react';
import { Heart, MessageCircle, Instagram } from 'lucide-react';
import { Company } from '../../types';

interface CompanySocialGridProps {
    company: Company;
}

// Hardcoded high-quality real estate images for simulation
const SOCIAL_POSTS = [
    {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-2495db9a9cf6?auto=format&fit=crop&q=80&w=600', // Luxury Home
        likes: 124,
        comments: 18
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600', // Modern Office
        likes: 89,
        comments: 5
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=600', // Architecture
        likes: 256,
        comments: 42
    },
    {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600', // Agent / Meeting
        likes: 145,
        comments: 21
    },
    {
        id: 5,
        imageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=600', // Design / Creative
        likes: 67,
        comments: 8
    },
    {
        id: 6,
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600', // Skyscraper
        likes: 312,
        comments: 56
    }
];

export const CompanySocialGrid: React.FC<CompanySocialGridProps> = ({ company }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                        <Instagram size={18} />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Latest from Instagram</h3>
                </div>
                <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline hidden sm:block">
                    View Profile
                </button>
            </div>

            <div className="grid grid-cols-3 gap-1 sm:gap-4">
                {SOCIAL_POSTS.map((post) => (
                    <div key={post.id} className="aspect-square relative group overflow-hidden bg-gray-100 dark:bg-[#252525] cursor-pointer rounded-sm sm:rounded-lg">
                        <img
                            src={post.imageUrl}
                            alt="Social Post"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-bold backdrop-blur-[2px]">
                            <div className="flex items-center gap-1">
                                <Heart size={20} fill="white" /> {post.likes}
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle size={20} fill="white" /> {post.comments}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <button className="w-full sm:w-auto px-6 py-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white font-bold rounded-full transition-transform hover:scale-105 shadow-md flex items-center justify-center gap-2 mx-auto">
                    <Instagram size={18} />
                    Follow @{company.name.replace(/\s+/g, '').toLowerCase()}
                </button>
            </div>
        </div>
    );
};
