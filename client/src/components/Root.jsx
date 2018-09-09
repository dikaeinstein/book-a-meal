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
import ConnectedSignIn from './SignIn';
import ConnectedSignUp from './SignUp';
import ConnectedUserMenu from './UserMenu';
import ConnectedUserOrderHistory from './UserOrderHistory';
import ConnectedPrivateRoute from './PrivateRoute';
import ConnectedPrivateAdminRoute from './PrivateAdminRoute';
import NotFound from './NotFound';
import ConnectedDashboard from './Dashboard';
import ConnectedMeals from './Meals';
import ConnectedMenus from './Menus';
import ConnectedOrderConfirmation from './OrderConfirmation';


export const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Header className="navbar" />
        <Switch>
          <Route exact path="/" component={ConnectedHomePage} />
          <Route path="/signin" component={ConnectedSignIn} />
          <Route path="/signup" component={ConnectedSignUp} />
          <Route
            path="/signout"
            render={() => (
              <Redirect to="/" />
            )}
          />
          <ConnectedPrivateRoute
            path="/user-menu"
            component={ConnectedUserMenu}
          />
          <ConnectedPrivateRoute
            path="/user-order-history"
            component={ConnectedUserOrderHistory}
          />
          <ConnectedPrivateRoute
            path="/order-confirmation"
            component={ConnectedOrderConfirmation}
          />
          <ConnectedPrivateAdminRoute
            path="/dashboard"
            component={ConnectedDashboard}
          />
          <ConnectedPrivateAdminRoute
            path="/meals"
            component={ConnectedMeals}
          />
          <ConnectedPrivateAdminRoute
            path="/menus"
            component={ConnectedMenus}
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
