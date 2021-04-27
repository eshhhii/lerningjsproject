import { initialCards } from "../utils/initial-cards.js";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import '../pages/index.css';
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
    showUserInfoPopup,
    showNewCardPopup,
    popupForm,
    addCard,
    popupImageSelector,
    newCardPopupSelector,
    containerSelector,
    userJobSelector,
    userNameSelector,
    userInfoPopupSelector,
    templateElement,
    validationConfig,
    nameInput,
    jobInput,
} from "../utils/constants.js";

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const userInfo = new UserInfo(userNameSelector, userJobSelector);

const userInfoPopup = new PopupWithForm(userInfoPopupSelector, (values) => {
    const item = { name: values.name, job: values.job };
    userInfo.setUserInfo(item.name, item.job);
    userInfoPopup.close();
});
userInfoPopup.setEventListeners();

const newCardPopup = new PopupWithForm(newCardPopupSelector, (values) => {
    const item = { name: values.name, link: values.link };
    const newElement = createCard(item.name, item.link, templateElement);
    const newCard = newElement.generateCard();
    cardList.addItem(newCard);
    newCardPopup.close();
    cardFormValidator.disableSubmitButton();
});
newCardPopup.setEventListeners();

function createCard(name, link, templateElement) {
    const card = new Card(name, link, templateElement, () => {
        imagePopup.open({ name, link })
    });
    return card;
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item.name, item.link, templateElement)
        const cardView = card.generateCard()
        cardList.addItem(cardView, true);
    }
}, containerSelector);

cardList.renderer();

showNewCardPopup.addEventListener('click', () => {
    cardFormValidator.removeFormErrorContainer();
    newCardPopup.open();
});

showUserInfoPopup.addEventListener('click', () => {
    const allUserInfo = userInfo.getUserInfo();
    nameInput.value = allUserInfo.name;
    jobInput.value = allUserInfo.job;
    userFormValidator.removeFormErrorContainer();
    userInfoPopup.open();
});

const userFormValidator = new FormValidator(validationConfig, popupForm);
userFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, addCard);
/*cardFormValidator.disableSubmitButton();*/
cardFormValidator.enableValidation();