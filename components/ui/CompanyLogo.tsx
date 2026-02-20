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
        const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=f8fafc&color=0f172a&bold=true&size=128&rounded=true`;
        return <img src={fallbackUrl} alt={companyName} className={`${sizeClass} ${className} object-contain`} />;
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
