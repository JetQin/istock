import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Containers
import Full from './containers/Full/'
// import Simple from './containers/Simple/'

import Dashboard from './views/Dashboard/'
import Basic from './views/Stocks/Basic/'
import Chart from './views/Stocks/Basic/Chart.js'
import Current from './views/Stocks/Current/'
import History from './views/Stocks/History/'


export default (
  <Router history={hashHistory}>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" name="Dashboard" component={Dashboard}/>
      <Route path="stocks/" name="Stocks">
        <IndexRoute component={Basic}/>
        <Route path="basic" name="Basic" component={Basic}/>
        <Route path="chart" name="chart" component={Chart}/>
        <Route path="current" name="Current" component={Current}/>
        <Route path="history" name="History" component={History}/>
      </Route>
    </Route>
  </Router>
);
