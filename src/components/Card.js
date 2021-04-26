export default class Card {
    constructor(name, link, cardSelector, handleCardClick) {
        this._title = name;
        this._link = link;
        this._handleCardClick = handleCardClick;
        this._card = cardSelector;
    }

    _getTemplate() {
        const newCard = this._card.content.querySelector(".element").cloneNode(true);

        return newCard;
    }
    generateCard() {
        this._element = this._getTemplate();
        this.setEventListeners();
        this._element.querySelector(".element__title").textContent = this._title;
        this._element.querySelector(".element__image").src = this._link;
        this._element.querySelector(".element__image").alt = this._title;

        return this._element;
    }

    setEventListeners() {
        this._element.querySelector(".element__bin").addEventListener("click", () => {
            this._deleteCard();
        });
        this._element.querySelector(".element__like").addEventListener("click", () => {
            this._likeCard();
        });
        this._element.querySelector(".element__image").addEventListener("click", () => {
            this._handleCardClick();
        });
        }

    _likeCard() {
        this._element.querySelector(".element__like").classList.toggle("element__like_active");
    }

    _deleteCard() {
        this._element.remove();
    }
 
}