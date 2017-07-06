import React from 'react';
import {Link} from 'react-router-dom';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
//import API
import { sendRequest,showWriteAccess } from '../helpers';
import {ROOT_URL, URL} from '../config/config';

export default class ShowUser extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user : [],
			user_detail: [],
			project: [],
			project_id: props.match.params.project_id,
			user_id: props.match.params.user_id
		}
	}
	componentDidMount(){
		var _self = this;
		const url_user = ROOT_URL + 'projects/' + this.state.project_id + '/users/' + this.state.user_id,
			  url_user_detail = URL + 'users_service/api/users/' + this.state.user_id,
			  url_project = ROOT_URL + 'projects/' + this.state.project_id;
		sendRequest(url_user,'GET').then(function(res) {//GET STATUS CODE, WRITE ACCESS
			_self.setState({
				user: res,
				write_access: showWriteAccess(res.write_access)
			});
		});

		sendRequest(url_user_detail,'GET').then(function(res) {//GET USER INFO
			_self.setState({user_detail: res});
		});

		sendRequest(url_project,'GET').then(function(res) { // GET PROJECT INFO
			_self.setState({project: res});
		});
	}

	removeUser = (user_id) => {
		var url = ROOT_URL + 'projects/' + this.state.project_id + '/users/' + user_id,
			_self = this;
		sendRequest(url,'DELETE').then(function(res) {
			window.location = '/projects_service/projects/' + _self.state.project_id;
		});
	}

	render() {
		let {user} = this.state;
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<p>Project Name: 
						<Link to={`/projects/${this.state.project_id}`}>
							{this.state.project.name}
						</Link>
					</p>
					<p>User Name: {this.state.user_detail.firstname} {this.state.user_detail.lastname}</p>
					<p>Status: {user.status}</p>
					<p>Access: {this.state.write_access}</p>
					<p>
						<Link to={`/projects/${this.state.project_id}/users/${this.state.user_id}/edit`}>edit user permissions</Link>&nbsp;&nbsp;&nbsp;
						<span onClick={() => {this.removeUser(this.state.user_id)}}>delete user</span>
					</p>
				</div>
			</MuiThemeProvider>
		)
	}
}


