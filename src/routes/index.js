const express = require('express');
const router = express.Router();
const usersRoutes = require('./users');

router.use('/user', usersRoutes);

module.exports = router;