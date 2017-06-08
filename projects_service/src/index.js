import React from 'react';
import ReactDOM from 'react-dom';
import { AppBar } from 'material-ui';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//import component
import ListProject from './pages/list';
import Show from './pages/show';
import Edit from './pages/edit';
import ShowUser from './pages/showUser';
import New from './pages/new';
import EditUser from './pages/editUser'

const Header = () => (
  <AppBar
    title="Project"
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
      </div>
    </div>
  </MuiThemeProvider>
);

injectTapEventPlugin();

ReactDOM.render(
  <Router>
	  <div>
		<Route path='/' component={App} />
		<Route exact path='/' component={ListProject} />
		<Route exact path='/projects/:project_id' component={Show} />
		<Route exact path='/new' component={New} />
		<Route exact path='/projects/:project_id/edit' component={Edit} />
		<Route exact path='/projects/:project_id/users/:user_id' component={ShowUser} />
		<Route exact path='/projects/:project_id/users/:user_id/edit' component={EditUser} />
	</div>
  </Router>,
  document.getElementById('root')
);