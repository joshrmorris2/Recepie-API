const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./oauth').isAuthenticated;

router.use('/auth', isAuthenticated());
router.use('/recipes', require('./recipes'));
router.use('/chefs', require('./chefs'));
router.use('/', require('./swagger'));

router.use('/auth', require('./oauth').router);

module.exports = router;
