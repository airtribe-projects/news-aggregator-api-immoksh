const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    languages: {
        type: String,
        enum: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh'],
        default: 'en'
    },
    countries: {
        type: String,
        enum: ['us', 'ca', 'gb', 'au', 'de', 'fr', 'it', 'es', 'nl', 'pl', 'ru', 'tr', 'ua', 'za'],
        default: 'us'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Preference', preferenceSchema);