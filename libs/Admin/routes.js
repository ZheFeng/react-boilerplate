import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import JQuery from './components/JQuery';
import ModuleA from './components/ModuleA';
import Moment from './components/Moment';


const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="jquery" component={JQuery} />
      <Route path="moduleA" component={ModuleA} />
      <Route path="moment" component={Moment} />
    </Route>
  </Router>
);
export default routes;
