const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//BodyParser Middleware
app.use(express.json());

const uri = process.env.ATLAS_URI;

//connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//Use Routes
const users = require('./routes/api/users.api');
const auth = require('./routes/api/auth.api');
app.use('/api/users', users);
app.use('/api/auth', auth)

//Starts Server
app.listen(port, () => console.log(`Server started on port ${port}`));