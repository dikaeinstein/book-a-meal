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
import history from '../helpers/history';

import Header from './Header';
import HomePage from './HomePage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserMenu from './UserMenu';
import UserOrderHistory from './UserOrderHistory';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import Meals from './Meals';
import Menus from './Menus';
import OrderConfirmation from './OrderConfirmation';


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
