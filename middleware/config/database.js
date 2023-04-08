const { Sequelize } = require('sequelize-cockroachdb');

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'james',
  password: 'TgapSnNCkNO9niNpoiH7BO',
  host: 'spotty-piglet-10075.7tt.cockroachlabs.cloud',
  port: 26257,
  database: 'defaultdb',
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