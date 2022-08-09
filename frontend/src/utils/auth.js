// auth.js

export const BASE_URL = process.env.NODE_ENV === "production"
? 'https://api.peterstaal.students.nomoredomainssbs.ru'
: 'http://localhost:3000';

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      handleResponse(res);
    });
    
}; 


export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ password, email }),
  })
    .then(res => handleResponse(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      } else {
        return; // we need to do this to avoid ESLint errors
      }
    });
  }
