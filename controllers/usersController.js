const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const jwtSecret = process.env.JWT_SECRET;

const registerUser = async (user) => {
    if (!user.name) {
        throw new Error('Name is required');
    }
    if (!user.email) {
        throw new Error('Email is required');
    }
    if (!user.password) {
        throw new Error('Password is required');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        throw new Error('Invalid email address');
    }
    if (!user.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/)) {
        throw new Error('Password must contain at least one special character');
    }
    if (user.password.length < 8 || user.password.length > 32) {
        throw new Error('Password must be between 8 and 32 characters long');
    }
    if (!user.password.match(/[a-zA-Z]/)) {
        throw new Error('Password must contain at least one letter');
    }
    if (!user.password.match(/[0-9]/)) {
        throw new Error('Password must contain at least one number');
    }
    if (!user.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/)) {
        throw new Error('Password must contain at least one special character');
    }
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await usersModel.create(user);
    return newUser;
};

const loginUser = async ({email, password}) => {
    const user = await usersModel.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    const body = {
        email: email,
        role: user.role,
        name: user.name,
        id: user._id
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign(body, jwtSecret, { expiresIn: '1h' });
    return token;
};

module.exports = { registerUser, loginUser };