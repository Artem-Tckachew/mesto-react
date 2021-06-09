import {options} from './constants'
class Api {
  constructor({ address, token, groupId }) {
    this._token = token;
    this._groupId = groupId;
    this._address = address;
  }

  response(res) {
    return res.ok ? res.json() : Promise.reject(`Произошла ошибка со статус-кодом ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this.response)
  }

  addCard(card) {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(this.response)
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/${this._groupId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(this.response)
  }

  getUserData() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this.response)
  }

  setUserData({name, about}) {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this.response)
  }

  setUserAvatar({avatar}) {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(this.response)
  }

  changeLike(cardId, like) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(this.response)
  }

}

const api = new Api(options);
export default api;
