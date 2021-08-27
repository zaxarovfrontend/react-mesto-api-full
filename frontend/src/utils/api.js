class Api {
    constructor(options) {
        this._headers = options.headers;
        this._url = options.url;
    }


    changeLikeCardStatus(id, isLiked, token) {
        if (isLiked) {
            return this.setLike(id);
        } else {
            return this.removeLike(id);
        }
    }

//Получил информациб о профиле с сервера
    getUserInfo(token) {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,

        })
            .then(this._checkRes)

    }

//Получил с сервера карточки
    getInitialCards(token) {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,

        })
            .then(this._checkRes)

    }

//Добавил новую информацию о профиле на сервер
    editUserData(data, token) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,

            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkRes)
    }

    addCard(data, token) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,

            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkRes)
    }

    cardDelete(cardId, token) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,

        })
            .then(this._checkRes)
    }


    setLike(cardId, token) {
        return fetch(`${this._url}/cards/likes/${cardId}`,
            {
                method: 'PUT',
                headers: this._headers,
                Authorization: `Bearer ${token}`
            })
            .then(this._checkRes)
    }

    removeLike(cardId, token) {
        return fetch(`${this._url}/cards/likes/${cardId}`,
            {
                method: 'DELETE',
                headers: this._headers,

            })
            .then(this._checkRes)
    }

    updateAvatar(data, token) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            Authorization: `Bearer ${token}`,
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(this._checkRes)
    }

    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

const api = new Api({
    url: `https://backend.nomoredomains.rocks`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api