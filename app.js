// devDep
const express = require('express');
const bodyParser = require('body-parser');
// Routes
const articleRoute = require('./routes/article');
const authRoute = require('./routes/auth');

const app = express();

// app setup
app.use(bodyParser.json());

// CRUD
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/articles', articleRoute);

module.exports = app;
