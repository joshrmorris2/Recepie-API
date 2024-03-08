const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const credentials = require('./credentials.json');

passport.use(new GoogleStrategy({
    clientID: credentials.web.client_id,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: credentials.web.redirect_uris[0],
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