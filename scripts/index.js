import { initialCards } from "./initial-cards.js";
import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {removeFormErrorContainer} from "./utils.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from './UserInfo.js';
import {
   /* popup,*
    popupEdit,
    popupAdd,
    popupImage,*/
    showUserInfoPopup,
    closePopupButton,
    showNewCardPopup,
    /*closePopupAddButton,*/
    /*closeImagePopupButton,*/
    /*userName,
    userJob,
    nameInput,
    jobInput,*/
    container,
    popupForm,
    addCard,
    popupImageSelector, newCardPopupSelector, userJobSelector,userNameSelector,userInfoPopupSelector,
    templateElement,
    /*addButton,
    formEditProfile,
    inputName,
    inputPlace,*/
    popupImageName,
    popupImageCard,
    validationConfig,
} from "./constants.js";

const imagePopup = new PopupWithImage(popupImageSelector);
const userInfo = new UserInfo(userNameSelector, userJobSelector)
const userInfoPopup = new PopupWithForm(userInfoPopupSelector, (values) => {
    const item = {name: values.name, job: values.job};
    userInfo.setUserInfo(item.name, item.job);
    userInfoPopup.close();
});
const newCardPopup = new PopupWithForm(newCardPopupSelector, (values) => {
const item = {name: values.name, link: values.link}
});
imagePopup.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();

showUserInfoPopup.addEventListener('click', () => {
    userInfoPopup.open();
});
showNewCardPopup.addEventListener('click', () => {
    newCardPopup.open();
});

const card = new Card({name, link,
    handleCardClick: () => {
      imagePopup.open({name: this._title,
        link: this._link})
  , cardSelector}});
  
  function renderCard (name, link, container, toEnd) {
    const card = createCard(name, link);
    const method = toEnd ? 'append' : 'prepend';
    container[method](card);
  }

  initialCards.forEach((item) => {
    renderCard(item.name, item.link, container, true);
})
/*
export function showImagePopup(element) {
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
}); */


function disableSubmitButton(buttonElement) {
    addButton.classList.add("popup__save_disabled");
}
/*
showPopupEditProfileButton.addEventListener("click", function () {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    removeFormErrorContainer(popupEdit);
    editFormValidator.enableValidation();
    openPopup(popupEdit);
});

closePopupButton.addEventListener("click", function () {
    closePopup(popupEdit);
});*/


/*
popupEdit.addEventListener("click", function () {
    closePopup(popupEdit);
});
popupEdit.querySelector(".popup__container").addEventListener("click", function (evt) {
    evt.stopPropagation();
});

showPopupAddButton.addEventListener("click", function () {
    disableSubmitButton();
    removeFormErrorContainer(popupAdd);
    removeInputValue(popupAdd);
    addFormValidator.enableValidation();
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


function submitEditProfileForm(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;

    closePopup(popupEdit);
}

formEditProfile.addEventListener("submit", submitEditProfileForm);
/*
function createCard(name, link, templateElement) {
    const card = new Card(name, link, templateElement);
    return card.generateCard();
  };*/

  
/*
function submitAddCardForm(evt) {
    evt.preventDefault();
    renderCard(inputName.value, inputPlace.value, container);
    removeInputValue(popupAdd);

    closePopup(popupAdd);
}

addCard.addEventListener("submit", submitAddCardForm);*/

const formList = Array.from(document.querySelectorAll(validationConfig._formSelector));
formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });
});

const editFormValidator = new FormValidator(validationConfig, popupForm);

const addFormValidator = new FormValidator(validationConfig, addCard);
