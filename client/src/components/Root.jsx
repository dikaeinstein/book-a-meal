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
import ConnectedHomePage from './HomePage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserMenu from './UserMenu';
import UserOrderHistory from './UserOrderHistory';
import ConnectedPrivateRoute from './PrivateRoute';
import ConnectedPrivateAdminRoute from './PrivateAdminRoute';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import Meals from './Meals';
import Menus from './Menus';
import OrderConfirmation from './OrderConfirmation';


export const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Header className="navbar" />
        <Switch>
          <Route exact path="/" component={ConnectedHomePage} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route
            path="/signout"
            render={() => (
              <Redirect to="/" />
            )}
          />
          <ConnectedPrivateRoute path="/user-menu" component={UserMenu} />
          <ConnectedPrivateRoute
            path="/user-order-history"
            component={UserOrderHistory}
          />
          <ConnectedPrivateRoute
            path="/order-confirmation"
            component={OrderConfirmation}
          />
          <ConnectedPrivateAdminRoute path="/dashboard" component={Dashboard} />
          <ConnectedPrivateAdminRoute path="/meals" component={Meals} />
          <ConnectedPrivateAdminRoute path="/menus" component={Menus} />
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
