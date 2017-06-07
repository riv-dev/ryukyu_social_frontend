import React from 'react';
import {Link} from 'react-router-dom';
import { List, ListItem } from 'material-ui';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
//import API
import { sendRequest } from '../helpers';
import {ROOT_URL} from '../config/config';

export default class Show extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			project : [],
			users: [],
			project_id: props.match.params.project_id
		}
	}
	componentDidMount = () => {
		var _self = this,
			 url_project = ROOT_URL + 'projects/' + this.state.project_id,
			 url_project_users = ROOT_URL + 'projects/' + this.state.project_id + '/users';
		sendRequest(url_project,'get').then(function(res) {
			_self.setState({project: res});
		});
		sendRequest(url_project_users,'get').then(function(res) {
			_self.setState({users: res});
		});
	}
	renderAction = (permissions, user_id, project_id) => {
		if(permissions === "0" || permissions === "1"){
			return (
				<Link to={`/projects/${project_id}/users/${user_id}`}>User Detail</Link>
			)
		}else if(permissions === "2"){
			return (
				<div>
					<Link to={`/projects/${project_id}/users/${user_id}`}>User Detail</Link>&nbsp;&nbsp;&nbsp;
					<Link to={`/projects/${user_id}/edit`}>edit user permissions</Link>&nbsp;&nbsp;&nbsp;
					<Link to={`/projects/${user_id}/edit`}>remove user</Link>
				</div>
			)
		}
	}
	render() {
		const {project, users} = this.state;
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<p>{project.name}</p>
					<p>{project.description}</p>
					<p>{project.value}</p>
					<p>{project.effort}</p>
					<p>{project.status}</p>
					<p>{project.deadline}</p>
					<div>
						List user of project:
						<List>
							{
								users.map(user => {
									return <ListItem key={user.user_id}>
											<p>{user.user_id}</p>
											<p>
												{this.renderAction(user.write_access,user.user_id,project.id)}
											</p>
											</ListItem>
								})
							}
						</List>
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}


