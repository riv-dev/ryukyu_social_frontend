import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//import component
import {List} from './pages/list';

ReactDOM.render(
  <Router>
    <Route path='/' component={List} />
  </Router>,
  document.getElementById('root')
);