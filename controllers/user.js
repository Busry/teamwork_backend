const pool = require('../models/pool');
const argon2 = require('argon2');

let hash;

exports.createUser = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  const jobRole = req.body.jobRole;
  const department = req.body.department;
  const address = req.body.address;

  try {
    hash = await argon2.hash(password, 'busry1234AbcdSalt');

    const query =
      'INSERT INTO users (firstName, lastName, email, password, gender, jobRole, department, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const data = await pool.query(query, [
      firstName,
      lastName,
      email,
      hash,
      gender,
      jobRole,
      department,
      address,
    ]);

    if (data.rowCount == 1) {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          token: 'string',
          userId: 'integer',
        },
      });
    } else {
      res.status(400).json({
        status: 'failed',
        data: {
          message: 'User not created',
          token: 'string',
          userId: 'integer',
        },
      });
    }
  } catch (err) {
    console.log('ERROR ' + err);

    if (err.message.search('duplicate') != -1) {
      res.status(400).json({
        status: 'failed',
        data: {
          message: 'User with this email already exist',
          token: 'string',
          userId: 'integer',
        },
      });
    }
  }
};
