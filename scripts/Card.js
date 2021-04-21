import { templateElement} from "./constants.js";


export default class Card {
    constructor({name, link, handleCardClick}, cardSelector) {
        this._title = name;
        this._link = link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const newCard = templateElement.content.querySelector(".element").cloneNode(true);

        return newCard;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".element__title").textContent = this._name;
        this._element.querySelector(".element__image").src = this._link;
        this._element.querySelector(".element__image").alt = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector(".element__bin").addEventListener("click", () => {
            this._deleteCard();
        });
        this._element.querySelector(".element__like").addEventListener("click", () => {
            this._likeCard();
        });
        this._element.querySelector(".element__image").addEventListener("click", () => this._handleCardClick({
      name: this._title,
      link: this._link
    }));
        }

    _likeCard() {
        this._element.querySelector(".element__like").classList.toggle("element__like_active");
    }

    _deleteCard() {
        this._element.remove();
    }
    /*
    _showCard() {
        showImagePopup({name: this._title, link: this._link, alt: this._title});
        /*
        openPopup(popupImage);
        open(imagePopup);
}*/
}