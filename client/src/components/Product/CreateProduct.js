import React from 'react';
import Axios from '../../Axios';

class CreateProduct extends React.Component {
  state = {
    message: '',
    name: '',
    price: '',
    file: null
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

  fileHandler = event => {
    let file = event.target.files[0];
    this.setState({
      file: file
    });
  };

  addProductBtnHandler = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('price', this.state.price);
    formData.append('product', this.state.file, this.state.file.name);

    Axios.post('/products/add', formData)
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
      <div
        className="shadow container"
        style={{ margin: '5rem', padding: '2rem' }}
      >
        {Axios.defaults.headers.common['User'] &&
        Axios.defaults.headers.common['Authorization'] ? (
          Axios.defaults.headers.common['User'].split(' ')[1] &&
          Axios.defaults.headers.common['Authorization'].split(' ')[1] ? (
            <div>
              <div className="display-4">Add Products</div>
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
                  <label htmlFor="inputimage">Product Image</label>
                  <input
                    required
                    type="file"
                    className="form-control"
                    id="inputimage"
                    placeholder="Product Image"
                    onChange={this.fileHandler}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={this.addProductBtnHandler}
                >
                  Add
                </button>
              </form>
            </div>
          ) : (
            <div className="text text-primary">
              <br />
              Please Login first!
              <br />
            </div>
          )
        ) : (
          <div className="text text-primary">
            <br />
            Please Login first!
            <br />
          </div>
        )}
      </div>
    );
  };
}

export default CreateProduct;
