import React from 'react';
import MenuBar from './UI/MenuBar';
import Products from './components/Product/Products';
import EditProduct from './components/Product/EditProduct';
import CreateProduct from './components/Product/CreateProduct';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/User/Login';
import Signup from './components/User/Signup';
import Orders from './components/Order/Orders';
import Profile from './components/User/Profile';
import Footer from './UI/Footer';

class App extends React.Component {
  render = () => {
    return (
      <Router>
        <MenuBar />
        <Route path="/" exact component={Products} />
        <Route path="/products/" exact component={Products} />
        <Route path="/products/edit/:id" exact component={EditProduct} />
        <Route path="/products/add/" exact component={CreateProduct} />
        <Route path="/users/login/" exact component={Login} />
        <Route path="/users/signup" exact component={Signup} />
        <Route path="/users/profile/:name" exact component={Profile} />
        <Route path="/orders/" exact component={Orders} />
        <Footer />
      </Router>
    );
  };
}

export default App;
