import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import {orange500, blue500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
//import API
import { sendRequest, checkPermission } from '../helpers';
import {ROOT_URL,URL,STATUS_USER_PROJECT, WRITE_ACCESS} from '../config/config';
const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
  checkbox: {
    marginBottom: 16,
  },
  button: {
	  margin: 12
  }
};
export default class EditUser extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			project : [],
			user_name:'',
			project_name:'',
			status_code:'',
			write_access:'',
			flashMessage:'',
			project_id: props.match.params.project_id,
			user_id: props.match.params.user_id
		}
	}
	componentDidMount = () => {
		var _self = this;
		const url_user = URL + 'users_service/api/users/' + this.state.user_id,
			  url_project = ROOT_URL + 'projects/' + this.state.project_id,
			  url_user_project = ROOT_URL + 'projects/' + this.state.project_id + '/users/' + this.state.user_id;

		//Get user detail in project
		sendRequest(url_user,'GET').then(function(res) {			
			_self.setState({user_name: res.firstname + " " + res.lastname});
		});

		//Get project detail
		sendRequest(url_project,'GET').then(function(res) {
			_self.setState({
				project: res,
				project_name: res.name ? res.name : ''
			});
		});

		//get user in project
		sendRequest(url_user_project,'GET').then(function(res) {
			_self.setState({
				status_code: res.status ? res.status : "",
				write_access: res.write_access ? res.write_access : ''
			});
		});

		//check privillage recent user
		var permission = checkPermission(this.state.project_id);
		
		if(permission !== 2){
			window.location = '/';
		}
	}
	handleSubmit = (event) => {
		var url = ROOT_URL + 'projects/' + this.state.project_id + '/users/' + this.state.user_id,
			_self = this;
		var data = {
			status: this.state.status_code ? this.state.status_code : "",
			write_access: this.state.write_access ? parseInt(this.state.write_access,10) : 0
		}
		
		sendRequest(url,'PUT', data).then(function(res) {
			_self.setState({flashmessage:res.message});
			if(res.status === "success"){
				setTimeout(function(){
					window.location = '/projects/' + res.project_id
				},1000)
			}
		});
	}
	handleOptionChange = (event,selected) => {
		this.setState({
			status_code: selected
		});
	}

	handleWriteAccess = (event,selected) =>{
		this.setState({
			write_access: selected
		});
	}
	render(){
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<p>{this.state.flashMessage}</p>
					<TextField
						value={this.state.project_name}
						disabled={true}
						floatingLabelText="Project Name"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
						/>
					<br/><br/>
					<TextField
						value={this.state.user_name}
						disabled={true}
						floatingLabelText="User Name"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
						/>
					<br/><br/>
					<p>Status</p>
					 <RadioButtonGroup name="status_code" valueSelected={this.state.status_code}  onChange={this.handleOptionChange}>
						{
							STATUS_USER_PROJECT.map((status, index) => {
								return <RadioButton key={index}
											value={status.value}
											label={status.text}
											style={styles.radioButton}
										/>
							})
						}
					</RadioButtonGroup>
					<br/><br/>
					<p>Write Access</p>
					 <RadioButtonGroup name="write_access" valueSelected={this.state.write_access}  onChange={this.handleWriteAccess}>
						{
							WRITE_ACCESS.map((privilege, index) => {
								return <RadioButton key={index}
											value={privilege.value}
											label={privilege.text}
											style={styles.radioButton}
										/>
							})
						}
					</RadioButtonGroup>
					<br/><br/>
					<RaisedButton href={"/projects/" + this.state.project_id + "/users/" + this.state.user_id} label="Cancel" style={styles.button} />
    				<RaisedButton onTouchTap={this.handleSubmit} label="Update" primary={true} style={styles.button} />
				
				</div>
			</MuiThemeProvider>
		)
	}
}
