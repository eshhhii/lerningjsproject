export default class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
    }

    getInitialCards(){
        return fetch(`${this._url}/cards`, { 
            method: 'GET',
            headers: this._headers 
        })
        .then(res => this._checkResult(res))
            .catch(err => this._errorResult(err));
    }

    addCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
    }
    deleteCard(id){
        return fetch(`${this._url}${id}`, {
            method: 'DELETE',
            headers: this._headers,
    })
    .then((res) => {

    })
}
checkResult(){
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка! ${res.status}`);
}

errorResult(){
    console.log(err);
}

}