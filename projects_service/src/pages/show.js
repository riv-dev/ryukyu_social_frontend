import React from 'react';
import {Link} from 'react-router-dom';
import { List, ListItem } from 'material-ui';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
//import API
import { sendRequest, checkPermission, formatDate, showStatus } from '../helpers';
import {ROOT_URL} from '../config/config';

const style = {
  margin: 12,
};

export default class Show extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open: false,
			project : [],
			users: [],
			status: '',
			project_id: props.match.params.project_id
		}
	}

	componentDidMount = () => {
		var _self = this,
			 url_project = ROOT_URL + 'projects/' + this.state.project_id,
			 url_project_users = ROOT_URL + 'projects/' + this.state.project_id + '/users';
		sendRequest(url_project,'get').then(function(res) {
			_self.setState({
				project: res,
				status: showStatus(res.status_code)
			});
		});
		sendRequest(url_project_users,'get').then(function(res) {
			_self.setState({users: res});
		});
		
	}

	removeUser = (user_id) => {
		var url = ROOT_URL + 'projects/' + this.state.project_id + '/users/' + user_id,
			_self = this;
		sendRequest(url,'delete').then(function(res) {
			_self.removeUserInList(user_id);
		});
	}

	removeUserInList = (user_id) => {
		var array = this.state.users.filter(function(item) {
			return item.user_id !== user_id
		});
		this.setState({
			users: array
		})
	}

	removeProject = () => {
		var url = ROOT_URL + 'projects/' + this.state.project_id;
		sendRequest(url,'delete').then(function(res) {
			window.location = '/'
		});
	}

	userAction = (user_id, project_id) => {
		if(checkPermission() === 0 || checkPermission() === 1){
			return (
				<Link style={style} to={`/projects/${project_id}/users/${user_id}`}>User Detail</Link>
			)
		}else if(checkPermission() === 2){
			return (
				<div>
					<Link style={style} to={`/projects/${project_id}/users/${user_id}`}>User Detail</Link>&nbsp;&nbsp;&nbsp;
					<Link style={style} to={`/projects/${project_id}/users/${user_id}/edit`}>edit user permissions</Link>&nbsp;&nbsp;&nbsp;
					<span style={style} onClick={() => {this.removeUser(user_id)}}>remove user</span>
					
				</div>
			)
		}
	}

	beAddUser = () => {
		if(checkPermission() >= 2){
			return <Link style={style} to={`/projects/${this.state.project_id}/addUser`}>Add Users</Link>
		}
	}

	beEdit = () => {
		if(checkPermission() >= 1){
			return <Link style={style} to={`/projects/${this.state.project_id}/edit`}>edit project</Link>
		}
	}

	beDelete = () => {
		if(checkPermission() >= 2){
			return (
				<span style={style} onClick={() => {this.removeProject()}}>remove project</span>	
			)
		}
	}

	render() {
		const {project, users} = this.state;
		let projectDeadline = new Date(project.deadline);
		let projectStartDate = new Date(project.start_date);
		
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<p>Project name: {project.name}</p>
					<p>description: {project.description}</p>
					<p>value: {project.value}</p>
					<p>effort: {project.effort}</p>
					<p>status: {this.state.status}</p>
					<p>Start date: {formatDate(projectStartDate)}</p>
					<p>Deadline: {formatDate(projectDeadline)}</p>
					<div>
						{users ? 
						<div>
							List user of project:
							<List>
								{
									users.map((user, index) => {
										return <ListItem key={index}>
												<p>{user.firstname} {user.lastname}</p>
												{this.userAction(user.user_id,project.id)}
												</ListItem>
									})
								}
							</List>
						</div>
						: ''
						}
					</div>
					<div>
						{this.beAddUser()}
						{this.beEdit()}
						{this.beDelete()}
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}


