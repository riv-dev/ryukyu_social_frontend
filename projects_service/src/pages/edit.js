import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, blue500} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//import API
import { sendRequest, checkPermission } from '../helpers';
import {ROOT_URL,STATUS_PROJECT} from '../config/config';

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

		const defaultDate = new Date();
		defaultDate.setFullYear(defaultDate.getFullYear() - 1);

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
			project_deadline:defaultDate,
			project_startdate:defaultDate
		}
	}
	componentDidMount = () => {
		var _self = this,
			url = ROOT_URL + 'projects/' + this.state.project_id,
			permission = checkPermission();
		if(permission < 1){
			window.location = '/projects_service';
		}
		sendRequest(url,'GET').then(function(res) {
			var deadline = res.deadline ? new Date(res.deadline) : _self.state.project_deadline;
			var startDate = res.start_date ? new Date(res.start_date) : _self.state.project_startdate;
			_self.setState({
				project: res,
				project_name: res.name,
				project_description: res.description ? res.description : '',
				project_value: res.value ? res.value : '',
				project_effort: res.effort ? res.effort : '',
				project_status: res.status ? res.status : 0,
				project_deadline: deadline,
				project_startdate: startDate
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

	handleChangeStartDate = (event, date) => {
		this.setState({
			project_startdate: date
		});
	}

	handleChangeStatus = (event, index, value) => {
		this.setState({
			project_status: value
		});
	}
	handleSubmit = (event) => {
		var _self = this,
			url = ROOT_URL + 'projects/' + this.state.project_id;

		var project = {
			name: this.state.project_name,
			description: this.state.project_description,
			value: this.state.project_value ? parseInt(this.state.project_value, 10) : 0,
			effort: this.state.project_effort ? parseInt(this.state.project_effort, 10) : 0,
			status: this.state.project_status ? this.state.project_status : "",
			deadline: _self.formatDate(this.state.project_deadline),
			start_date: _self.formatDate(this.state.project_startdate)
		}
		sendRequest(url,'PUT', project).then(function(res) {
			_self.setState({flashmessage:res.message});
			if(res.status === "success"){
				setTimeout(function(){
					window.location = '/projects_service/projects/' + res.project_id
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
					<SelectField
						floatingLabelText="status"
						value={this.state.project_status}
						onChange={this.handleChangeStatus}
						>
						{
							STATUS_PROJECT.map((status, index) => {
								return <MenuItem key={index} value={status.value} primaryText={status.text}>
										</MenuItem>
							})
						}
					</SelectField>
					<br />
					<DatePicker
						value={this.state.project_startdate}
						hintText="Start Date"
						onChange={this.handleChangeStartDate}
						autoOk={true}
					/>
					<br />
					<DatePicker
						value={this.state.project_deadline}
						hintText="Deadline"
						onChange={this.handleChangeDeadline}
						autoOk={true}
					/>
					<br />
					<RaisedButton href={"/projects/" + this.state.project_id} label="Cancel" style={style} />
    				<RaisedButton onTouchTap={this.handleSubmit} label="Update" primary={true} style={style} />
				</div>
			</MuiThemeProvider>
		)
	}
}


