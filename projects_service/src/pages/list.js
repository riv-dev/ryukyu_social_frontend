import React from 'react';
//import API
import {ROOT_URL} from '../config/config'

export class List extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			projects : [
				{
					"id":"1",
					"name":"Projectname1"
				},
				{
					"id":"2",
					"name":"Projectname2"
				},
				{
					"id":"3",
					"name":"Projectname3"
				},
				{
					"id":"4",
					"name":"Projectname4"
				}
			]
		}
	}
	componentDidMount(){
		fetch({ROOT_URL} + 'projects')
		.then( (response) => {
			return response.json() })   
				.then( (json) => {
					this.setState({data: json});
				});
	}
	render() {
		const {projects} = this.state;
		return(
			<ul>
				{
					projects.map(project => {
						return <li key={project.id}>{project.name}</li>
					})
				}
			</ul>
		)
	}
}
