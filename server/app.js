require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@h8-wonder-lc1p2-shard-00-00-8ooaq.gcp.mongodb.net:27017,h8-wonder-lc1p2-shard-00-01-8ooaq.gcp.mongodb.net:27017,h8-wonder-lc1p2-shard-00-02-8ooaq.gcp.mongodb.net:27017/h8-wonder-lc1p2?ssl=true&replicaSet=h8-wonder-lc1p2-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('ERR ==> ', err)
  } else {
    console.log("Connected to Atlas database")
  }
});
// mongoose.connect(`mongodb://localhost:27017/h8-wonder-lc1p2`, { useNewUrlParser: true });

const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/events', eventsRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
