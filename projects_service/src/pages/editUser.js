import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import {orange500, blue500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
//import API
import { sendRequest, checkPermission } from '../helpers';
import {ROOT_URL,URL} from '../config/config';
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
			user: [],
			project_id: props.match.params.project_id,
			user_id: props.match.params.user_id
		}
	}
	componentDidMount = () => {
		var _self = this;
		const url_user = URL + 'users_service/api/users/' + this.state.user_id,
			  url_project = ROOT_URL + 'projects/' + this.state.project_id;

		//Get user detail in project
		sendRequest(url_user,'get').then(function(res) {
			_self.setState({user: res});
		});

		//Get project detail
		sendRequest(url_project,'get').then(function(res) {
			_self.setState({project: res});
		});

		//check privillage recent user
		var permission = checkPermission(this.state.project_id);
		
		if(permission !== 2){
			window.location = '/';
		}
	}
	handleSubmit = (event) => {
		var url = ROOT_URL + 'projects/' + this.state.project_id + '/users/' + this.state.user_id;
		var data = {
			id: this.state.user.id,
			status_code: this.state.status,
			role: this.state.write_access
		}
		sendRequest(url,'put', data).then(function(res) {
			if(res.statusText !== 'error'){
				console.log(res);
			}
			else{
				console.log(res.responseText);
			}
		});
	}
	handleOptionChange = (event) => {
		this.setState({
			status: event.target.value
		});
	}

	handleCheck = (event) => {

	}
	
	render(){
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<TextField
						defaultValue={this.state.project.name}
						value={this.state.project.name}
						floatingLabelText="Project Name"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
						/>
					<br/><br/>
					<TextField
						defaultValue={this.state.user.lastname}
						value={this.state.user.lastname}
						floatingLabelText="User Name"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
						/>
					<br/><br/>
					<p>Status</p>
					 <RadioButtonGroup name="status" defaultSelected="not_light" onChange={this.handleOptionChange}>
						<RadioButton
							value="1"
							label="Accept Request"
							style={styles.radioButton}
						/>
						<RadioButton
							value="2"
							label="Deny Request"
							style={styles.radioButton}
						/>
					</RadioButtonGroup>
					<br/><br/>
					<p>Access</p>
					<Checkbox
						onCheck={this.handleCheck}
						label="Read"
						style={styles.checkbox}
					/>
					<Checkbox
						label="Write"
						style={styles.checkbox}
					/>
					<Checkbox
						label="Admin"
						style={styles.checkbox}
					/>
					<RaisedButton href="/" label="Cancel" style={styles.button} />
    				<RaisedButton onTouchTap={this.handleSubmit} label="Update" primary={true} style={styles.button} />
				
				</div>
			</MuiThemeProvider>
		)
	}
}
