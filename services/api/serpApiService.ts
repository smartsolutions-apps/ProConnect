
import { Job, JobType } from '../../types';

const SERPAPI_KEY = import.meta.env.VITE_SERPAPI_KEY;
// Using a proxy or direct fetch. For this implementation, we'll use a direct fetch to SerpApi's endpoint,
// knowing that in a production environment this should be proxied to hide the key.
const BASE_URL = 'https://serpapi.com/search.json';

export const fetchGoogleJobs = async (query: string, location: string = 'Egypt'): Promise<Job[]> => {
    if (!SERPAPI_KEY) {
        console.warn('SerpApi key is missing. Please set VITE_SERPAPI_KEY in your .env file.');
        return [];
    }

    try {
        // Construct the URL with query parameters
        const url = new URL(BASE_URL);
        url.searchParams.append('engine', 'google_jobs');
        url.searchParams.append('q', `${query} in ${location}`);
        url.searchParams.append('api_key', SERPAPI_KEY);
        url.searchParams.append('hl', 'en'); // Host language
        url.searchParams.append('gl', 'eg'); // Geolocation

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`SerpApi request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (!data.jobs_results) {
            return [];
        }

        // Map SerpApi results to our Job interface
        return data.jobs_results.map((job: any) => {
            // Attempt to map detected extensions to JobType
            let jobType = JobType.FULL_TIME; // Default
            if (job.detected_extensions) {
                if (job.detected_extensions.schedule_type) {
                    const schedule = job.detected_extensions.schedule_type.toLowerCase();
                    if (schedule.includes('part-time')) jobType = JobType.PART_TIME;
                    if (schedule.includes('contract')) jobType = JobType.CONTRACT;
                    if (schedule.includes('internship')) jobType = JobType.INTERNSHIP;
                }
            }

            return {
                id: job.job_id || Math.random().toString(36).substr(2, 9),
                slug: `google-job-${job.job_id}`, // Generate a slug
                title: job.title,
                companyId: 'external_google', // Placeholder for external companies
                companyName: job.company_name,
                companyLogo: job.thumbnail || '', // SerpApi sometimes provides a thumbnail
                location: job.location,
                type: jobType,
                postedAt: job.detected_extensions?.posted_at || 'Recently',
                description: job.description,
                applicantsCount: 0, // Not always available
                salaryRange: job.detected_extensions?.salary, // May be null
                isEasyApply: false, // External jobs usually require navigating to the source
                isDirectOffer: false,
            } as Job;
        });

    } catch (error) {
        console.error('Error fetching jobs from SerpApi:', error);
        return [];
    }
};
