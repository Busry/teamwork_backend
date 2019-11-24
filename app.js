// devDep
const express = require('express');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
// Routes
const articleRoute = require('./routes/article');
const authRoute = require('./routes/auth');
const gifRoute = require('./routes/gif');

const app = express();

// app setup
app.use(fileupload({ useTempFiles: true }));
app.use(bodyParser.json());

// CRUD
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/gifs', gifRoute);
app.use('/api/v1/articles', articleRoute);

module.exports = app;
