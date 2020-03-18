import React from 'react';
import Axios from '../../Axios';
import { Link } from 'react-router-dom';

class EditProduct extends React.Component {
  state = {
    message: '',
    name: '',
    price: ''
  };

  nameHandler = event => {
    let name = event.target.value;
    this.setState({
      name: name
    });
  };

  priceHandler = event => {
    let price = event.target.value;
    this.setState({
      price: price
    });
  };

  componentDidMount = () => {
    Axios.get('products/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.fetchedProduct[0].name,
          price: response.data.fetchedProduct[0].price
        });
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  };

  updateProductBtnHandler = event => {
    event.preventDefault();
    let data = [];
    if (this.state.name !== '') {
      data.push({
        propName: 'name',
        value: this.state.name
      });
    }
    if (this.state.price !== '') {
      data.push({
        propName: 'price',
        value: this.state.price
      });
    }
    Axios.patch('products/' + this.props.match.params.id, data)
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
  };

  deleteProductBtnHandler = event => {
    event.preventDefault();
    Axios.delete('products/' + this.props.match.params.id)
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
  };
  render = () => {
    return (
      <div className="container">
        <div className="display-4">Edit My Product</div>
        <br />
        <div className="text text-primary">
          <br />
          {this.state.message === '' ? null : this.state.message}
          <br />
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="inputname">Name</label>
            <input
              required
              type="text"
              className="form-control"
              id="inputname"
              placeholder="Name"
              value={this.state.name}
              onChange={this.nameHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputprice">Price</label>
            <input
              required
              type="text"
              className="form-control"
              id="inputprice"
              placeholder="Price"
              value={this.state.price}
              onChange={this.priceHandler}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn-lg btn-success"
              onClick={this.updateProductBtnHandler}
            >
              <Link to={'/'} className="text text-white">
                Update
              </Link>
            </button>
          </div>
          <br />
          <br />
          <br />
          <div className="form-group">
            <label htmlFor="">Want to delete this product?</label>
            <br />
            <button
              type="submit"
              className="btn-lg btn-danger"
              onClick={this.deleteProductBtnHandler}
            >
              <Link to={'/'} className="text text-white">
                Delete
              </Link>
            </button>
            <br />
          </div>
        </form>
      </div>
    );
  };
}

export default EditProduct;
