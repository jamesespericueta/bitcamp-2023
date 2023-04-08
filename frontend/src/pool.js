const pg = require('pg');

// Set up the connection pool
const pool = new pg.Pool({
	dialect: 'postgres',
  user: 'james',
  host: 'spotty-piglet-10075.7tt.cockroachlabs.cloud',
  database: 'defaultdb',
  port: 26257,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;