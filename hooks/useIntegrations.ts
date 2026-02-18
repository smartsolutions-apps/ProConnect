import { useState, useEffect } from 'react';

export interface IntegrationState {
    id: string; // 'serper' | 'gemini' | 'brandfetch'
    name: string;
    isEnabled: boolean;
    apiKey: string; // stored in localStorage (masked in UI)
    frequency: 'manual' | '12h' | '24h' | 'weekly';
    lastSync?: string;
    description: string;
}

const DEFAULT_INTEGRATIONS: IntegrationState[] = [
    {
        id: 'serper',
        name: 'Serper.dev (Google Search)',
        description: 'Powers Job Search, News Crawling, and Event Discovery.',
        isEnabled: true,
        apiKey: '',
        frequency: 'manual'
    },
    {
        id: 'gemini',
        name: 'Google Gemini AI',
        description: 'Rewrites news into social posts and extracts event details.',
        isEnabled: true,
        apiKey: '',
        frequency: 'manual'
    },
    {
        id: 'brandfetch',
        name: 'Brandfetch',
        description: 'Fetches high-quality logos for Companies.',
        isEnabled: true,
        apiKey: '',
        frequency: 'manual'
    },
    {
        id: 'apify',
        name: 'Apify Scraper',
        description: 'Advanced web scraping for Company Data (Mocked for now).',
        isEnabled: true,
        apiKey: '',
        frequency: 'manual'
    },
    {
        id: 'affinda',
        name: 'Affinda AI Parser',
        description: 'Parses PDF Resumes to auto-fill user profiles.',
        isEnabled: true,
        apiKey: '',
        frequency: 'manual'
    }
];

export const useIntegrations = () => {
    const [integrations, setIntegrations] = useState<IntegrationState[]>([]);

    // Load from LocalStorage on mount (and merge with defaults for new features)
    useEffect(() => {
        const stored = localStorage.getItem('admin_integrations');
        if (stored) {
            const parsedStored: IntegrationState[] = JSON.parse(stored);
            // Merge defaults: keep stored state if exists, otherwise add new default
            const merged = DEFAULT_INTEGRATIONS.map(def => {
                const existing = parsedStored.find(p => p.id === def.id);
                return existing ? { ...def, ...existing } : def; // Preserve stored values but keep structure
            });
            setIntegrations(merged);
        } else {
            setIntegrations(DEFAULT_INTEGRATIONS);
        }
    }, []);

    // Save to LocalStorage whenever state changes
    useEffect(() => {
        if (integrations.length > 0) {
            localStorage.setItem('admin_integrations', JSON.stringify(integrations));
        }
    }, [integrations]);

    const toggleIntegration = (id: string) => {
        setIntegrations(prev => prev.map(int =>
            int.id === id ? { ...int, isEnabled: !int.isEnabled } : int
        ));
    };

    const updateApiKey = (id: string, key: string) => {
        setIntegrations(prev => prev.map(int =>
            int.id === id ? { ...int, apiKey: key } : int
        ));
    };

    const updateFrequency = (id: string, freq: IntegrationState['frequency']) => {
        setIntegrations(prev => prev.map(int =>
            int.id === id ? { ...int, frequency: freq } : int
        ));
    };

    const isIntegrationActive = (id: string): boolean => {
        const integration = integrations.find(i => i.id === id);
        return integration ? integration.isEnabled : false;
    };

    // Returns stored key OR falls back to env var
    const getApiKey = (id: string): string => {
        const integration = integrations.find(i => i.id === id);
        if (integration && integration.apiKey) {
            return integration.apiKey;
        }

        // Fallback to Env Vars
        if (id === 'serper') return import.meta.env.VITE_SERPER_KEY || '';
        if (id === 'gemini') return import.meta.env.VITE_GEMINI_KEY || '';
        if (id === 'brandfetch') return import.meta.env.VITE_BRANDFETCH_KEY || '';

        return '';
    };

    return {
        integrations,
        toggleIntegration,
        updateApiKey,
        updateFrequency,
        isIntegrationActive,
        getApiKey
    };
};
