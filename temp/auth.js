const { Pool } = require('pg');

const pool = new Pool({
  dialect: 'postgres',
  user: 'james',
  host: 'spotty-piglet-10075.7tt.cockroachlabs.cloud',
  database: 'defaultdb',
  password: 'TgapSnNCkNO9niNpoiH7BO',
  port: 26257,
  ssl: {
    rejectUnauthorized: false,
  },
});

const register = (req, res) => {
  const { username, password } = req.body;

  // check if username already exists
  const query = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [username],
  };
  pool.query(query, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred. Please try again later.' });
    } else if (result.rowCount > 0) {
      res.status(409).json({ message: 'Username already exists. Please choose a different username.' });
    } else {
      // insert new user into database
      const insertQuery = {
        text: 'INSERT INTO users (username, password) VALUES ($1, $2)',
        values: [username, password],
      };
      pool.query(insertQuery, (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'An error occurred. Please try again later.' });
        } else {
          res.status(201).json({ message: 'User registered successfully.' });
        }
      });
    }
  });
};

module.exports = { register };
