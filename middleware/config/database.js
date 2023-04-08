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
const createTable = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL
);
`


pool.connect((err, client, done) => {
  if(err) throw err
  client.query(createTable, (err, res) => {
    if(err){
      console.log("error creating table", err.stack);
    } else if( res.command === 'CREATE'){
      console.log("table created succefully");
      const insertData = `
      INSERT INTO users (name, email) VALUES
      ('John Doe', 'john.doe@example.com'),
      ('Jane Doe', 'jane.doe@example.com');
    `;
    client.query(insertData, (err, res) => {
      if(err) {
        console.error("error inserting data");
      } else {
        console.log("data inserted succefully");
      }
    })
    } else {
      console.log("Table already exists");
    }
  })
})


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