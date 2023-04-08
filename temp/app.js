const express = require('express');
const session = require('express-session');
const passport = require('./authMiddleware');
const authRoutes = require('./authRoutes');
const node = require('./database');

const app = express()
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Set up session middleware
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

// Set up Passport.js middleware
//   Mounts passport._ functions to app request processing pipeline
app.use(passport.initialize()); 
app.use(passport.session());

// Set up routes
app.use('/auth', authRoutes);

// Set up error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error.' });
});

// Connect to database and start server
sequelize.authenticate()
  .then(() => {
    console.log('Connected to database.');
    app.listen(3000, () => console.log('Server started on port 3000.'));
  })
  .catch((error) => console.error('Error connecting to database:', error));