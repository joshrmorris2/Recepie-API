const express = require('express');
const passport = require('../middleware/oauth'); // Import the authentication logic

const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('already authenticated')
      return next();
    }
    // Redirect to login or handle unauthorized access as needed
    console.log('need authentication')
    res.redirect('/auth/google');
  };
  
// Authentication routes
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to a success page or handle as needed
    res.redirect('/api-docs');
  }
);

module.exports = { router, isAuthenticated };
