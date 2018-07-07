import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
// import Fish from '../components/Fish/Fish';
import Home from '../components/Home/Home';
import Inventory from '../components/Inventory/Inventory';
import Login from '../components/Login/Login';
import Navbar from '../components/Navbar/Navbar';
// import New from '../components/New/New';
// import Order from '../components/Order/Order';
// import OrderSpa from '../components/OrderSpa/OrderSpa';
import Register from '../components/Register/Register';
// import SingleOrder from '../components/SingleOrder/SingleOrder';
import fbConnection from '../firebaseRequests/connection';
fbConnection();

// kinda like helper function, so should be outside of the the component class
// the "Component" gets passed is the react components
// ...rest: what are the other things you pass into this route. Anything other than authed and Components
const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/orders', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends Component {
  state = {
    authed: false,
  }

  render () {
    return (
      // everything outside of <switch> will stay the same
      // everyting inside of <switch> will be routed
      // <Route path="/" exact component={Home}/> homepage: "/"; exact only when it is exactlly same as '/'
      // Pricate Route: see the page only when authenticated
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={Home}/>
                  <PrivateRoute
                    path="/inventory"
                    authed={this.state.authed}
                    component={Inventory}
                  />
                  <PublicRoute
                    path="/register"
                    authed={this.state.authed}
                    component={Register}
                  />
                  <PublicRoute
                    path="/login"
                    authed={this.state.authed}
                    component={Login}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
