class Api {
    constructor(options) {
        this._headers = options.headers;
        this._url = options.url;
    }


    changeLikeCardStatus(id, isLiked, token) {
        if (isLiked) {
            return this.setLike(id, token);
        } else {
            return this.removeLike(id, token);
        }
    }

//Получил информациб о профиле с сервера
    getUserInfo(token) {
        return fetch(`${this._url}/users/me`, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },

        })
            .then(this._checkRes)

    }

//Получил с сервера карточки
    getInitialCards(token) {
        return fetch(`${this._url}/cards`, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._checkRes)
    }

//Добавил новую информацию о профиле на сервер
    editUserData(data, token) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
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
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
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
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._checkRes)
    }


    setLike(cardId, token) {
        return fetch(`${this._url}/cards/${cardId}/likes`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            .then(this._checkRes)
    }

    removeLike(cardId, token) {
        return fetch(`${this._url}/cards/${cardId}/likes`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            .then(this._checkRes)
    }

    updateAvatar(data, token) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
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
    url: `http://backend.nomoredomains.rocks`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api