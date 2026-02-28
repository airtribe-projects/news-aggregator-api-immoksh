const express = require('express');
const router = express.Router();
const { createPreference, getPreferences, updatePreference } = require('../controllers/preferencesController');
const { validateJWT } = require('../middlewares/authMiddleware');

router.get('/', validateJWT, async (req, res) => {
    const preferences = await getPreferences(req.user.id);
    if (!preferences) {
        return res.status(404).json({ message: 'Preferences not found' });
    }
    res.status(200).json({ preferences });
});

router.post('/', validateJWT, async (req, res) => {
    const preference = await createPreference(req.user.id, req.body);
    res.status(201).json({ preference });
});

router.put('/', validateJWT, async (req, res) => {
    const preference = await updatePreference(req.user.id, req.body);
    res.status(200).json({ preference });
});

module.exports = router;