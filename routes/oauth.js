const express = require('express');
const passport = require('../middleware/oauth'); // Import the authentication logic

const router = express.Router();

// Authentication routes
router.get('/google', (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to a success page or handle as needed
    res.redirect('/api-docs');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
    }
    res.redirect('/'); // Redirect to the home page or any desired page
  }); // Passport function to clear user session
});

module.exports = router;
