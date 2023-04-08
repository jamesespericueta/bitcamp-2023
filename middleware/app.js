const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

const session = require('express-session');
const passport = require('./authMiddleware');
const authRoutes = require('./authRoutes');
const node = require('./database');

dotenv.config();

const pool =  new Pool({
  connectionString: process.env.CONNECTION_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express()

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

app.use(express.json());
app.post('/users', async (req, res) => {
  try{
    const userID = req.body.userID
    const result = await pool.query(`
      SELECT groups.name
      FROM groups
      INNER JOIN groups_members ON group.id = group_members.groupid
      WHERE group_members.user_id = $1;
    `, [userID]);
    const groups = result.rows.map(row => row.name);
    res.send(groups);
  } catch(err) {
    console.log(err);
    res.status(500).send("Error retrieving groups");
  } 
})

// Connect to database and start server
sequelize.authenticate()
  .then(() => {
    console.log('Connected to database.');
    app.listen(3000, () => console.log('Server started on port 3000.'));
  })
  .catch((error) => console.error('Error connecting to database:', error));