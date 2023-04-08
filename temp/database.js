const { Sequelize } = require('sequelize-cockroachdb');

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: '<username>',
  password: '<password>',
  host: '<host>',
  port: 26257,
  database: '<database>',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  define: {
    timestamps: false
  }
});

module.exports = sequelize;