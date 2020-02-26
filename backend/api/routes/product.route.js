const express = require('express');
const Product = require('../models/product.model');
const router = express.Router();

router.route('/').get((req, res, next) => {
  Product.find()
    .then(products => {
      if (products.length > 0) {
        res.status(200).json({
          message: 'Succesfully handled GET request to /products',
          fetchedProducts: products
        });
      } else {
        res.status(500).json({
          message: 'No valid products are there to be fetched!'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

router.route('/').post((req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Succesfully handled POST requests to /products/',
        createdProduct: product
      });
    })
    .catch(error => {
      res.status(400).json({
        message: error.message
      });
    });
});

router.route('/:productId').get((req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .then(product => {
      if (product) {
        res.status(200).json({
          message: 'Succesfully handled requests to /products/' + id,
          productId: id,
          fetchedProduct: product
        });
      } else {
        const error = new Error(
          'No valid product matches the product id: ' + id
        );
        // 404 because it does not match
        res.status(404).json({
          message: error.message
        });
      }
    })
    .catch(error => {
      // 500 because something failed from fetching
      res.status(500).json({
        message: error.message
      });
    });
});

router.route('/:productId').patch((req, res, next) => {
  const id = req.params.productId;
  const updatedProduct = {};
  for (const iterator of req.body) {
    updatedProduct[iterator.propName] = iterator.value;
  }
  Product.update({ _id: id }, { $set: updatedProduct })
    .then(response => {
      res.status(200).json({
        message: 'Succesfully handled PATCH requests to /products/' + id,
        response: response,
        updatedProduct: updatedProduct
      });
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

router.route('/:productId').delete((req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .then(resposne => {
      res.status(200).json({
        message: 'Succesfully handled DELETE requests to /products/' + id,
        deletedProduct: id,
        resposne: resposne
      });
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

module.exports = router;
