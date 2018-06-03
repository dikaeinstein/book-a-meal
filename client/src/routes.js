import React from 'react';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './helpers/history';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserMenu from './components/UserMenu';
import UserOrderHistory from './components/UserOrderHistory';
import PrivateRoute from './components/PrivateRoute';

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
        </Switch>
        <Footer />
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

export default Root;
