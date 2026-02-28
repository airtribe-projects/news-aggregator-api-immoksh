const axios = require('axios');
const apiKey = process.env.GNEWS_API_KEY;
const preferencesModel = require('../models/preferencesModel');
const { getCachedNews, setCachedNews } = require('../services/cacheService');

const getNews = async (userId) => {
    const preferences = await preferencesModel.findOne({ userId });
    if (!preferences) {
        return [];
    }
    const country = preferences.countries || 'us';
    const language = preferences.languages || 'en';
    const categories = preferences.categories || [];

    const cached = await getCachedNews(country, language, categories);
    if (cached) {
        return cached;
    }

    const response = await axios.get(`https://gnews.io/api/v4/top-headlines?country=${country}&apikey=${apiKey}&language=${language}&category=${categories.join(',')}`);
    const data = response.data;
    await setCachedNews(country, language, categories, data);
    return data;
};

module.exports = { getNews };