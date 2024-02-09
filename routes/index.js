const express = require('express');
const router = express.Router();

router.use('/recipes', require('./recipes'));
router.use('/', require('./swagger'));

module.exports = router;
