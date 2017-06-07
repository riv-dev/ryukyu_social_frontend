import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
//import API
import {ROOT_URL} from '../config/config';

const style = {
  margin: 12,
};

export default class Show extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			project: [],
			project_id: props.match.params.project_id
		}
	}
	componentDidMount = () => {
		fetch(ROOT_URL + 'projects/' + this.state.project_id)
		.then (
			response=>response.json()
		)
		.then(
			project => this.setState({project})
		)
	}
	handleChange = (event) => {
		this.setState({
			value: event.target.value,
		});
	};
	render() {
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<TextField hintText="Projectname"
						value={this.state.project.name}
						onChange={this.handleChange}
					/>
					<br />
					<TextField
						hintText="Description"
						value={this.state.project.description}
						multiLine={true}
						rows={2}
						rowsMax={4}
					/><br />
					<TextField hintText="value"
						value={this.state.project.value}
						onChange={this.handleChange}
					/>
					<br />
					<TextField hintText="effort"
						value={this.state.project.effort}
						onChange={this.handleChange}
					/>
					<br />
					<TextField hintText="status"
						value={this.state.project.status}
						onChange={this.handleChange}
					/>
					<br />
					<TextField hintText="deadline"
						value={this.state.project.deadline}
						onChange={this.handleChange}
					/>
					<br />
					<RaisedButton label="Cancel" style={style} />
    				<RaisedButton label="Update" primary={true} style={style} />
				</div>
			</MuiThemeProvider>
		)
	}
}


