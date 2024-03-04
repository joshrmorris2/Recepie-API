const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/oauth').isAuthenticated;

router.use('/auth', require('./oauth'));
router.use('/auth', isAuthenticated);
router.use('/recipes', require('./recipes'));
router.use('/chefs', require('./chefs'));
router.use('/', require('./swagger'));

module.exports = router;
