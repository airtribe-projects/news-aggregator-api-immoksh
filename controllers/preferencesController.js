const preferencesModel = require('../models/preferencesModel');

const createPreference = async (userId, preference) => {
    preference.userId = userId;
    if (!preference.categories) {
        throw new Error('Categories are required');
    }
    if (!preference.languages) {
        preference.languages = 'en';
    }
    if (!preference.countries) {
        preference.countries = 'us';
    }
    if (!preference.categories.every(category => ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'].includes(category))) {
        throw new Error('Invalid category');
    }
    if (!preference.languages.every(language => ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh'].includes(language))) {
        throw new Error('Invalid language');
    }
    if (!preference.countries.every(country => ['us', 'ca', 'gb', 'au', 'de', 'fr', 'it', 'es', 'nl', 'pl', 'ru', 'tr', 'ua', 'za'].includes(country))) {
        throw new Error('Invalid country');
    }
    const newPreference = await preferencesModel.create(preference);
    return newPreference;
};

const getPreferences = async (userId) => {
    const preferences = await preferencesModel.find({ userId });
    if (!preferences) {
        return [];
    }
    return preferences;
};

const updatePreference = async (userId, preference) => {
    const updatedPreference = await preferencesModel.findOneAndUpdate({ userId }, preference, { new: true });
    return updatedPreference;
};

module.exports = { createPreference, getPreferences, updatePreference };