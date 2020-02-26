const express = require('express');
const router = express.Router();

router.route('/').get((req, res, next) => {
  res.status(200).json({
    message: 'handling GET request to /orders'
  });
});

router.route('/').post((req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  res.status(201).json({
    message: 'handling POST requests to /orders/',
    createdOrder: order
  });
});

router.route('/:orderId').get((req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: 'handling GET requests to /orders/' + id,
    orderId: id
  });
});

router.route('/:orderId').delete((req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: 'handling DELETE requests to /orders/' + id,
    orderId: id
  });
});

module.exports = router;
