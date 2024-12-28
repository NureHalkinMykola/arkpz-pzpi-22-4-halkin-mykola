const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Waiter = require('../models/Relations').Waiter;

const login = async (req, res) => {
    const { lastName, name, password } = req.body;

    try {
        const waiter = await Waiter.findOne({ where: { lastName, name } });
        
        if (!waiter) {
            return res.status(400).json({ message: 'Waiter not found' });
        }
        const isPassword = await bcrypt.compare(password, waiter.password);
        if (!isPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const isAdmin = name == 'admin' && lastName == 'admin';

        req.session.waiter = {
            waiterId: waiter.waiterId,
            isAdmin: isAdmin
        };
        return res.status(200).json({ message: 'Login successful', waiter: req.session.waiter });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({message: error.message});
    }
};

//IoT device login
const loginDevice = (req, res) => {
    const { token } = req.body;

    try {
        const tokenIndex = req.session.deviceTokens.findIndex(device => device.token === token);
        if (tokenIndex == -1) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        req.session.device = { 
            token: token,
            isAuthenticated: true
        };
        req.session.deviceTokens.splice(tokenIndex, 1);
        return res.status(200).json({ message: 'Device logged in successfully', device: req.session.device });
    } catch (error) {
        console.error('Login device error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to logout' });
            }
            return res.status(200).json({ message: 'Logged out successfully' });
        });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: error.message });
    }
};

//waiter check
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.waiter) {
        return next();
    }
    return res.status(401).json({ message: 'Please login to continue' });
};

//IoT device check
const isDeviceAuthenticated = (req, res, next) => {
    if (req.session && req.session.device) {
        return next();
    }
    return res.status(401).json({ message: 'Please login to continue' });
};

//admin check
const isAdmin = (req, res, next) => {
    if (req.session && req.session.waiter && req.session.waiter.isAdmin) {
        return next();
    }
    return res.status(401).json({ message: 'System administrator only' });
};

//generate tokens to validate IoT device
const generateDeviceToken = (req, res) => {
    const token = crypto.randomBytes(32).toString('hex');

    if (!req.session.deviceTokens) {
        req.session.deviceTokens = [];
    }
    const tokenData = {
        token: token,
    };
    req.session.deviceTokens.push(tokenData);

    return res.status(200).json({ message: token });
};

module.exports = {
    login,
    logout,
    isAuthenticated,
    isAdmin,
    generateDeviceToken,
    loginDevice,
    isDeviceAuthenticated
};