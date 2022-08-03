

class Api {
    constructor({ baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._section = null;
      }

      _handleResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      }

      initialize() {
        return Promise.all([
          this.getInitialUser(),
          this.getInitialCards()
        ]);
      }
    
      getInitialCards() {
            return fetch(`${this._baseUrl}/cards`, {
              headers: this._headers
            })
            .then(res => this._handleResponse(res)); 
      }

      getInitialUser() {
            return fetch(`${this._baseUrl}/users/me`, {
              headers: this._headers
            })
            .then(res => this._handleResponse(res)); 
      }


      addCart({title, link}){
        return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: title,
            link
          })
        })
        .then(res => this._handleResponse(res)); 
     }


     deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers
      })
      .then(res => this._handleResponse(res)); 
     }

     toggleLike(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
          method: isLiked ? "DELETE" : "PUT",
          headers: this._headers
        })
        .then(res => this._handleResponse(res)); 
     }

     changePicture({avatar}){
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            avatar
          })
        })
        .then(res => this._handleResponse(res)); 
      }

      setNewUser({userName, userJob}) { 
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
              name: userName,
              about: userJob
            })
            })
            .then(res => this._handleResponse(res)); 
      }    

};

//initalize api instance
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "5ad7ef92-ff2d-4fbe-9e41-f5034926c435",
    "Content-Type": "application/json"
  }
}); 

export default api;

