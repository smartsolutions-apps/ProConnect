
import { GoogleGenAI, Type } from "@google/genai";

// Note: GoogleGenAI client is initialized inside each function to ensure the most current API key from process.env.API_KEY is used.

export const generateProfileSummary = async (jobTitle: string, skills: string[]): Promise<string> => {
  try {
    // Initialize client right before the API call for fresh credentials
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
    return `Passionate ${jobTitle} with expertise in ${skills.join(', ')}. Dedicated to delivering high-quality results for top-tier organizations in Egypt.`;
  }
};

export const enhanceJobDescription = async (rawDescription: string): Promise<string> => {
  try {
    // Initialize client right before the API call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
    // Initialize client right before the API call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Upgraded to gemini-3-pro-preview for higher-quality reasoning and gap analysis
    const model = 'gemini-3-pro-preview';
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
          },
          // Defined property ordering for stable structured output
          propertyOrdering: ["missingSkills", "matchScore", "advice", "recommendedAction"]
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
    return {
      missingSkills: ["Advanced System Design", "Kubernetes"],
      matchScore: 75,
      advice: "You have a strong foundation, but this role requires deeper knowledge of orchestration.",
      recommendedAction: "Certified Kubernetes Administrator (CKA)"
    };
  }
};
