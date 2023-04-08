const { Client } = require('pg');

const client = new Client({
  user: 'your_username',
  host: 'your_hostname',
  database: 'your_database_name',
  port: 26257,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = client;
