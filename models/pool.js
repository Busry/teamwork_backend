// connecting to pg pools
const { Pool } = require('pg');

const config = {
  host: 'localhost',
  user: 'teamwork',
  password: 'teamwork2019',
  database: 'teamwork',
};

const pool = new Pool(config);

module.exports = pool;
