const path = require('path');
const express = require('express');
const app = express();
const productRoute = require('./api/routes/product.route');
const orderRoute = require('./api/routes/order.route');
const userRoute = require('./api/routes/user.route');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log('Mongo DB Connection is established successfully!');
});

app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static('public'));

app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/users', userRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message
  });
});

module.exports = app;
