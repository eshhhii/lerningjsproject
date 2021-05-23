import { initialCards } from "../utils/initial-cards.js";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import "../pages/index.css";
import Popup from "../components/Popup.js";
import Api from "../components/Api.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
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
  userAvatarSelector,
  userInfoPopupSelector,
  templateElement,
  validationConfig,
  nameInput,
  jobInput,
  popupUserPicSelector,
  popupDeleteCardSelector,
  showUserPicPopup,
  /*showDeleteCardPopup,*/
  popupFormAvatar,
} from "../utils/constants.js";
let userId;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: "a37e79bf-5aa8-4ffb-8375-5c9e4f6d74df",
    "content-type": "application/json",
  },
});
/*
api.getInitialCards().then((res) => {
  cardList.renderItems(res);
});

api.getUserInfo().then((res) => {
  console.log(res);
  userId = res;
});*/

api
  .getAllData()
  .then((args) => {
    const [dataUserInfo, dataCards] = args;
    userInfo.setUserInfo(dataUserInfo.name, dataUserInfo.about);
    userInfo.setAvatar(dataUserInfo.avatar);
    userId = dataUserInfo._id;
    cardList.renderItems(dataCards);
  })
  .catch((data) => {
    console.log(data);
  });

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const userInfo = new UserInfo(userNameSelector, userJobSelector);

const userInfoPopup = new PopupWithForm(userInfoPopupSelector, (values) => {
  const item = { name: values.name, about: values.job };
  userInfo.setUserInfo(item.name, item.about);
  userInfoPopup.close();
});
userInfoPopup.setEventListeners();

const newCardPopup = new PopupWithForm(newCardPopupSelector, (values) => {
  const item = { name: values.name, link: values.link };
  const newElement = createCard(item.name, item.link, templateElement);
  const newCard = newElement.generateCard();
  cardList.addItem(newCard);
  newCardPopup.close();
});
newCardPopup.setEventListeners();
/*
const userPicPopup = new PopupWithForm(popupUserPicSelector, () => {

});
userPicPopup.setEventListeners();

const deleteCardPopup = new PopupWithSubmit(popupDeleteCardSelector, () => {

});
deleteCardPopup.setEventListeners();*/

const userPicPopup = new PopupWithForm(popupUserPicSelector, (values) => {
  const item = { link: values.link };
  userPicPopup.close();
});
userPicPopup.setEventListeners();

const deleteCardPopup = new PopupWithSubmit(
  popupDeleteCardSelector,
  (evt, card) => {
    evt.preventDefault(card);
  }
);
deleteCardPopup.setEventListeners();

function createCard(name, link, templateElement) {
  const card = new Card(name, link, templateElement, {
    handleCardClick: (name, link) => {
      imagePopup.open({ name, link });
    },
  });
  return card;
}

const cardList = new Section(
  {
    /*items: initialCards,*/
    renderer: (item) => {
      const card = createCard(item.name, item.link, templateElement);
      const cardView = card.generateCard();
      cardList.addItem(cardView, true);
    },
  },
  containerSelector
);
/*
cardList.renderer();*/

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-23",
  headers: {
    Authorization: "aaeefd51-5fdb-4127-96af-d3773d3eb60b",
    "content-type": "application/json",
  },
});

api.getInitialCards().then((data) => {
  cardList.renderer(data);
});

showNewCardPopup.addEventListener("click", () => {
  cardFormValidator.removeFormErrorContainer();
  cardFormValidator.disableSubmitButton();
  newCardPopup.open();
});

showUserInfoPopup.addEventListener("click", () => {
  const allUserInfo = userInfo.getUserInfo();
  nameInput.value = allUserInfo.name;
  jobInput.value = allUserInfo.job;
  userFormValidator.removeFormErrorContainer();
  userInfoPopup.open();
});
/*
showUserPicPopup.addEventListener("click", () => {
    avatarFormValidator.removeFormErrorContainer();
    userPicPopup.open();
});

showDeleteCardPopup.addEventListener("click", () => {
    deleteCardPopup.open();
});*/

showUserPicPopup.addEventListener("click", () => {
  avatarFormValidator.removeFormErrorContainer();
  userPicPopup.open();
});
/*
showDeleteCardPopup.addEventListener("click", () => {
  deleteCardPopup.open();
});*/

const userFormValidator = new FormValidator(validationConfig, popupForm);
userFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, addCard);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validationConfig,
  popupFormAvatar
);
avatarFormValidator.enableValidation();
