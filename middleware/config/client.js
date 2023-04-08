const { Client } = require('pg');

const client = new Client({
	dialect: 'postgres',
  user: 'james',
  host: 'spotty-piglet-10075.7tt.cockroachlabs.cloud',
  database: 'defaultdb',
  port: 26257,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = client;
