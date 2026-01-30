
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// NOTE: In a real production app, the key should come from a secure backend proxy or environment variable.
const apiKey = process.env.API_KEY || 'dummy-key-for-demo'; 
const ai = new GoogleGenAI({ apiKey });

export const generateProfileSummary = async (jobTitle: string, skills: string[]): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Act as a professional career coach for the Egyptian job market.
      Write a concise, professional LinkedIn-style summary (max 3 sentences) for a ${jobTitle}.
      Key skills: ${skills.join(', ')}.
      Tone: Professional, ambitious, and tailored for companies like Vodafone, CIB, or multinational tech firms in Cairo.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Experienced professional seeking new opportunities in the Egyptian market.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback for demo purposes if API key is missing
    return `Passionate ${jobTitle} with expertise in ${skills.join(', ')}. Dedicated to delivering high-quality results for top-tier organizations in Egypt.`;
  }
};

export const enhanceJobDescription = async (rawDescription: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Rewrite the following job description to be more engaging and structured with bullet points.
      Keep it professional.
      Original: "${rawDescription}"
    `;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || rawDescription;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return rawDescription;
  }
};

export const generateSkillGapAnalysis = async (userSkills: string[], jobTitle: string, jobDescription: string) => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Analyze the gap between a candidate's skills and a job description.
      Candidate Skills: ${userSkills.join(', ')}
      Job Title: ${jobTitle}
      Job Description: ${jobDescription}

      Identify:
      1. Missing critical skills (technical or soft).
      2. A match score from 0 to 100.
      3. Constructive advice on how to improve.
      4. Specific certification or action recommendation.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            matchScore: { type: Type.NUMBER },
            advice: { type: Type.STRING },
            recommendedAction: { type: Type.STRING }
          }
        }
      }
    });

    const jsonText = response.text;
    if (jsonText) {
      return JSON.parse(jsonText);
    }
    throw new Error("Empty response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback Mock Data
    return {
      missingSkills: ["Advanced System Design", "Kubernetes"],
      matchScore: 75,
      advice: "You have a strong foundation, but this role requires deeper knowledge of orchestration.",
      recommendedAction: "Certified Kubernetes Administrator (CKA)"
    };
  }
};
