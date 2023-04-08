const express = require('express');
const passport = require('../authMiddleware');
const User = require('../models/user');
const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully.' });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully.' });
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user.' });
  }
});

module.exports = router;
