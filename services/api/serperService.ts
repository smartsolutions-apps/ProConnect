
import { Job, JobType } from '../../types';

export const fetchLiveRealEstateJobs = async (query = "real estate jobs in Egypt"): Promise<Job[]> => {
    const myHeaders = new Headers();
    // Using the provided Serper API key
    myHeaders.append("X-API-KEY", "bd6fed2ca1368268661b42e7f3d15cb2e628e534");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ "q": query, "location": "Egypt" });
    const requestOptions = { method: 'POST', headers: myHeaders, body: raw };

    try {
        const response = await fetch("https://google.serper.dev/jobs", requestOptions);
        const result = await response.json();

        if (!result.jobs) {
            return [];
        }

        // Map the Serper JSON response to our Job format
        return result.jobs.map((job: any, index: number) => {
            // Simple mapping for job type if detected
            let jobType = JobType.FULL_TIME;
            if (job.scheduleType) {
                const schedule = job.scheduleType.toLowerCase();
                if (schedule.includes('part')) jobType = JobType.PART_TIME;
                if (schedule.includes('contract')) jobType = JobType.CONTRACT;
                if (schedule.includes('intern')) jobType = JobType.INTERNSHIP;
            }

            return {
                id: `live-job-${index}-${Date.now()}`,
                slug: `google-job-${index}-${Date.now()}`,
                title: job.title,
                companyId: job.companyName, // We'll map this by name for now as we don't have IDs
                companyName: job.companyName,
                companyLogo: job.thumbnail || '', // Serper sometimes gives thumbnails
                location: job.location,
                type: jobType,
                postedAt: job.postedAt || 'Just now',
                description: 'Visit Google Jobs for full details.', // Serper jobs result often doesn't have full description in list
                applicantsCount: 0,
                isEasyApply: false,
                // Additional fields for context if needed, but keeping strict to interface
            } as Job;
        });
    } catch (error) {
        console.error("Error fetching live jobs:", error);
        return [];
    }
};
