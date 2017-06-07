import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { sendRequest } from '../helpers';
//import API
import {ROOT_URL} from '../config/config';
const url = ROOT_URL + 'projects';
const style = {
  margin: 12
};

export default class New extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			project: []
		}
	}
	handleChangeName = (event) => {
		this.setState({
			project_name: event.target.value
		});
	}
	handleChangeDescription = (event) => {
		this.setState({
			project_description: event.target.value
		});
	}
	handleSubmit = (event) => {
		console.log(this.state.project_name);
		var project = {
			name: this.state.project_name,
			value: this.state.project_value,
			effort: this.state.project_effort,
			status: this.state.project_status,
			deadline: this.state.project_deadline
		}
		sendRequest(url,'post', project).then(function(res) {
			window.location = '/';
		});
	}
	render() {
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
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
					/><br />
					<TextField hintText="value"
						value={this.state.project_value}
						onChange={this.handleChange}
					/>
					<br />
					<TextField hintText="effort"
						value={this.state.project_effort}
						onChange={this.handleChange}
					/>
					<br />
					<TextField hintText="status"
						value={this.state.project_status}
						onChange={this.handleChange}
					/>
					<br />
					<TextField hintText="deadline"
						value={this.state.project_deadline}
						onChange={this.handleChange}
					/>
					<br />
					<RaisedButton label="Cancel" style={style} />
    				<RaisedButton onTouchTap={this.handleSubmit} label="Update" primary={true} style={style} />
				</div>
			</MuiThemeProvider>
		)
	}
}


