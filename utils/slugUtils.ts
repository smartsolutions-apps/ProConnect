
export const generateSlug = (text: string, appendDate: boolean = false): string => {
    if (!text) return '';

    const cleanText = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-'); // Replace spaces with hyphens

    if (appendDate) {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${cleanText}-${year}${month}${day}`;
    }

    return cleanText;
};
