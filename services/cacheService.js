const CACHE_TTL_MS = (parseInt(process.env.CACHE_TTL_MINUTES, 10) || 10) * 60 * 1000;

const cache = new Map();

function buildCacheKey(country, language, categories) {
    const sortedCategories = [...(categories || [])].sort().join(',');
    return `news:${country}:${language}:${sortedCategories}`;
}

async function get(key) {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
        await deleteKey(key);
        return null;
    }
    return entry.data;
}

async function set(key, data) {
    cache.set(key, {
        data,
        expiresAt: Date.now() + CACHE_TTL_MS
    });
}

async function deleteKey(key) {
    cache.delete(key);
}

async function getCachedNews(country, language, categories) {
    const key = buildCacheKey(country, language, categories);
    return get(key);
}

async function setCachedNews(country, language, categories, data) {
    const key = buildCacheKey(country, language, categories);
    await set(key, data);
}

module.exports = {
    get,
    set,
    deleteKey,
    buildCacheKey,
    getCachedNews,
    setCachedNews
};
