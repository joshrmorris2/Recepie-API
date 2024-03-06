const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/oauth').isAuthenticated;

router.use('/auth', require('./oauth'));
router.use('/recipes', isAuthenticated, require('./recipes'));
router.use('/chefs', isAuthenticated, require('./chefs'));
router.use('/', require('./swagger'));

module.exports = router;
