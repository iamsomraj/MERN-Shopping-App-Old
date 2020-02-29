const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const auth = require('../middleware/login.authentication');

router.route('/').get(auth, (req, res, next) => {
  Order.find({ userId: req.userData.id })
    .populate('userId')
    .then(orders => {
      const message = 'all orders are successfully fetched'.toUpperCase();
      if (orders.length > 0) {
        res.status(200).json({
          message: message,
          count: orders.length,
          fetchedOrders: orders
        });
      } else {
        const error = new Error('No valid orders are to be fetched');
        return res.status(400).json({
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

router.route('/add').post(auth, (req, res, next) => {
  const order = new Order({
    productId: req.body.productId,
    quantity: req.body.quantity,
    userId: req.userData.id
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

router.route('/:orderId').get(auth, (req, res, next) => {
  const id = req.params.orderId;
  Order.find({ _id: id, userId: req.userData.id })
    .populate('userId')
    .then(order => {
      if (order.length == 1) {
        const message = 'an order is successfully fetched'.toUpperCase();
        res.status(200).json({
          message: message,
          orderId: id,
          fetchedOrder: order
        });
      } else {
        const error = new Error(
          'Unauthorized access to the order or no order matches'
        );
        res.status(401).json({
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

router.route('/:orderId').delete(auth, (req, res, next) => {
  const id = req.params.orderId;
  Order.deleteOne({ _id: id, userId: req.userData.id })
    .then(response => {
      if (response.deletedCount > 0) {
        const message = 'an order is successfully deleted'.toUpperCase();
        res.status(200).json({
          message: message,
          deletedOrderId: id,
          response: response
        });
      } else {
        const error = new Error('Unauthorized access to the order');
        res.status(401).json({
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

module.exports = router;
