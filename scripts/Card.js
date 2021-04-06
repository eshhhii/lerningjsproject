import {initialCards} from './initial-cards.js'
import {templateElement, container} from './constants.js'

export class Card {
    constructor(title, link, cardSelector){
        this._title = title;
        this._link = link;

        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const newCard =
        templateElement.content
        .querySelector('.element')
        .cloneNode(true);

        return newCard;
    }
    generateCard() {
        this._element = this._getTemplate();
    
        const titleCard = this._element.querySelector('.element__title').textContent = this._title;
        const linkCard = this._element.querySelector('.element__image');
        linkCard.src = this._link;
        linkCard.alt = this._title;
        const deleteButton = this._element.querySelector('.element__bin');
        const likeButton = this._element.querySelector('.element__like');
    
        return this._element;
    }
    _likeCard() {
        likeButton.classList.toggle('element__like_active');
    }
    
    _deleteCard() {
        this._element.remove();
    }

_setEventListeners(){
    deleteButton.addEventListener('click', () => {
        this._deleteCard();    
    });
    likeButton.addEventListener('click', () => {
        this._likeCard();
    });
    linkCard.addEventListener('click', () =>{
        showImagepopup(cardSelector);
    });
    linkCard.addEventListener('click', () => {
        const titlePopup = popupImage.querySelector(".popup__title");
        const imagePopup = popupImage.querySelector(".popup__image");
        titlePopup.textContent = this._name;
        imagePopup.src = this._link;
        imagePopup.alt = this._name;
        openPopup(popupImage);
    });
    return newCard;
}
}
initialCards.forEach(function(item){
    const card = new Card(item.name, item.link, templateElement);
    const cardElement = card.generateCard();
    container.append(cardElement); 
})

/*

function createNewCard(element) {
    const newCard = templateElement.content.cloneNode(true);
    const titleCard = newCard.querySelector(".element__title");
    const linkCard = newCard.querySelector(".element__image");
    const deleteButton = newCard.querySelector(".element__bin");
    const likeButton = newCard.querySelector(".element__like");

    titleCard.textContent = element.name;
    linkCard.src = element.link;
    linkCard.alt = element.name;

    deleteButton.addEventListener("click", deleteCard);
    likeButton.addEventListener("click", function () {
        likeButton.classList.toggle("element__like_active");
    });

    linkCard.addEventListener("click", function () {
        showImagePopup(element);
      })
    return newCard;
    }
        function deleteCard(evt) {
        evt.target.closest(".element").remove();
    }

    linkCard.addEventListener("click", function () {
        const titlePopup = popupImage.querySelector(".popup__title");
        const imagePopup = popupImage.querySelector(".popup__image");
        titlePopup.textContent = element.name;
        imagePopup.src = element.link;
        imagePopup.alt = element.name;
        openPopup(popupImage);
    });
    return newCard;
}
}*/