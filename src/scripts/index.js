import { initialCards } from "./initial-cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import '../pages/index.css';
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import {
    showUserInfoPopup,
    closePopupButton,
    showNewCardPopup,
    popupForm,
    addCard,
    popupImageSelector, 
    newCardPopupSelector,
     userJobSelector,
     userNameSelector,
     userInfoPopupSelector,
    templateElement,
    popupImageName,
    popupImageCard,
    validationConfig,
    nameInput,
    jobInput,
} from "./constants.js";

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const userInfo = new UserInfo(userNameSelector, userJobSelector);

const userInfoPopup = new PopupWithForm(userInfoPopupSelector, (values) => {
    const item = {name: values.name, job: values.job};
    userInfo.setUserInfo(item.name, item.job);
    userInfoPopup.close();
});
userInfoPopup.setEventListeners();

const newCardPopup = new PopupWithForm(newCardPopupSelector, (values) => {
    const item = {name: values.name, link: values.link};
    const newElement = createCard(item.name, item.link, templateElement);
    const newCard = newElement.generateCard();
    cardList.addItem(newCard);
    newCardPopup.close();
    });
    newCardPopup.setEventListeners();

function createCard(name, link, templateElement) {
    const card = new Card(name, link, templateElement, () => {
        imagePopup.open({name, link})});
    return card; 
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {  const card = createCard(item.name, item.link, templateElement)
        const cardView = card.generateCard()
        cardList.addItem(cardView, true);
        }
},'.elements__list');

cardList.renderer();

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
cardFormValidator.disableSubmitButton();
cardFormValidator.enableValidation();





