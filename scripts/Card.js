import { openPopup} from "./utils.js";
import { templateElement, popupImage} from "./constants.js";
import {showImagePopup} from "./index.js"

export class Card {
    constructor(name, link, cardSelector) {
        this._title = name;
        this._link = link;

        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const newCard = templateElement.content.querySelector(".element").cloneNode(true);

        return newCard;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".element__title").textContent = this._title;
        this._element.querySelector(".element__image").src = this._link;
        this._element.querySelector(".element__image").alt = this._title;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector(".element__bin").addEventListener("click", () => {
            this._deleteCard();
        });
        this._element.querySelector(".element__like").addEventListener("click", () => {
            this._likeCard();
        });
        this._element.querySelector(".element__image").addEventListener("click", () => {
            this._showCard();
        });
    }

    _likeCard() {
        this._element.querySelector(".element__like").classList.toggle("element__like_active");
    }

    _deleteCard() {
        this._element.remove();
    }
    _showCard() {
        showImagePopup({name: this._title, link: this._link, alt: this._title});
        openPopup(popupImage);
}
}