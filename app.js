const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotEnv = require('dotenv');
const path = require('path');
const flash = require('connect-flash');
const morgan = require('morgan');
// const createError = require('http-errors');
const { sequelize } = require('./models/index');


const app = express();
dotEnv.config();
sequelize.sync();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;

// set lib
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', port);

// use
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extends: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    HttpOnly: true,
    secure: true
  }
}));
app.use(flash());


// router use
app.use('/', require('./routers/index'));



// 404 not found
app.use((req, res, next) => {
  // const notFound = createError(404, 'notFound');
  // next(notFound);
  const e = new Error('Not Found');
  e.status(404);
  next(e);
});

app.use((e, req, res, next) => {
  res.locals.message = e.message;
  res.locals.error = env === 'development' ? e : {};
  res.status(e.status || 500);
  res.render('error');
});


app.listen(port, () => {
  console.log('server is listening ' + port);
});










