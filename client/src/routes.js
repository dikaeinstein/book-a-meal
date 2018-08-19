import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './helpers/history';

import Header from './components/Header';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserMenu from './components/UserMenu';
import UserOrderHistory from './components/UserOrderHistory';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import Meals from './components/Meals';
import Menus from './components/Menus';
import OrderConfirmation from './components/OrderConfirmation';


const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Header className="navbar" />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route
            path="/signout"
            render={() => (
              <Redirect to="/" />
            )}
          />
          <PrivateRoute path="/user-menu" component={UserMenu} />
          <PrivateRoute
            path="/user-order-history"
            component={UserOrderHistory}
          />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/meals" component={Meals} />
          <PrivateRoute path="/menus" component={Menus} />
          <PrivateRoute
            path="/order-confirmation"
            component={OrderConfirmation}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ])).isRequired,
};

export default hot(module)(Root);
