import React, { useState } from 'react';

interface CompanyLogoProps {
    companyName: string;
    domain?: string;
    sizeClass?: string;
    className?: string; // Additional custom classes
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
    companyName,
    domain,
    sizeClass = "w-12 h-12",
    className = ""
}) => {
    const [imgSource, setImgSource] = useState<string | null>(
        domain ? `https://cdn.brandfetch.io/${domain}` : null
    );
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (imgSource && imgSource.includes('brandfetch.io') && domain) {
            // Fallback 1: Clearbit
            setImgSource(`https://logo.clearbit.com/${domain}`);
        } else {
            // Fallback 2: Initials (triggered if Clearbit fails or domain is missing)
            setHasError(true);
        }
    };

    if (!domain || hasError) {
        // Fallback: Initials
        const initials = companyName
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

        return (
            <div className={`${sizeClass} ${className} bg-slate-200 text-slate-700 font-bold flex items-center justify-center rounded-lg select-none`}>
                {initials}
            </div>
        );
    }

    return (
        <img
            src={imgSource!} // Non-null assertion safe because we check !domain above and setImgSource initializes with domain
            alt={`${companyName} Logo`}
            className={`${sizeClass} ${className} object-contain rounded-lg bg-white`}
            onError={handleError}
        />
    );
};
