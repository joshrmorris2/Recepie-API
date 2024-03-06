const express = require('express');
const passport = require('../middleware/oauth'); // Import the authentication logic

const router = express.Router();
  
// Authentication routes
router.get('/google', (req, res, next) => {
  console.log('Entering /auth/google route');
  passport.authenticate('google', { scope: ['profile', 'email'] })
});

router.get('/google/callback', (req, res, next) => {
  console.log('Entering /auth/google/callback route');
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to a success page or handle as needed
    res.redirect('/api-docs');
  }
});

module.exports = router;
