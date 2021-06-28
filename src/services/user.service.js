const API_URL = 'http://127.0.0.1:5000';

export function loginUser(email, password) {
  const requestOptions = {
    method: 'POST',
    timeout: 5000,
    headers: { 
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({
      email,
      password
    }),
  };

  return fetch(`${API_URL}/login`, requestOptions).then(handleResponse);
}

export function uploadEntries(entries) {
  const requestOptions = {
    method: 'POST',
    timeout: 5000,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(
      entries
    ),
  };

  return fetch(`${API_URL}/save`, requestOptions).then(handleResponse);
}

export function fetchEntries() {
  const requestOptions = {
    method: 'GET',
    timeout: 5000,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
  };

  return fetch(`${API_URL}/workbook`, requestOptions).then(handleResponse);
}

export function registerUser(email, password, first, last) {
  console.log(`USER: ${email} ${password} ${first} ${last}`)
  const requestOptions = {
      method: 'POST',
      timeout: 5000,      
      headers: { 
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        email,
        password,
        first,
        last,
      }),
  };
  return fetch(`${API_URL}/register`, requestOptions).then(handleResponse);
}

export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token ');
}

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          console.log(response);

          if (response.status === 401) {
              // auto logout if 401 response returned from api
              logout();
          }
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      return data;
  });
}