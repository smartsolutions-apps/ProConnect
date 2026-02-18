export const RATE_LIMITS = {
    USER_DAILY_APPLY_LIMIT: 5,
    COMPANY_DAILY_POST_LIMIT: 3,
    COMPANY_MONTHLY_POST_LIMIT: 5
};

interface RateLimitData {
    count: number;
    lastActionDate: string; // ISO Date String YYYY-MM-DD
}

// Helper to get today's date string YYYY-MM-DD
const getTodayString = () => new Date().toISOString().split('T')[0];
const getMonthString = () => new Date().toISOString().slice(0, 7); // YYYY-MM

export const canUserApply = (): boolean => {
    const today = getTodayString();
    const storageKey = `rate_limit_user_apply_${today}`;

    // Check local storage
    const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10);

    return currentCount < RATE_LIMITS.USER_DAILY_APPLY_LIMIT;
};

export const incrementUserApplyCount = (): void => {
    const today = getTodayString();
    const storageKey = `rate_limit_user_apply_${today}`;
    const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10);

    localStorage.setItem(storageKey, (currentCount + 1).toString());
};

export const canCompanyPost = (): boolean => {
    const today = getTodayString();
    const month = getMonthString();

    const dailyKey = `rate_limit_company_post_daily_${today}`;
    const monthlyKey = `rate_limit_company_post_monthly_${month}`;

    const dailyCount = parseInt(localStorage.getItem(dailyKey) || '0', 10);
    const monthlyCount = parseInt(localStorage.getItem(monthlyKey) || '0', 10);

    // Check both limits
    if (dailyCount >= RATE_LIMITS.COMPANY_DAILY_POST_LIMIT) return false;
    if (monthlyCount >= RATE_LIMITS.COMPANY_MONTHLY_POST_LIMIT) return false;

    return true;
};

export const incrementCompanyPostCount = (): void => {
    const today = getTodayString();
    const month = getMonthString();

    const dailyKey = `rate_limit_company_post_daily_${today}`;
    const monthlyKey = `rate_limit_company_post_monthly_${month}`;

    const dailyCount = parseInt(localStorage.getItem(dailyKey) || '0', 10);
    const monthlyCount = parseInt(localStorage.getItem(monthlyKey) || '0', 10);

    localStorage.setItem(dailyKey, (dailyCount + 1).toString());
    localStorage.setItem(monthlyKey, (monthlyCount + 1).toString());
};

export const getRemainingUserApplies = (): number => {
    const today = getTodayString();
    const storageKey = `rate_limit_user_apply_${today}`;
    const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10);

    return Math.max(0, RATE_LIMITS.USER_DAILY_APPLY_LIMIT - currentCount);
};
