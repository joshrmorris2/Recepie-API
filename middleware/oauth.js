const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'https://recipe-api-ma9i.onrender.com/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // Store user information or perform custom logic here
    return done(null, profile);
  }
));

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Middleware to check if the user is authenticated
passport.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // Redirect to login or handle unauthorized access as needed
  res.redirect('/auth/google');
};

module.exports = passport;