import $ from 'jquery';
import {ROOT_URL} from './config/config';

const TOKEN_KEY = '_wToken';
localStorage.setItem('_wToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdG5hbWUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlJvb3QiLCJ0aXRsZSI6IkRlZmF1bHQgVXNlciIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaGFzaGVkX3Bhc3N3b3JkIjpudWxsLCJhZG1pbiI6MSwiaWF0IjoxNDk2ODk1NDE0LCJleHAiOjE0OTY5MjQyMTR9.LkUU714lcQhdcQ-z5op64geDhOVbN-eRjtn8l6QvoK0')

export function getTokenKey() {
  	return localStorage.getItem(TOKEN_KEY);
}

export function getUserId() {
	var decodedToken = parseJwt(localStorage.getItem(TOKEN_KEY));
  	return decodedToken.id;
}

export function isAdmin() {
	var decodedToken = parseJwt(localStorage.getItem(TOKEN_KEY));
	if(decodedToken.admin){
		return true;
	}else{
		return false;
	}
}

export function sendRequest(url, method, data = null) {
  switch (method) {
    case 'get' :
      return $.ajax({
				url: url,
				dataType: 'json',
				headers: {
					'x-access-token': getTokenKey()
				},
				success: function(data){
					return data;
				},
				error: function(error) {
					return error.response;
				}
			});

    case 'post':
      return $.ajax({
				type: 'POST',
				url: url,
				data: data,
				headers: {
					'x-access-token': getTokenKey()
				},
				success: function(data){
					return data;
				},
				error: function(xhr, status, error) {
					var err = JSON.parse(xhr.responseText);
					return err;
				}
			});
	case 'put':
      return $.ajax({
				type: 'PUT',
				url: url,
				data: data,
				headers: {
					'x-access-token': getTokenKey()
				},
				success: function(data){
					return data;
				},
				error: function(xhr, status, error) {
					var err = JSON.parse(xhr.responseText);
					return err;
				}
			});		
	case 'delete':
		return $.ajax({
				type: 'DELETE',
				url: url,
				data: data,
				headers: {
					'x-access-token': getTokenKey()
				},
				success: function(data){
					return data;
				},
				error: function(xhr, status, error) {
					console.log(xhr.responseText)
					// var err = JSON.parse(xhr.responseText);
					// return err;
				}
			});		
    default:
      return null;
  }

}

export function checkPermission(project_id) {
	//get recent user info
	var permission = 0;
	var url = ROOT_URL + 'projects/' + project_id + '/users/' + getUserId();
	
	sendRequest(url,'get').then(function(res) {
		permission = res.write_access;
	});
	//check if admin
	if(isAdmin()){
		permission = 2;
	}
	return permission;

}

// function validateJWT(response) {
// 	console.log(response);
//   if (!response.headers['login'] && getTokenKey()) {
//     window.location.reload();
//   }

//   return response;

// }

function parseJwt (token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(window.atob(base64));
};