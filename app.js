// devDep
const express = require('express');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const cors = require('cors');
// Routes
const articleRoute = require('./routes/article');
const authRoute = require('./routes/auth');
const gifRoute = require('./routes/gif');
const feedRoute = require('./routes/feed');

const app = express();

// app setup
app.use(fileupload({ useTempFiles: true }));
app.use(bodyParser.json());
app.use(cors());
// set header for CORS access
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, x-auth-token, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

// CRUD
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/gifs', gifRoute);
app.use('/api/v1/articles', articleRoute);
app.use('/api/v1/feed', feedRoute);

module.exports = app;
