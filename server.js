const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const https = require('https');
const cors = require('cors');
// var fileupload = require('express-fileupload');
const { encrypt } = require('./middleware/encrp');
const multer = require('multer');
const nodemailer = require('nodemailer');
require('dotenv').config();
// const start = require('./script');

app.use(
  cors({
    origin: '*',
  }),
);

const MongoDBURI = process.env.MONGO_URI || 'mongodb://0.0.0.0/kratiBackend';

mongoose.connect(MongoDBURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  retryWrites: false,
  retryWrites: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Successfully connected to DB');
  // start();
});

app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  }),
);

//app.use(formData.parse());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().array());

// const index = require('./routes/user','./routes/index');
// app.use('/', index);
app.use(require('./routes'));

app.get('/api', (req, res) => {
  res.json({ status: true, success: true });
});



app.post('/encrypt', async (req, res) => {
  let encryptedData = await encrypt(req.body.data);
  res.json({ status: true, success: encryptedData });
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

//Port handler
let PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});


