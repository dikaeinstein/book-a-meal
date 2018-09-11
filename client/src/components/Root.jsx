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
import ConnectedPrivateRoute from './util/PrivateRoute';
import ConnectedPrivateAdminRoute from './util/PrivateAdminRoute';
import NotFound from './NotFound';
import Forbidden from './Forbidden';
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
          <Route exact path="/signin" component={ConnectedSignIn} />
          <Route exact path="/signup" component={ConnectedSignUp} />
          <Route
            exact
            path="/signout"
            render={() => (
              <Redirect to="/" />
            )}
          />
          <ConnectedPrivateRoute
            exact
            path="/user-menu"
            component={ConnectedUserMenu}
          />
          <ConnectedPrivateRoute
            exact
            path="/user-order-history"
            component={ConnectedUserOrderHistory}
          />
          <ConnectedPrivateRoute
            exact
            path="/order-confirmation"
            component={ConnectedOrderConfirmation}
          />
          <ConnectedPrivateAdminRoute
            exact
            path="/dashboard"
            component={ConnectedDashboard}
          />
          <ConnectedPrivateAdminRoute
            exact
            path="/meals"
            component={ConnectedMeals}
          />
          <ConnectedPrivateAdminRoute
            exact
            path="/menus"
            component={ConnectedMenus}
          />
          <Route exact path="/forbidden" component={Forbidden} />
          <Route exact path="*" component={NotFound} />
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
