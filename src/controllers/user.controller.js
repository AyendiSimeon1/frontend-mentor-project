const jwt = require('jsonwebtoke');
const User = require('../models/User');

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
            throw new Error('Email already registered');
        }

        const user = await User.create({
            email,
            password
        });


    } catch (error) {
        next(error);
    }
};

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
            .select('+password');
        
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswrodValid) {
            throw new Error('Invalid email or password');
        }
        } catch (error) {
            throw new Error(error);
        }
    
};

const logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success'});
};


const resetPasswor = async (req, res, next) => {
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
  