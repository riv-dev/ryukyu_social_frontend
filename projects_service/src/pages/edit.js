import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
			project_id: props.match.params.project_id,
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
	componentDidMount = () => {
		var _self = this,
			url = ROOT_URL + 'projects/' + this.state.project_id,
			permission = checkPermission();
		if(permission < 1){
			window.location = '/';
		}
		sendRequest(url,'get').then(function(res) {
			_self.setState({
				project_name: res.name,
				project_description: res.description,
				project_value: res.value,
				project_effort: res.effort,
				project_status: res.status,
				project_deadline: res.deadline
			});
		});
		
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
		var _self = this,
			url = ROOT_URL + 'projects/' + this.state.project_id;
		var project = {
			name: this.state.project_name,
			description: this.state.project_description,
			value: this.state.project_value,
			effort: this.state.project_effort,
			status: this.state.project_status,
			deadline: this.state.project_deadline
		}
		
		sendRequest(url,'put', project).then(function(res) {
			console.log(res);
			_self.setState({error: res.message});
			// window.location = '/';
		});
	}
	render() {
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<p>{this.state.error}</p>
					<TextField hintText="Projectname"
						value={this.state.project_name}
						onChange={this.handleChangeName}
					/>
					<br />
					<TextField
						hintText="Description"
						value={this.state.project_description}
						multiLine={true}
						rows={2}
						rowsMax={4}
						onChange={this.handleChangeDescription}
					/><br />
					<TextField hintText="value"
						value={this.state.project_value}
						onChange={this.handleChangeValue}
					/>
					<br />
					<TextField hintText="effort"
						value={this.state.project_effort}
						onChange={this.handleChangeEffort}
					/>
					<br />
					<TextField hintText="status"
						value={this.state.project_status}
						onChange={this.handleChangeStatus}
					/>
					<br />
					<TextField hintText="deadline"
						value={this.state.handleChangeDeadline}
						onChange={this.handleChange}
					/>
					<br />
					<RaisedButton href="/" label="Cancel" style={style} />
    				<RaisedButton onTouchTap={this.handleSubmit} label="Update" primary={true} style={style} />
				</div>
			</MuiThemeProvider>
		)
	}
}


