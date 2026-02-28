const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/usersController');
router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        const newUser = await registerUser(user);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser({ email, password });
        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

module.exports = router;