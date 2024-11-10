const express = require('express');
const { login, signup, resetPassword } = require('../controllers/user.controller');
const authRouter = express.Router();


authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('/resetPassword',resetPassword);


module.exports = authRouter;


