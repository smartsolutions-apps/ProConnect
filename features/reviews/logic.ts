
import { User } from '../../types';

export interface ParsedReview {
  userId: string;
  userName: string;
  avatarUrl: string;
  rating: number;
  tags: string[];
  reason: string;
}

const KEYWORDS = {
  5: ['fantastic', 'great', 'amazing', 'energetic', 'excellent', 'superb', 'perfect', 'star'],
  3: ['late', 'tardy', 'average', 'okay', 'slow', 'decent'],
  1: ['bad', 'terrible', 'no-show', 'rude', 'awful', 'worst']
};

export const MOCK_TRANSCRIPT = "Ahmed was fantastic, very energetic today. Sarah was good generally but arrived late twice, which was an issue. Mohamed was average, did the job but nothing special.";

export const parseReviewTranscript = (transcript: string, users: User[]): ParsedReview[] => {
  const lowerText = transcript.toLowerCase();
  const results: ParsedReview[] = [];

  users.forEach(user => {
    // 1. Detect Name (First Name Match)
    const firstName = user.name.split(' ')[0].toLowerCase();
    
    // Simple inclusion check. In a real app, we'd use NLP sentence boundary detection 
    // to ensure the keyword applies to THIS specific name.
    if (lowerText.includes(firstName)) {
      
      // 2. Context Window (Simulated)
      // We look for keywords in the whole text for this demo, 
      // or ideally within a substring window around the name.
      // For this robust demo, we'll split the text by periods to isolate sentences.
      const sentences = lowerText.split(/[.!?]/);
      const relevantSentence = sentences.find(s => s.includes(firstName)) || "";

      let rating = 4; // Default if name mentioned but no keywords
      let reason = "Mentioned in transcript";
      let tags: string[] = [];

      // 3. Keyword Analysis
      // Check 5 Star
      if (KEYWORDS[5].some(k => relevantSentence.includes(k))) {
        rating = 5;
        reason = `Detected: "${KEYWORDS[5].find(k => relevantSentence.includes(k))}"`;
        tags.push('Top Performer');
      }
      // Check 3 Star (Priority over 5 if negative sentiment implies mixed bag, but usually negatives win)
      else if (KEYWORDS[3].some(k => relevantSentence.includes(k))) {
        rating = 3;
        reason = `Detected: "${KEYWORDS[3].find(k => relevantSentence.includes(k))}"`;
        if (relevantSentence.includes('late')) tags.push('Punctuality Issue');
      }
      // Check 1 Star
      else if (KEYWORDS[1].some(k => relevantSentence.includes(k))) {
        rating = 1;
        reason = `Detected: "${KEYWORDS[1].find(k => relevantSentence.includes(k))}"`;
        tags.push('Do Not Rehire');
      }

      results.push({
        userId: user.id,
        userName: user.name,
        avatarUrl: user.avatarUrl,
        rating,
        tags,
        reason
      });
    }
  });

  return results;
};
