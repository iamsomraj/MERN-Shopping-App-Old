const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

router.route('/').get((req, res, next) => {
  Order.find()
    .populate('productId')
    .then(orders => {
      const message = 'all orders are successfully fetched'.toUpperCase();
      if (orders.length > 0) {
        res.status(200).json({
          message: message,
          count: orders.length,
          fetchedOrders: orders
        });
      } else {
        const error = new Error('No valid orders are there to be fetched!');
        return res.status(500).json({
          message: error.message
        });
      }
    })
    .catch(error => {
      res.json(400).json({
        message: error.message
      });
    });
});

router.route('/add').post((req, res, next) => {
  const order = new Order({
    productId: req.body.productId,
    quantity: req.body.quantity
  });
  order
    .save()
    .then(() => {
      const message = 'a new order is successfully created'.toUpperCase();
      res.status(201).json({
        message: message,
        createdOrder: order
      });
    })
    .catch(error => {
      res.status(400).json({
        message: error.message
      });
    });
});

router.route('/:orderId').get((req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .then(order => {
      if (order) {
        const message = 'an order is successfully fetched'.toUpperCase();
        res.status(200).json({
          message: message,
          orderId: id,
          fetchedOrder: order
        });
      } else {
        const error = new Error('No valid order matches the order id ' + id);
        return res.status(404).json({
          message: error.message
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

router.route('/:orderId').delete((req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .then(response => {
      const message = 'an order is successfully deleted'.toUpperCase();
      res.status(200).json({
        message: message,
        deletedOrderId: id,
        response: response
      });
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

module.exports = router;
