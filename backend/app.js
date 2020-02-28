const express = require('express');
const app = express();
const productRoute = require('./api/routes/product.route');
const orderRoute = require('./api/routes/order.route');
const userRoute = require('./api/routes/user.route');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const url =
  'mongodb+srv://somraj:' +
  process.env.ATLAS_URL_PW +
  '@cluster0-omuro.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log('Mongo DB Connection is established successfully!');
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/user', userRoute);

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
