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
        type: [String],
        required: false
    },
    countries: {
        type: [String],
        required: false
    },
    sources: {
        type: [String],
        required: false
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