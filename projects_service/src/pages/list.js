import React from 'react';
import {Link} from 'react-router-dom';
import { List, ListItem } from 'material-ui';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
//import API
import { sendRequest, checkPermission, checkShowContent } from '../helpers';
import {ROOT_URL} from '../config/config';
const url = ROOT_URL + 'projects';

const style = {
  margin: 12,
};

export default class ListProject extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			projects : []
		}
	}
	componentDidMount = () => {
		var show = checkShowContent();
		if(show){
			var _self = this,
				permission = checkPermission();
			if(permission >=0){
				sendRequest(url,'GET').then(function(res) {
					_self.setState({projects: res});
				});
			}
		}
	}

	beDetail = (project_id) => {
		var permission = checkPermission();
		if(permission >= 0){
			return <Link style={style} to={`/projects/${project_id}`}>Detail</Link>
		}
	}
	beEdit = (project_id) => {
		var permission = checkPermission();
		if(permission >= 1){
			return <Link style={style} to={`/projects/${project_id}/edit`}>Edit</Link>
		}
	}
	beDelete = (project_id) => {
		var permission = checkPermission();
		if(permission >= 2){
			return <span style={style} onClick={() => {this.removeProject(project_id)}}>remove project</span>
		}
	}
	beAddNew = () => {
		var permission = checkPermission();
		if(permission >= 0){
			return <Link to={`/new`}>Add new project</Link>
		}
	}
	removeProject = (project_id) => {
		var url = ROOT_URL + 'projects/' + project_id,
			_self = this;
		sendRequest(url,'DELETE').then(function(res) {
			_self.removeProjectInList(project_id)
		});
	}

	removeProjectInList = (project_id) => {
		var array = this.state.projects.filter(function(item) {
			return item.id !== project_id
		});
		this.setState({
			projects: array
		})
	}

	render() {
		const permission = checkShowContent();
		var show = false;
		if(permission >= 0){
			show = true
		}
		return(
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					{show ?
					<div>
						<List>
							{
								this.state.projects.map(project => {
									return <ListItem key={project.id} >
												<p>{project.name}</p>
												<p>
													{this.beDetail(project.id)}
													{this.beEdit(project.id)}
													{this.beDelete(project.id)}
												</p>
											</ListItem>
								})
							}
						</List>
					{this.beAddNew()}
					</div>
					: 'Please Login'}
				</div>
			</MuiThemeProvider>
		)
	}
}