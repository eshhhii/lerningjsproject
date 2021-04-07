import {initialCards} from './initial-cards.js';
import {Card} from './Card.js';
import {openPopup, escClosePopup} from './utils.js'
import {popup, popupEdit, popupAdd, popupImage, showPopupButton, closePopupButton, showPopupAddButton} from './constants.js';
import {closePopupAddButton, closeImagePopupButton, userName, userJob, nameInput, jobInput, container, addCard, templateElement, formElement} from './constants.js';

/*const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_images");
const showPopupButton = document.querySelector(".profile__edit");
const closePopupButton = document.querySelector(".popup__close");
const showPopupAddButton = document.querySelector(".profile__add");
const closePopupAddButton = popupAdd.querySelector(".popup__close");
const closeImagePopupButton = popupImage.querySelector(".popup__close");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job");
const nameInput = document.querySelector("#username");
const jobInput = document.querySelector("#userjob");
const container = document.querySelector(".elements__list");
const addCard = document.querySelector("#popupFormAdd");
const templateElement = document.querySelector(".template");
let formElement = document.querySelector(".popup__container");*/

function notValidButton(addCard) {
    const addButton = addCard.querySelector(".popup__save");
    addButton.classList.add("popup__save_disabled");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", escClosePopup);
}

showPopupButton.addEventListener("click", function () {
    openPopup(popupEdit);
});

closePopupButton.addEventListener("click", function () {
    closePopup(popupEdit);
});

popupEdit.addEventListener("click", function () {
    closePopup(popupEdit);
});
popupEdit.querySelector(".popup__container").addEventListener("click", function (evt) {
    evt.stopPropagation();
});

showPopupAddButton.addEventListener("click", function () {
    notValidButton(addCard);
    openPopup(popupAdd);
});
closePopupAddButton.addEventListener("click", function () {
    closePopup(popupAdd);
});
popupAdd.addEventListener("click", function () {
    closePopup(popupAdd);
});
popupAdd.querySelector(".popup__container").addEventListener("click", function (evt) {
    evt.stopPropagation();
});

export function showImagePopup(element) {
    const popupImageName = popupImage.querySelector(".popup__title");
    const popupImageCard = popupImage.querySelector(".popup__image");

    popupImageName.textContent = element.name;
    popupImageCard.src = element.link;
    popupImageCard.alt = element.name;
    openPopup(popupImage);
}
closeImagePopupButton.addEventListener("click", function () {
    closePopup(popupImage);
});
popupImage.addEventListener("click", function () {
    closePopup(popupImage);
});
popupImage.querySelector(".popup__container").addEventListener("click", function (evt) {
    evt.stopPropagation();
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;

    closePopup(popupEdit);
}

formElement.addEventListener("submit", formSubmitHandler);


initialCards.forEach(function(item){
    const card = new Card(item.name, item.link, templateElement);
    const cardElement = card.generateCard();
    container.append(cardElement); 
})

function addCardFormListener(evt) {
    evt.preventDefault();
    const inputName = addCard.querySelector("#placeName");
    const inputPlace = addCard.querySelector("#placeLink");
    const item = new Card(inputName.value, inputPlace.value);
    const newCardItem = item.generateCard();
    container.prepend(newCardItem);
    inputName.value = "";
    inputPlace.value = "";

    closePopup(popupAdd);
}

addCard.addEventListener("submit", addCardFormListener);
