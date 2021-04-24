import { initialCards } from "./initial-cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from './UserInfo.js';
import Section from './Section.js';
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
    jobInput,
    container,*/
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
    nameInput,
    jobInput,
} from "./constants.js";

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const userInfo = new UserInfo(userNameSelector, userJobSelector);

/*
const userInfoPopup = new PopupWithForm(userInfoPopupSelector, (values) => {
    const item = {name: values.name, job: values.job};
    userInfoPopup.setUserInfo(values);
    userInfo.close();
});*/
const userInfoPopup = new PopupWithForm(userInfoPopupSelector, (values) => {
    const item = {name: values.name, job: values.job};
    userInfo.setUserInfo(values);
    userInfoPopup.close();
});
userInfoPopup.setEventListeners();

const newCardPopup = new PopupWithForm(newCardPopupSelector, (values) => {
    const item = {name: values.name, link: values.link};
    const newElement = createCard(item);
    newElement.addItem();
    newElement.setUserInfo(values);
    newCardPopup.close();
    });
    newCardPopup.setEventListeners();

function createCard(name, link, templateElement) {
    const card = new Card(name, link, templateElement);
    return card.generateCard();
}



const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, '.template', () => {
            imagePopup.open(item)
        });
        const cardView = card.generateCard()
        cardList.addItem(cardView, true);
        }
},'.elements__list');

cardList.renderer();

showUserInfoPopup.addEventListener('click', () => {
    const allUserInfo = userInfo.getUserInfo();
    nameInput.value = allUserInfo.name;
    jobInput.value = allUserInfo.job;
    userInfoPopup.open();
});

showNewCardPopup.addEventListener('click', () => {
    newCardPopup.open();
});

showUserInfoPopup.addEventListener('click', () => {
    const allUserInfo = userInfo.getUserInfo();
    nameInput.value = allUserInfo.name;
    jobInput.value = allUserInfo.job;
    userInfoPopup.open();
});

const userFormValidator = new FormValidator(validationConfig, popupForm);
userFormValidator.removeFormErrorContainer;
userFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, addCard);
cardFormValidator.removeFormErrorContainer();
cardFormValidator.removeInputValue();
cardFormValidator.disableSubmitButton();
cardFormValidator.enableValidation();
 


    /*const formUserInfoSubmitHandler = (newValues) => {
        userInfo.setuserinfo(newValues);
        userInfoPopup.close();
    }*/

   /* function disableSubmitButton(buttonElement) {
        const newCardPopupSaveBtn = document.querySelector('.popup__save');
        newCardPopupSaveBtn.classList.add("popup__save_disabled");
    }*/
 /*function createCard(name, link, templateElement) {
    const card = new Card(name, link, templateElement);
    return card.generateCard();
  };

  function renderCard (name, link, container, toEnd) {
    const card = createCard(name, link);
    const method = toEnd ? 'append' : 'prepend';
    container[method](card);
  }
  function submitAddCardForm(evt) {
    evt.preventDefault();
    renderCard(inputName.value, inputPlace.value, container);
    removeInputValue(popupAdd);

    closePopup(popupAdd);
}

addCard.addEventListener("submit", submitAddCardForm);*/



/*
    const formList = Array.from(document.querySelectorAll(validationConfig._formSelector));
formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });
});*/
/*
/*
  const newCard = new Card({name, link, templateElement,
    createCard:() => {
    const card = new Card(name, link, templateElement);
    return card.generateCard();
  }});

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

/*

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
*/





