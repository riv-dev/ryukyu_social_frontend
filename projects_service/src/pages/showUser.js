import React from 'react';
import {Link} from 'react-router-dom';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
//import API
import { sendRequest } from '../helpers';
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
		sendRequest(url_user,'get').then(function(res) {
			_self.setState({user: res});
		});
		sendRequest(url_user_detail,'get').then(function(res) {
			_self.setState({user_detail: res});
		});
		sendRequest(url_project,'get').then(function(res) {
			_self.setState({project: res});
		});
	}
	render() {
		let {user} = this.state;
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<p>Project Name: {this.state.project.name}</p>
					<p>User Name: {this.state.user_detail.firstname} {this.state.user_detail.lastname}</p>
					<p>Status: {user.status_code}</p>
					<p>Access: {user.write_access}</p>
					<p>
						<Link to={`/projects/${this.state.project_id}/users/${this.state.user_id}/edit`}>edit user permissions</Link>&nbsp;&nbsp;&nbsp;
						<Link to=''>delete user</Link>
					</p>
				</div>
			</MuiThemeProvider>
		)
	}
}


