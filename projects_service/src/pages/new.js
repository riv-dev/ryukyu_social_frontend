import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, blue500} from 'material-ui/styles/colors';

//import API
import { sendRequest } from '../helpers';
import {ROOT_URL} from '../config/config';
const url = ROOT_URL + 'projects';
const style = {
  margin: 12
};
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
}
export default class New extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			project: [],
			onActive: true,
			error:'',
			errorName:'',
			project_name:'',
			project_description:'',
			project_value:'',
			project_effort:'',
			project_status:'',
			project_deadline:''
		}
	}
	handleChangeName = (event) => {
		if (event.target.value !== '') {
			this.setState({ errorName: '', onActive: false });
		} else {
			this.setState({ errorName: 'name can\'t be empty',onActive: true })
		}
		this.setState({
			project_name: event.target.value
		});
	}
	handleChangeDescription = (event) => {
		this.setState({
			project_description: event.target.value
		});
	}
	handleChangeValue = (event) => {
		this.setState({
			project_value: event.target.value
		});
	}
	handleChangeEffort = (event) => {
		this.setState({
			project_effort: event.target.value
		});
	}
	handleChangeDeadline = (event) => {
		this.setState({
			project_deadline: event.target.value
		});
	}
	handleChangeStatus = (event) => {
		this.setState({
			project_status: event.target.value
		});
	}
	handleSubmit = (event) => {
		var _self = this;
		var project = {
			name: this.state.project_name,
			description: this.state.project_description,
			value: this.state.project_value,
			effort: this.state.project_effort,
			status: this.state.project_status,
			deadline: this.state.project_deadline
		}
		
		sendRequest(url,'post', project).then(function(res) {
			_self.setState({flashmessage:res.message});
			if(res.status === "success"){
				setTimeout(function(){
					window.location = '/projects/' + res.project_id
				},1000)
			}
		});
	}
	render() {
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<p>{this.state.error}</p>
					<TextField
						value={this.state.project_name}
						onChange={this.handleChangeName}
						errorText= {this.state.errorName}
						floatingLabelText="Project Name"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
					/>
					<br />
					<TextField
						value={this.state.project_description}
						multiLine={true}
						rows={2}
						rowsMax={4}
						onChange={this.handleChangeDescription}
						floatingLabelText="Description"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
					/><br />
					<TextField
						value={this.state.project_value}
						onChange={this.handleChangeValue}
						floatingLabelText="value"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
					/>
					<br />
					<TextField
						value={this.state.project_effort}
						onChange={this.handleChangeEffort}
						floatingLabelText="effort"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
					/>
					<br />
					<TextField
						value={this.state.project_status}
						onChange={this.handleChange}
						floatingLabelText="status"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
					/>
					<br />
					<TextField
						value={this.state.project_deadline}
						onChange={this.handleChangeDeadline}
						floatingLabelText="deadline"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
					/>
					<br />
					<RaisedButton href='/' label="Cancel" style={style} />
    				<RaisedButton disabled={this.state.onActive} onTouchTap={this.handleSubmit} label="Update" primary={true} style={style} />
				</div>
			</MuiThemeProvider>
		)
	}
}


