import $ from 'jquery';
import {ROOT_URL,STATUS_PROJECT,WRITE_ACCESS} from './config/config';

const TOKEN_KEY = 'RItoken';
// localStorage.setItem('RItoken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdG5hbWUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlJvb3QiLCJ0aXRsZSI6IkRlZmF1bHQgVXNlciIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaGFzaGVkX3Bhc3N3b3JkIjpudWxsLCJhZG1pbiI6MSwiaWF0IjoxNDk3NDk5MjgxLCJleHAiOjE0OTc1MjgwODF9.Un2Rl0zdAtSYbjstejPjvj-p2DMTncnKu9mtz5r4Qa4')

export function getTokenKey() {
	const token = checkExpireToken(localStorage.getItem(TOKEN_KEY));
	if(!token){
		localStorage.setItem(TOKEN_KEY, null);
	}
  	return localStorage.getItem(TOKEN_KEY);
}

export function getUserId() {
	if(localStorage.getItem(TOKEN_KEY) != null){
		var decodedToken = parseJwt(localStorage.getItem(TOKEN_KEY));
  		return decodedToken.id;
	}
	return false;
}

export function isAdmin() {
	if(localStorage.getItem(TOKEN_KEY) != null){
		var decodedToken = parseJwt(localStorage.getItem(TOKEN_KEY));
		if(decodedToken.admin){
			return true;
		}else{
			return false;
		}
	}
}

export function sendRequest(url, method, data = null) {
	return $.ajax({
				type: method,
				url: url,
				data: data,
				headers: {
					'x-access-token': getTokenKey()
				},
				success: function(data){
					return data;
				},
				error: function(xhr, status, error) {
					// var err = JSON.parse(xhr.responseText);
					// return err;
				}
			});
}

export function checkPermission(project_id) {
	//get recent user info
	var permission = 0;
	if(getTokenKey() == null){
		return -1;
	}
	
	var url = ROOT_URL + 'projects/' + project_id + '/users/' + getUserId();
	
	sendRequest(url,'GET').then(function(res) {
		permission = res.write_access;
	});
	//check if admin
	if(isAdmin()){
		permission = 2;
	}
	return permission;

}

export function formatDate(date) {
   	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}

export function showStatus(status_code){
	var status = '';
	STATUS_PROJECT.filter(function(item) { 
		if(item.value === status_code){
			status =  item.text;
		}
		return true;
	});
	return status;
}

export function showWriteAccess(access_code){
	var access = '';
	WRITE_ACCESS.filter(function(item) { 
		if(item.value === access_code){
			access =  item.text;
		}
		return true;
	});
	return access;
}
export function checkShowContent(){
	const permission = checkExpireToken(getTokenKey());
	var show = false;
	if(permission >= 0){
		show = true
	}
	return show;
}
function parseJwt (token) {
	if(checkExpireToken(token)){
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}
	return false;
};
function checkExpireToken(token){
	if(token != null){
		var isExpiredToken = false;
		var dateNow = new Date();

		if(token.exp < dateNow.getTime())
		{
			isExpiredToken = true;
		}
		return isExpiredToken;
	}
	
}