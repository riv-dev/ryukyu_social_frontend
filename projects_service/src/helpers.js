import $ from 'jquery';
const TOKEN_KEY = 'token';
localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibGFzdG5hbWUiOiJQaGFtIiwiZmlyc3RuYW1lIjoiVHJ1YyIsInRpdGxlIjoiRnJvbnQgRW5kIEVuZ2luZWVyIiwiZW1haWwiOiJ0cnVjQHJ5dWt5dS1pLmNvLmpwIiwiaGFzaGVkX3Bhc3N3b3JkIjpudWxsLCJhZG1pbiI6MCwiaWF0IjoxNDk2ODI1MTQ5LCJleHAiOjE0OTY4NTM5NDl9.XylIsQNBpleh8FN9JyMMpew02vMTgvE7y-zB3DfbiGg')

export function getTokenKey() {
  return localStorage.getItem(TOKEN_KEY);
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
				error: function(error) {
					return error.response;
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
				error: function(error) {
					return error.response;
				}
			});		

    default:
      return null;
  }

}

// function validateJWT(response) {
// 	console.log(response);
//   if (!response.headers['login'] && getTokenKey()) {
//     window.location.reload();
//   }

//   return response;

// }