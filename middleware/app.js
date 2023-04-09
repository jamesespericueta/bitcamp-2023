const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');


//const session = require('express-session');
//const passport = require('./authMiddleware');
//const authRoutes = require('./authRoutes');
//const node = require('./database');

dotenv.config();

const headerJson = {
  header: { 'Content-Type': 'application/json'}
}

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

const createNewUser = async(username, email, password) => {
}

//createNewUser("john", "john@example.com", "pass");

createNewGroup('Test', 'ABf13');

const app = express();
app.use(express.json());
app.use(cors());

// Set up error handling middleware
app.use((err, req, res, next) => {
  console.log("working");
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error.' });
});

app.post('/api/register', async(req, res) => {
  try{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const query = {
      text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id',
      values: [username, email, password],
    };

    const result = await pool.query(query);
    console.log(`new user created with id: ${result.rows[0].id}`);
    res.send({success: true});
  } catch(err){
    console.error(err);
    res.send({success: false});
  }
})

//adds a person to a group given their userID and groupCode
app.post('/api/user_groups', async(req, res) => {
  try{
    const userID = req.body.userID;
    const groupCode = req.body.groupCode;
    const result = await pool.query('SELECT group_id FROM groups WHERE group_code = $1', [groupCode]);
    const groupID = result.rows[0].group_id;

    await pool.query('INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)', [userID, groupID]);
    res.status(200).send("User added to group successfully");
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
      pool.query('SELECT EXISTS(SELECT 1 FROM groups WHERE group_code = $1)', [groupCodeToFind], (err, result) => {
        if(err){
          return console.error('Error executing query', err.stack);
        } 
        const exists = result.rows[0].exists;
       if(exists){
        res.status(200).send("Successful")
       }
      })
  } catch(err){
    console.error(err);
    res.status(500).send("Error retrieving groups");
  }
})
app.post('/api/joinGroup', async(req, res) => {
  try{
    console.log("in");
      const groupCodeToFind = req.body.groupCode;
      const userID = req.body.userID;
      pool.query('SELECT EXISTS(SELECT 1 FROM groups WHERE group_code = $1)', [groupCodeToFind], (err, result) => {
        if(err){
          return console.error('Error executing query', err.stack);
        } 
        const exists = result.rows[0].exists;
       if(exists){
          res.status(200).send("Successful")
       } else{
          res.status(501).send("Fail");
       }
      })
  } catch(err) {

  }
  res.status(500).send
})

app.post('/api/login', async(req, res) => {
  try{
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (err, result) => {
      if (err) {
        console.error('Error executing query', err.stack);
        return res.status(500).json({ error: 'Error executing query' });
      }
  
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      console.log(result.rows[0]);
      // User exists, return success
      return res.json({ success: true, userID: result.rows[0].id });
    });
  } catch(err){
    console.error(err);
  }
})


//TODO: create a temporary use so that i can test the email and password login

const server = http.createServer(app);

server.listen(8000, () => {
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