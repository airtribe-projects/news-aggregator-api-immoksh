const express = require('express');
const router = express.Router();
const { getNews } = require('../controllers/newsController');
const { validateJWT } = require('../middlewares/authMiddleware');

router.get('/', validateJWT, async (req, res) => {
    try {
        const news = await getNews(req.user.id);
        res.status(200).json({ news });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;