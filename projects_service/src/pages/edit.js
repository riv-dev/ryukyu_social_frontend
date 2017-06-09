import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, blue500} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
//import API
import { sendRequest, checkPermission } from '../helpers';
import {ROOT_URL} from '../config/config';

const style = {
  margin: 12,
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
export default class Show extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			project_id: props.match.params.project_id,
			onActive: true,
			flashMessage:'',
			errorName:'',
			project_name:'',
			project_description:'',
			project_value:'',
			project_effort:'',
			project_status:'',
			project_deadline: null
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
			var deadline = res.deadline ? new Date(res.deadline) : null;
			_self.setState({
				project_name: res.name,
				project_description: res.description ? res.description : '',
				project_value: res.value ? res.value : '',
				project_effort: res.effort ? res.effort : '',
				project_status: res.status_code ? res.status_code : '',
				project_deadline: deadline
			});
		});
		
	}
	formatDate = (date) => {
		return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
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
	handleChangeDeadline = (event, date) => {
		this.setState({
			project_deadline: date
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
			value: parseInt(this.state.project_value, 10),
			effort: parseInt(this.state.project_effort, 10),
			status_code: parseInt(this.state.project_status, 10),
			deadline: _self.formatDate(this.state.project_deadline)
		}
		sendRequest(url,'put', project).then(function(res) {
			if(res.status === "success"){
				_self.setState({flashmessage:res.message});
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
					<p>{this.state.flashMessage}</p>
					<TextField
						value={this.state.project_name}
						onChange={this.handleChangeName}
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
						onChange={this.handleChangeStatus}
						floatingLabelText="status"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
					/>
					<br />
					<DatePicker
						value={this.state.project_deadline}
						hintText="Deadline"
						onChange={this.handleChangeDeadline}
						autoOk={true}
					/>
					<br />
					<RaisedButton href="/" label="Cancel" style={style} />
    				<RaisedButton onTouchTap={this.handleSubmit} label="Update" primary={true} style={style} />
				</div>
			</MuiThemeProvider>
		)
	}
}


