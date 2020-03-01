import React from 'react';
import Axios from '../../Axios';
import Product from './Product';
import { Token } from '../User/Login';

class Products extends React.Component {
  state = {
    products: [],
    message: ''
  };

  buyProduct = (id, q) => {
    if (q !== 0) {
      const order = {
        productId: id,
        quantity: q
      };
      Axios.post('/orders/add', order, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Token.value
        }
      })
        .then(response => {
          console.log(response.data);
          this.setState({
            message: response.data.message
          });
        })
        .catch(error => {
          this.setState({
            message: error.message
          });
        });
    }
  };

  productList = () => {
    let products = [];
    this.state.products.forEach((product, index) => {
      products.push(
        <div className="col-sm-4" key={index}>
          <br />
          <Product
            id={product._id}
            name={product.name}
            price={product.price}
            img={product.productImage}
            quantity={product.quantity}
            quantityHandler={() => this.quantityHandler(index)}
            seller={product.userId}
            buy={() => this.buyProduct(product._id, product.quantity)}
          />
          <br />
        </div>
      );
    });
    let newProducts = [];
    if (products.length === 1) {
      newProducts.push(
        <div className="row" key={0}>
          {products[0]}
        </div>
      );
    } else if (products.length < 3) {
      for (let i = 0; i < products.length - 1; i++) {
        newProducts.push(
          <div className="row" key={i}>
            {products[i]}
            {products[i + 1]}
          </div>
        );
      }
    } else {
      for (let i = 0; i < products.length - 2; i++) {
        newProducts.push(
          <div className="row" key={i}>
            {products[i]}
            {products[i + 1]}
            {products[i + 2]}
          </div>
        );
      }
    }
    return newProducts;
  };

  quantityHandler = index => {
    const products = this.state.products.slice(0);
    let quantity = this.state.products[index].quantity;
    quantity += 1;
    products[index].quantity = quantity;
    this.setState({
      products: products
    });
  };

  componentDidMount = () => {
    Axios.get('/products/')
      .then(response => {
        if (response.data.fetchedProducts.length > 0) {
          const newProducts = response.data.fetchedProducts.map(prod => {
            return {
              ...prod,
              quantity: 0
            };
          });
          this.setState({
            products: newProducts,
            message: response.message
          });
        } else {
          this.setState({
            message: response.message
          });
        }
      })
      .catch(err => {
        this.setState({
          message: err.message
        });
      });
  };

  render = () => {
    return (
      <div className="container" style={{ margin: '5rem', padding: '2rem' }}>
        <br />
        <div className="display-4">Products</div>
        <br />
        <div className="text-primary">
          {this.state.message === '' ? null : this.state.message}
        </div>
        <br />
        {this.state.products.length !== 0 ? this.productList() : null}
      </div>
    );
  };
}

export default Products;
