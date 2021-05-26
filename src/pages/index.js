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
const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const userInfo = new UserInfo(
  userNameSelector,
  userJobSelector,
  userAvatarSelector
);
/*
const userInfoPopup = new PopupWithForm(userInfoPopupSelector, (values) => {
  userInfoPopup.rendererLoading(true);
  const item = { name: values.name, about: values.job };
  userInfo.setUserInfo(item.name, item.about);
  userInfoPopup.close();
});
userInfoPopup.setEventListeners();*/

const userInfoPopup = new PopupWithForm(userInfoPopupSelector, (values) => {
  userInfoPopup.rendererLoading(true);
  api
    .editUserInfo(values.name, values.about)
    .then(() => {
      userInfo.setUserInfo(values.name, values.about);
      userInfoPopup.close();
    })
    .finally(() => {
      userInfoPopup.rendererLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
});
userInfoPopup.setEventListeners();
/*
const newCardPopup = new PopupWithForm(newCardPopupSelector, (values) => {
  newCardPopup.rendererLoading(true);
  const newElement = createCard(item.name, item.link, templateElement);
  const newCard = newElement.generateCard();
  cardList.addItem(newCard);
  newCardPopup.close();
});
newCardPopup.setEventListeners();*/

const newCardPopup = new PopupWithForm(newCardPopupSelector, (values) => {
  api
    .addCard(values.name, values.link)
    .then((item) => {
      const newElement = createCard(item, templateElement, api);
      const newCard = newElement.generateCard();
      cardList.addItem(newCard);
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
/*
const userPicPopup = new PopupWithForm(popupUserPicSelector, () => {

});
userPicPopup.setEventListeners();

const deleteCardPopup = new PopupWithSubmit(popupDeleteCardSelector, () => {

});
deleteCardPopup.setEventListeners();*/

const userPicPopup = new PopupWithForm(popupUserPicSelector, (values) => {
  userPicPopup.rendererLoading(true);
  api
    .editUserAvatar(values["link-avatar"])
    .then(() => {
      userInfo.setAvatar(values["link-avatar"]);
      userPicPopup.close();
    })
    .finally(() => {
      userPicPopup.rendererLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
});
userPicPopup.setEventListeners();

const deleteCardPopup = new PopupWithSubmit(
  popupDeleteCardSelector,
  (evt, card) => {
    evt.preventDefault(card);
  }
);
deleteCardPopup.setEventListeners();

api
  .getAllData()
  .then((arg) => {
    const [dataUserInfo, dataCards] = arg;
    userInfo.setUserInfo(dataUserInfo.name, dataUserInfo.about);
    userInfo.setAvatar(dataUserInfo.avatar);
    userId = dataUserInfo._id;
    cardList.renderItems(dataCards);
  })
  .catch((data) => {
    console.log(data);
  });
/*
api
  .editUserInfo()
  .then((values) => {
    userInfo.setUserInfo(values.name, values.job);
    userInfoPopup.close();
  })
  .catch((err) => {
    console.log(err);
  });*/

function createCard(item, userId, templateElement) {
  const card = new Card(
    item,
    userId,
    templateElement,
    {
      handleCardClick: (name, link) => {
        imagePopup.open(name, link);
      },
      handleCardLike: () => {},
      handleCardDelete: () => {
        deleteCardPopup.open();
      },
    },
    item._id
  );
  return card;
}

const cardList = new Section(
  {
    /*items: initialCards,*/
    renderer: (item) => {
      const card = createCard(item, userId, templateElement);
      const cardView = card.generateCard();
      cardList.addItem(cardView, true);
    },
  },
  containerSelector
);
/*
cardList.renderer();*/

showNewCardPopup.addEventListener("click", () => {
  cardFormValidator.removeFormErrorContainer();
  cardFormValidator.disableSubmitButton();
  newCardPopup.open();
});

showUserInfoPopup.addEventListener("click", () => {
  const allUserInfo = userInfo.getUserInfo();
  nameInput.value = allUserInfo.name;
  jobInput.value = allUserInfo.about;
  userFormValidator.removeFormErrorContainer();
  userInfoPopup.open();
});

showUserPicPopup.addEventListener("click", () => {
  avatarFormValidator.removeFormErrorContainer();
  avatarFormValidator.disableSubmitButton();
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
