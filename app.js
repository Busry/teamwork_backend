// devDep
const express = require('express');
const bodyParser = require('body-parser');
// Routes
const setupRoute = require('./routes/setup');

const app = express();

// app setup
app.use(bodyParser.json());

// CRUD
app.use('/', setupRoute);

module.exports = app;
