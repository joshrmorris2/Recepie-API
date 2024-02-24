const express = require('express');
const router = express.Router();

router.use('/recipes', require('./recipes'));
router.use('/chefs', require('./chefs'));
router.use('/', require('./swagger'));

module.exports = router;
