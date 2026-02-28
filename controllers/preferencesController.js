const preferencesModel = require('../models/preferencesModel');

const createPreference = async (userId, preference) => {
    preference.userId = userId;
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