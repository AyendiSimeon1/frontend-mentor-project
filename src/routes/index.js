const authRoutes = require('../routes/auth.routes');
const noteRoutes = require('../routes/note.routes');
const express = require('express');

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/note', noteRoutes);

module.exports = router;

