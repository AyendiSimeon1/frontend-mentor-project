const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

const signup = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered'});
        }

        const user = await User.create({
            email,
            password
        });
        res.status(201).json({ user: user });

    } catch (error) {
       return res.status(500).json({ error: error});
    }
};

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
            .select('+password');
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { userId: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
        )
        
        return res.status(200).json({
            message: 'User logged in successfully',
            token,
            user
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    
};

const logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success'});
};


const resetPassword = async (req, res, next) => {
    try {
      const { token, password } = req.body;
  
  
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        throw new APIError(400, 'Token is invalid or has expired');
      }

      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
  

      createSendToken(user, 200, res);
    } catch (error) {
      next(error);
    }
  };


module.exports = {
    resetPassword,
    login,
    signup
};