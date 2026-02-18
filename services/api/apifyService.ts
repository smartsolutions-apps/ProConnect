
import { Job, JobType } from '../../types';

const APIFY_TOKEN = import.meta.env.VITE_APIFY_TOKEN;
// Specific Actor ID for a LinkedIn Job Scraper (e.g., 'hMvNSpz3JloGh5gJI' is a common one, but using a generic placeholder / path)
// We will assume use of a standard LinkedIn Scraper actor.
const ACTOR_ID = 'your-actor-id'; // This would need to be a specific actor ID from Apify Store
const APIFY_API_URL = 'https://api.apify.com/v2';

export const triggerLinkedInScrape = async (keywords: string, location: string = 'Egypt'): Promise<string | null> => {
    if (!APIFY_TOKEN) {
        console.warn('Apify token is missing. Please set VITE_APIFY_TOKEN in your .env file.');
        return null;
    }

    try {
        // Start the actor run
        const response = await fetch(`${APIFY_API_URL}/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keywords: keywords,
                location: location,
                limit: 10, // Limit to 10 for demo purposes
            }),
        });

        if (!response.ok) {
            // If the actor ID is invalid (since it's a placeholder), we might fail here.
            // For the purpose of this infrastructure task, we handle the error gracefully.
            console.error(`Apify trigger failed: ${response.statusText}`);
            return null;
        }

        const data = await response.json();
        return data.data.id; // Return the Run ID

    } catch (error) {
        console.error('Error triggering Apify scraper:', error);
        return null;
    }
};

export const getApifyResults = async (runId: string): Promise<Job[]> => {
    if (!APIFY_TOKEN) return [];

    try {
        // Poll for results - in a real app we might want to wait or use webhooks. 
        // Here we assume the caller handles the timing or we check if finished.
        // For simplicity, we just try to fetch the dataset items.

        const response = await fetch(`${APIFY_API_URL}/actor-runs/${runId}/dataset/items?token=${APIFY_TOKEN}`);

        if (!response.ok) {
            return [];
        }

        const data = await response.json();

        // Map Apify results to Job interface
        // Note: The structure depends heavily on the specific Actor used. 
        // This mapping assumes a standard LinkedIn scraper output.
        return data.map((item: any) => ({
            id: item.id || `li-${Math.random().toString(36).substr(2, 9)}`,
            slug: `linkedin-${item.id || Math.random().toString(36).substr(2, 9)}`,
            title: item.title,
            companyId: 'external_linkedin',
            companyName: item.companyName,
            companyLogo: '',
            location: item.location,
            type: JobType.FULL_TIME, // LinkedIn scraper might not strictly return types matching our enum
            postedAt: item.postedAt || 'Recently',
            description: item.description,
            applicantsCount: item.applicants || 0,
            isEasyApply: false,
            isDirectOffer: false,
        } as Job));

    } catch (error) {
        console.error('Error fetching Apify results:', error);
        return [];
    }
}
