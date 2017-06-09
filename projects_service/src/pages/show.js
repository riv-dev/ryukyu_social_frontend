import React from 'react';
import {Link} from 'react-router-dom';
import { List, ListItem } from 'material-ui';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import Moment from 'react-moment';
//import API
import { sendRequest, checkPermission } from '../helpers';
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
			project_id: props.match.params.project_id
		}
	}
	// handleOpen = () => {
	// 	this.setState({open: true});
	// }

	// handleClose = () => {
	// 	this.setState({open: false});
	// }

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

	/*actionremoveUser = (user_id) => {
		return(
			<div>
				<FlatButton
					label="Cancel"
					primary={true}
					onTouchTap={this.handleClose}
				/>
				<FlatButton
					label="Confirm"
					primary={true}
					onTouchTap={this.removeUser(user_id)}
				/>
			</div>
		)
	}*/

	removeUser = (user_id) => {
		var url = ROOT_URL + 'projects/' + this.state.project_id + '/users/' + user_id;
		sendRequest(url,'delete').then(function(res) {
			console.log(res);
		});
	}

	/*actionremoveProject = () => {
		return(
			<div>
				<FlatButton
					label="Cancel"
					primary={true}
					onTouchTap={this.handleClose}
				/>
				<FlatButton
					label="Confirm"
					primary={true}
					onTouchTap={this.removeProject}
				/>
			</div>
		)
	}*/

	removeProject = () => {
		var url = ROOT_URL + 'projects/' + this.state.project_id;
		sendRequest(url,'delete',{project_id: this.state.project_id}).then(function(res) {
			console.log(res);
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
					<span style={style} onClick={() => {this.removeUser()}}>remove user</span>
					
				</div>
			)
		}
	}

	beRequest = () => {
		if(checkPermission() >= 0){
			return <Link style={style} to={`/projects/${this.state.project_id}/request`}>request to be added to this project</Link>
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
		let projectDeadline = project.deadline;
		
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<p>{project.name}</p>
					<p>{project.description}</p>
					<p>{project.value}</p>
					<p>{project.effort}</p>
					<p>{project.status}</p>
					<Moment>{projectDeadline}</Moment>
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
						{this.beRequest()}
						{this.beEdit()}
						{this.beDelete()}
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}


