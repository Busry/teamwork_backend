const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const pool = require('../models/pool');

exports.createUser = async (req, res, next) => {
  let hash;

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
    console.log('insert data', data);
    if (data.rowCount == 1) {
      const id = await pool.query('SELECT userid FROM users WHERE email = $1', [
        email,
      ]);
      res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          token: 'new-user',
          userId: id.rows[0].userid,
        },
      });
    } else {
      res.status(400).json({
        status: 'failed',
        error: 'User not created',
      });
    }
  } catch (err) {
    console.log('ERROR ' + err);

    if (err.message.search('duplicate') != -1) {
      res.status(400).json({
        status: 'failed',
        error: 'User with this email already exist',
      });
    }
  }
};

exports.login = async (req, res, next) => {
  console.log(req.body, 'request body');
  const email = req.body.email;
  const password = req.body.password;
  try {
    const query = 'SELECT userId,password from users where email = $1';
    const result = await pool.query(query, [email]);
    if (result.rowCount == 1) {
      console.log(result.rows[0].password, 'returned password');
      console.log(password, 'entered password');
      console.log(result.rows[0], 'query result');
      const areMatch = await argon2.verify(result.rows[0].password, password);
      if (areMatch) {
        const token = jwt.sign(
          { userId: result.rows[0].userid },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' }
        );
        res.status(200).json({
          status: 'success',
          data: {
            token: token,
            userId: result.rows[0].userid,
          },
        });
      } else {
        res.status(400).json({
          status: 'Denied access',
          error: 'Incorrect password',
        });
      }
    } else {
      res.status(400).json({
        status: 'failed',
        error: 'email not found',
      });
    }
  } catch (err) {
    console.log('ERROR ' + err);
  }
};
