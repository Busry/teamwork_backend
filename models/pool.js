// connecting to pg pools
const { Pool } = require('pg');

const config = {
  host: 'ec2-54-174-229-152.compute-1.amazonaws.com',
  user: 'rlyehroeuphxdi',
  password: '5e7177beaeeec315c4bcc9414d28c52ba4cf4d06f05a7d8bc236864a3f80ebd5',
  database: 'd4998f6tis75f8',
};

// const config = {
//   host: 'localhost',
//   user: 'teamwork',
//   password: 'teamwork2019',
//   database: 'teamwork',
// };
const pool = new Pool(config);

module.exports = pool;
