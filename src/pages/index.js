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

function createCard(item, userId, templateElement) {
  const card = new Card(
    item,
    userId,
    templateElement,
    {
      handleCardClick: () => {
        imagePopup.open(item.name, item.link);
      },
      handleCardLike: () => {
        const likedCard = card.isLiked();
        const resultOfLike = likedCard
          ? api.deleteLike(card.getIdCard())
          : api.likeCard(card.getIdCard());
        resultOfLike
          .then((data) => {
            card.setLikes(data.likes);
            card.rendererLikes();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleCardDelete: () => {
        deleteCardPopup.open(card);
      },
    },
    item._id
  );
  return card;
}

const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item, userId, templateElement);
      const cardView = card.generateCard();
      cardList.addItem(cardView, true);
    },
  },
  containerSelector
);

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const userInfo = new UserInfo(
  userNameSelector,
  userJobSelector,
  userAvatarSelector
);

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

const newCardPopup = new PopupWithForm(newCardPopupSelector, (values) => {
  newCardPopup.rendererLoading(true);
  api
    .addCard(values.name, values.link)
    .then((item) => {
      const newElement = createCard(item, userId, templateElement);
      const newCard = newElement.generateCard();
      cardList.addItem(newCard);
      newCardPopup.close();
    })
    .finally(() => {
      newCardPopup.rendererLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
});

newCardPopup.setEventListeners();

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

const deleteCardPopup = new PopupWithSubmit(popupDeleteCardSelector, (card) => {
  api
    .deleteCard(card.getIdCard())
    .then(() => {
      card.removeCard();
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
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

const userFormValidator = new FormValidator(validationConfig, popupForm);
userFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, addCard);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validationConfig,
  popupFormAvatar
);
avatarFormValidator.enableValidation();
