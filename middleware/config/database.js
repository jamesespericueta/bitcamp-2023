const { Pool } = require('pg');
const { Sequelize } = require('sequelize-cockroachdb');

require('dotenv').config();

const connectionString =  process.env.CONNECTION_URL;

const pool = new Pool({
  connectionString,
  application_name: "$ simple_crud"
});

const client = await pool.connect();

module.exports = Pool;