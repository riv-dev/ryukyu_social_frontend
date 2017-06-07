import React from 'react';
import {Link} from 'react-router-dom';
import { List, ListItem } from 'material-ui';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
//import API
import { sendRequest } from '../helpers';
import {ROOT_URL} from '../config/config';
const url = ROOT_URL + 'projects';

export default class ListProject extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			projects : []
		}
	}
	componentDidMount(){
		var _self = this;
		sendRequest(url,'get').then(function(res) {
			_self.setState({projects: res});
		});
	}
	render() {
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
			<List>
				{
					this.state.projects.map(project => {
						return <ListItem key={project.id} >
									<p>{project.name}</p>
									<p>
										<Link to={`/projects/${project.id}`}>Detail</Link>&nbsp;&nbsp;&nbsp;
										<Link to={`/projects/${project.id}/edit`}>Edit</Link>
									</p>
								</ListItem>
					})
				}
			</List>
			</MuiThemeProvider>
		)
	}
}