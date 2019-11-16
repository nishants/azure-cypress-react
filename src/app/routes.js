import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './modules/HomePage';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/:tab_id">
        <HomePage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  </Router>
);
export default Routes;
