import React from 'react';
import ReactDOM from 'react-dom';
import { AppBar, Paper} from 'material-ui';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//import component
import ListProject from './pages/list';

const Header = () => (
  <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);

const App = ({children}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
      <Header />
      <br/>
      <div style={{display: "flex", width: 1000, margin: '0 auto', flexWrap: "wrap"}}>
        {children}
        <ListProject />
      </div>
    </div>
  </MuiThemeProvider>
);

injectTapEventPlugin();

ReactDOM.render(
  <Router>
    <Route path='/' component={App} />
  </Router>,
  document.getElementById('root')
);