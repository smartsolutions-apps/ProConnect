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
    const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=f8fafc&color=0f172a&bold=true&size=128&rounded=true`;
    const [imgSource, setImgSource] = useState<string>(
        domain ? `https://cdn.brandfetch.io/${domain}` : fallbackUrl
    );

    const handleError = () => {
        if (imgSource.includes('brandfetch.io') && domain) {
            // Fallback 1: Clearbit
            setImgSource(`https://logo.clearbit.com/${domain}`);
        } else if (!imgSource.includes('ui-avatars.com')) {
            // Fallback 2: ui-avatars (triggered if Clearbit fails or domain is missing)
            setImgSource(fallbackUrl);
        }
    };

    return (
        <img
            src={imgSource}
            alt={`${companyName} Logo`}
            className={`${sizeClass} ${className} object-contain rounded-lg bg-white`}
            onError={handleError}
        />
    );
};
