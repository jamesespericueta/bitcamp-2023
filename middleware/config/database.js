const { Pool } = require('pg');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const connectionString =  process.env.CONNECTION_URL;

const pool = new Pool({
  connectionString,
  ssl: {rejectUnauthorized: false},
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Connected to database at ${res.rows[0].now}`);
  }
});
app

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})