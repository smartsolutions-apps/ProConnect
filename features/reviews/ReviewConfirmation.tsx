
import React, { useState } from 'react';
import { Star, CheckCircle2, Edit2, AlertCircle, Trash2 } from 'lucide-react';
import { ParsedReview } from './logic';

interface ReviewConfirmationProps {
  reviews: ParsedReview[];
  onSubmit: () => void;
  onCancel: () => void;
}

export const ReviewConfirmation: React.FC<ReviewConfirmationProps> = ({ reviews, onSubmit, onCancel }) => {
  const [data, setData] = useState(reviews);

  const handleRatingChange = (id: string, newRating: number) => {
    setData(prev => prev.map(r => r.userId === id ? { ...r, rating: newRating, reason: 'Manually edited' } : r));
  };

  const handleRemove = (id: string) => {
    setData(prev => prev.filter(r => r.userId !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h3 className="text-lg font-bold text-gray-900">AI Performance Analysis</h3>
            <p className="text-sm text-gray-500">We identified {data.length} staff members from your summary.</p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full font-bold border border-purple-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            AI Processing Complete
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto p-1">
        {data.map((review) => (
          <div key={review.userId} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
            <button 
                onClick={() => handleRemove(review.userId)}
                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <Trash2 size={16} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <img src={review.avatarUrl} alt={review.userName} className="w-10 h-10 rounded-full border border-gray-100" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{review.userName}</h4>
                <p className="text-[10px] text-gray-500 flex items-center gap-1">
                   {review.reason.includes('Detected') ? <Edit2 size={8} /> : <CheckCircle2 size={8} />}
                   {review.reason}
                </p>
              </div>
            </div>

            {/* Tags */}
            {review.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {review.tags.map(tag => (
                        <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            tag === 'Top Performer' ? 'bg-yellow-100 text-yellow-700' : 
                            tag === 'Do Not Rehire' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Star Rater */}
            <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-lg justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => handleRatingChange(review.userId, star)}
                        className={`transition-transform hover:scale-110 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    >
                        <Star size={20} />
                    </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button 
            onClick={onCancel}
            className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
        >
            Discard
        </button>
        <button 
            onClick={onSubmit}
            className="flex-1 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all flex items-center justify-center gap-2"
        >
            <CheckCircle2 size={18} /> Submit {data.length} Reviews
        </button>
      </div>
    </div>
  );
};
