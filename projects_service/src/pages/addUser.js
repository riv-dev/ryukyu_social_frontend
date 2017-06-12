import React from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

//import API
import { sendRequest } from '../helpers';
import {ROOT_URL, URL} from '../config/config';

const style = {
  margin: 12,
};

export default class AddUser extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			project_id: props.match.params.project_id,
			users: [],
			searchText: '',
			user_id: '',
			onActive:true,
			flashmessage:''
		}
	}
	handleUpdateInput = (searchText) => {
		this.setState({
			searchText: searchText,
			onActive: true
		});
	}
	handleNewRequest = (chosenRequest,index) => {
		this.setState({
			user_id: chosenRequest.value,
			onActive: false
		})
	}
	componentDidMount = () => {
		var url = URL + 'users_service/api/users',
			url_user_prj = ROOT_URL + 'projects/' + this.state.project_id + '/users',
			_self = this,
			user_in_project = [];
		
		//GET ALL USERS
		sendRequest(url,'get').then(function(res) {
			var users = [];
			for(var i=0; i<res.length;i++){
				users.push({
					text: res[i].firstname + " " + res[i].lastname,
					value: res[i].id
				});
			}
			//GET USERS IN PROJECT
			sendRequest(url_user_prj,'get').then(function(res) {
				user_in_project = res;
				for(var j=0; j<user_in_project.length;j++){
					var array = _self.removeItem(users,user_in_project[j].id); // REMOVE USER ALREADY EXIST
					users = array;
				}
				_self.setState({users:users});
			});
			
		});
	}

	removeItem = (arrDes, filterValue) => {
		var array = arrDes.filter(function(item) { 
			return item.value !== filterValue
		});
		return array;
	}

	handleSubmit = () => {
		var url = ROOT_URL + 'projects/' + this.state.project_id + '/users',
			_self = this,
			data = {
				user_id : this.state.user_id
			};	
		sendRequest(url,'post', data).then(function(res) {
			_self.setState({flashmessage:res.message});
			if(res.status === "success"){
				setTimeout(function(){
					window.location = '/projects/' + _self.state.project_id + '/users/' + _self.state.user_id;
				},1000)
			}
		});
	}
	render(){
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<p>{this.state.flashmessage}</p>
					<AutoComplete
						floatingLabelText="Name"
						filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          				openOnFocus={true}
						dataSource={this.state.users}
						searchText={this.state.searchText}
						onUpdateInput={this.handleUpdateInput}
						onNewRequest={this.handleNewRequest}
					/>
					<br />
					<RaisedButton href={"/projects/" + this.state.project_id} label="Cancel" style={style} />
    				<RaisedButton onTouchTap={this.handleSubmit} disabled={this.state.onActive} label="Update" primary={true} style={style} />
				</div>
			</MuiThemeProvider>
		)
	}
}