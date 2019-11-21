// devDep
const express = require('express');
const bodyParser = require('body-parser');
// Routes
const articleRoute = require('./routes/article');

const app = express();

// app setup
app.use(bodyParser.json());

// CRUD
app.use('/api/v1/articles', articleRoute);

module.exports = app;
