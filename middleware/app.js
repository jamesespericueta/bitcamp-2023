const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

//const session = require('express-session');
//const passport = require('./authMiddleware');
//const authRoutes = require('./authRoutes');
//const node = require('./database');

dotenv.config();


const pool =  new Pool({
  connectionString: process.env.CONNECTION_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const createNewGroup = async(groupName, groupCode) => {
  const query = {
    text: 'INSERT INTO groups(name, group_code) VALUES($1, $2) RETURNING id',
    values: [groupName, groupCode],
  };

  try {
    const result = await pool.query(query);
    console.log(`new group created with id: ${result.rows[0].id}`);
  } catch (err) {
    console.error('Error creating group', err.stack);
  }
}

//createNewGroup('Test', 'ABf13');

const app = express()

// Set up session middleware
/*
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));
*/
// Set up Passport.js middleware
//   Mounts passport._ functions to app request processing pipeline
//app.use(passport.initialize()); 
//app.use(passport.session());
// Set up routes
//app.use('/auth', authRoutes);

// Set up error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error.' });
});

app.use(express.json());

//adds a person to a group given their userID and groupCode
app.post('/api/user_groups', async(req, res) => {
  try{
    const userID = req.body.userID;
    const groupCode = req.body.groupCode;
    const result = await pool.query('SELECT group_id FROM groups WHERE group_code = $1', [groupCode]);
    const groupID = result.rows[0].group_id;

    await pool.query('INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)', [user_id, group_id]);
    res.status(201).send("User added to group successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//pulls all the users that are in the same group as the client
app.post('/api/users', async (req, res) => {
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
});

//initializes a group using the userID of the client
//Generates the random unique string
//
app.post('/api/createGroup', async(req, res) => {
  try{

  } catch(err){
    console.error(err);
    res.status(500).send("Error retrieving groups");
  }
})

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
// Connect to database and start server
/*
sequelize.authenticate()
  .then(() => {
    console.log('Connected to database.');
    app.listen(3000, () => console.log('Server started on port 3000.'));
  })
  .catch((error) => console.error('Error connecting to database:', error));
  */