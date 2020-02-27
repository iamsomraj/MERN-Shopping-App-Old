const express = require('express');
const Product = require('../models/product.model');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

router.route('/').get((req, res, next) => {
  Product.find()
    .then(products => {
      if (products.length > 0) {
        const message = 'all products are successfully fetched'.toUpperCase();
        res.status(200).json({
          message: message,
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

router.route('/add').post(upload.single('product'), (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });
  product
    .save()
    .then(() => {
      const message = 'a product is successfully created'.toUpperCase();
      res.status(201).json({
        message: message,
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
        const message = 'a product is successfully fetched'.toUpperCase();
        res.status(200).json({
          message: message,
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
      const message = 'a product is successfully updated'.toUpperCase();
      res.status(200).json({
        message: message,
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
      const message = 'a product is successfully deleted'.toUpperCase();
      res.status(200).json({
        message: message,
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
