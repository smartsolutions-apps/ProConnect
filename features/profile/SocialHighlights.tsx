
import React, { useState } from 'react';
import { Instagram, Twitter, Palette, Plus, X, Check, Loader2, ExternalLink } from 'lucide-react';

interface SocialPost {
  id: string;
  platform: 'instagram' | 'twitter' | 'behance';
  imageUrl: string;
  caption: string;
  date: string;
}

const MOCK_EXTERNAL_POSTS: SocialPost[] = [
  {
    id: 'sp1',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
    caption: 'Won 1st place at the Cairo Tech Hackathon! 🏆🇪🇬 #Coding #TeamWork',
    date: '2 weeks ago'
  },
  {
    id: 'sp2',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    caption: 'Speaking at the React Middle East meetup about Server Components. 🎤',
    date: '1 month ago'
  },
  {
    id: 'sp3',
    platform: 'behance',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
    caption: 'Redesign Concept for National Bank App. UI/UX Case Study.',
    date: '3 months ago'
  },
  {
    id: 'sp4',
    platform: 'twitter',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    caption: 'Great team lunch to celebrate our Series A funding! 🚀',
    date: '4 months ago'
  },
  {
    id: 'sp5',
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    caption: 'Volunteering at the Giza Food Bank. Giving back to the community. ❤️',
    date: '6 months ago'
  }
];

export const SocialHighlights: React.FC = () => {
  const [pinnedPosts, setPinnedPosts] = useState<SocialPost[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [selectedForPinning, setSelectedForPinning] = useState<string[]>([]);
  const [activePlatform, setActivePlatform] = useState<'instagram' | 'twitter' | 'behance' | null>(null);

  const handleConnect = (platform: 'instagram' | 'twitter' | 'behance') => {
    setIsConnecting(true);
    setActivePlatform(platform);
    // Simulate API delay
    setTimeout(() => {
      setIsConnecting(false);
      setShowSelector(true);
    }, 1200);
  };

  const toggleSelection = (id: string) => {
    if (selectedForPinning.includes(id)) {
      setSelectedForPinning(prev => prev.filter(pid => pid !== id));
    } else {
      setSelectedForPinning(prev => [...prev, id]);
    }
  };

  const confirmPins = () => {
    const newPins = MOCK_EXTERNAL_POSTS.filter(p => selectedForPinning.includes(p.id));
    // Filter out duplicates if already pinned
    const uniquePins = newPins.filter(np => !pinnedPosts.some(pp => pp.id === np.id));
    setPinnedPosts(prev => [...prev, ...uniquePins]);
    setShowSelector(false);
    setSelectedForPinning([]);
    setActivePlatform(null);
  };

  const removePin = (id: string) => {
    setPinnedPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Social Highlights</h3>
          <p className="text-sm text-gray-500">Curate your culture fit & professional wins.</p>
        </div>
        
        {/* Connect Buttons */}
        <div className="flex gap-2">
            {pinnedPosts.length > 0 ? (
                 <button 
                    onClick={() => setShowSelector(true)}
                    className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                 >
                    <Plus size={20} />
                 </button>
            ) : (
                <>
                    <button onClick={() => handleConnect('instagram')} className="p-2 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors" title="Connect Instagram">
                        <Instagram size={20} />
                    </button>
                    <button onClick={() => handleConnect('twitter')} className="p-2 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors" title="Connect Twitter">
                        <Twitter size={20} />
                    </button>
                    <button onClick={() => handleConnect('behance')} className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors" title="Connect Behance">
                        <Palette size={20} />
                    </button>
                </>
            )}
        </div>
      </div>

      {/* Empty State / Gallery */}
      <div className="p-6">
        {pinnedPosts.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                <Instagram className="text-gray-400" size={24} />
            </div>
            <h4 className="text-sm font-bold text-gray-900">No highlights pinned yet</h4>
            <p className="text-xs text-gray-500 mt-1 mb-4 max-w-xs mx-auto">
                Connect your accounts to pin photos from hackathons, team events, or design portfolios.
            </p>
            <button 
                onClick={() => handleConnect('instagram')}
                className="text-sm font-semibold text-brand-600 hover:text-brand-700 underline"
            >
                Start Curating Gallery
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {pinnedPosts.map(post => (
                <div key={post.id} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer">
                    <img src={post.imageUrl} alt="Highlight" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white text-xs font-medium line-clamp-2 mb-1">{post.caption}</p>
                        <p className="text-white/60 text-[10px]">{post.date}</p>
                    </div>

                    <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm backdrop-blur-sm">
                        {post.platform === 'instagram' && <Instagram size={12} className="text-pink-600" />}
                        {post.platform === 'twitter' && <Twitter size={12} className="text-blue-500" />}
                        {post.platform === 'behance' && <Palette size={12} className="text-indigo-600" />}
                    </div>

                    <button 
                        onClick={(e) => { e.stopPropagation(); removePin(post.id); }}
                        className="absolute top-2 left-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
                    >
                        <X size={12} />
                    </button>
                </div>
             ))}
             
             {/* Add More Card */}
             <button 
                onClick={() => setShowSelector(true)}
                className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-brand-300 hover:bg-brand-50 transition-colors text-gray-400 hover:text-brand-600"
             >
                <Plus size={24} />
                <span className="text-xs font-bold mt-2">Add Pin</span>
             </button>
          </div>
        )}
      </div>

      {/* SELECTOR MODAL */}
      {isConnecting && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center animate-in zoom-in-95">
                <Loader2 size={32} className="animate-spin text-brand-600 mb-4" />
                <h3 className="font-bold text-gray-900">Connecting to {activePlatform}...</h3>
                <p className="text-sm text-gray-500">Fetching your professional moments</p>
            </div>
         </div>
      )}

      {showSelector && !isConnecting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-4">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h3 className="font-bold text-gray-900">Pin to Profile</h3>
                        <p className="text-xs text-gray-500">Select posts that show your best self.</p>
                    </div>
                    <button onClick={() => setShowSelector(false)} className="p-2 hover:bg-gray-200 rounded-full"><X size={20}/></button>
                </div>
                
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {MOCK_EXTERNAL_POSTS.map(post => {
                            const isSelected = selectedForPinning.includes(post.id);
                            const isAlreadyPinned = pinnedPosts.some(p => p.id === post.id);
                            
                            if (isAlreadyPinned) return null;

                            return (
                                <div 
                                    key={post.id} 
                                    onClick={() => toggleSelection(post.id)}
                                    className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all ${isSelected ? 'ring-4 ring-brand-500 ring-offset-2' : 'hover:opacity-90'}`}
                                >
                                    <img src={post.imageUrl} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-brand-500/20 flex items-center justify-center">
                                            <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center shadow-lg text-white">
                                                <Check size={20} strokeWidth={3} />
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm">
                                        {post.platform === 'instagram' && <Instagram size={12} className="text-pink-600" />}
                                        {post.platform === 'twitter' && <Twitter size={12} className="text-blue-500" />}
                                        {post.platform === 'behance' && <Palette size={12} className="text-indigo-600" />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                    <button 
                        onClick={() => setShowSelector(false)}
                        className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-200 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={confirmPins}
                        disabled={selectedForPinning.length === 0}
                        className="px-6 py-2 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        Pin {selectedForPinning.length} Items
                    </button>
                </div>
             </div>
          </div>
      )}
    </div>
  );
};
