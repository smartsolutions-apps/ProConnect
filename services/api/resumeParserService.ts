export interface ParsedResume {
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    summary: string;
    skills: string[];
    experience: {
        company: string;
        role: string;
        years: string;
    }[];
}

// Helper to check integration status (duplicated from other services for independence)
const isAffindaEnabled = (): boolean => {
    if (typeof window === 'undefined') return true;
    try {
        const stored = localStorage.getItem('admin_integrations');
        if (!stored) return true; // Default to true if not configured
        const integrations = JSON.parse(stored);
        const integration = integrations.find((i: any) => i.id === 'affinda');
        return integration ? integration.isEnabled : true;
    } catch (e) {
        return true;
    }
};

export const parseResumePdf = async (file: File): Promise<ParsedResume> => {
    // 1. Check Kill Switch
    if (!isAffindaEnabled()) {
        throw new Error("Parsing is currently disabled by Admin.");
    }

    // 2. Simulate API Network Delay (2.5s)
    await new Promise(resolve => setTimeout(resolve, 2500));

    // 3. Return Mock Data (Simulating Affinda API Response)
    // In a real app, we would use FormData to send 'file' to the endpoint.
    return {
        firstName: "Mohamed",
        lastName: "Ali",
        email: "extracted@email.com",
        title: "Senior Architect",
        summary: "Over 8 years of experience in architectural design, project management, and BIM modeling. specialized in high-rise residential complexes.",
        skills: ["AutoCAD", "Revit", "Project Management", "3D Max", "BIM", "Leadership"],
        experience: [
            {
                company: "Orascom Construction",
                role: "Senior Site Engineer",
                years: "2020 - Present"
            },
            {
                company: "Talaat Moustafa Group",
                role: "Junior Architect",
                years: "2016 - 2020"
            }
        ]
    };
};
