import React from 'react';
import Axios from '../../Axios';
import { Redirect, NavLink, Link } from 'react-router-dom';
import Product from '../Product/Product';

class Profile extends React.Component {
  state = {
    name: '',
    message: '',
    products: []
  };

  buyProduct = (id, q) => {
    if (q > 0) {
      const order = {
        productId: id,
        quantity: q
      };
      Axios.post('/orders/add', order)
        .then(response => {
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

  componentDidMount = () => {
    this.setState({
      name: this.props.match.params.name
    });

    console.log(
      '/products/user/' + Axios.defaults.headers.common['User'].split(' ')[1]
    );

    Axios.get(
      '/products/user/' + Axios.defaults.headers.common['User'].split(' ')[1]
    )
      .then(response => {
        console.log(response);

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

  productList = () => {
    let products = [];
    this.state.products.forEach((product, index) => {
      products.push(
        <div
          className="col-sm-3"
          key={index}
          style={{ 
            
            // marginBottom: '2rem', 
            
            
            // marginRight: '2rem'       
            
            margin: '2rem' 
          
          
          }}
        >
          <Product
            id={product._id}
            name={product.name}
            price={product.price}
            img={product.productImage}
            buyDisable={Axios.defaults.headers.common['User'].split(' ')[1]}
            quantity={product.quantity}
            quantityHandler={event => this.quantityHandler(event, index)}
            seller={product.userId}
            edit={() => this.editProduct(product._id)}
            buy={() => this.buyProduct(product._id, product.quantity)}
          />
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

  quantityHandler = (event, index) => {
    const products = this.state.products.slice(0);
    let quantity = this.state.products[index].quantity;
    quantity = event.target.value;
    if (quantity < 0) {
      quantity = quantity * -1;
    }
    products[index].quantity = quantity;
    this.setState({
      products: products
    });
  };

  logoutHandler = () => {
    Axios.defaults.headers.common['User'] = '';
    Axios.defaults.headers.common['Authorization'] = '';
    window.location = '/';
  };
  render = () => {
    return (
      <div
        className="shadow-lg conatiner rounded bg-light"
        style={{ margin: '5rem', padding: '5rem' }}
      >
        {Axios.defaults.headers.common['User'] &&
        Axios.defaults.headers.common['Authorization'] ? (
          Axios.defaults.headers.common['User'].split(' ')[1] &&
          Axios.defaults.headers.common['Authorization'].split(' ')[1] ? (
            <div>
              <br />
              <button
                className="btn btn-danger float-right"
                onClick={this.logoutHandler}
              >
                Logout
              </button>
              <br />
              <div className="text text-primary">
                <p className="lead display-2">{'Hello, ' + this.state.name}</p>
              </div>
              <br />
              <br />
              <br />
              <div>
                <p className="text text-dark display-4">
                  Want to check all your orders?
                </p>
              </div>
              <br />
              <NavLink
                style={{ margin: '2rem' }}
                to="/orders/"
                className="btn btn-success text-white"
              >
                Orders
              </NavLink>

              <br />
              <br />
              <div className="text text-dark display-4">
                All of your products
              </div>
              <br />
              <br />
              <br />
              {Axios.defaults.headers.common['User'] ? (
                <div>
                  <p></p>
                  <Link
                    to="/products/add"
                    className="btn btn-success text-white"
                  >
                    Create Product
                  </Link>
                </div>
              ) : null}
              <br />
              <br />

              <div className="text-primary">
                {this.state.message === '' ? null : this.state.message}
              </div>
              <br />
              {this.state.products.length !== 0 ? this.productList() : null}
            </div>
          ) : (
            <Redirect to="/"></Redirect>
          )
        ) : (
          <Redirect to="/"></Redirect>
        )}
      </div>
    );
  };
}

export default Profile;
