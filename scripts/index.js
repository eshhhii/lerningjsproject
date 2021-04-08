import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, escClosePopup } from "./utils.js";
import {
    popup,
    popupEdit,
    popupAdd,
    popupImage,
    showPopupEditProfileButton,
    closePopupButton,
    showPopupAddButton,
    closePopupAddButton,
    closeImagePopupButton,
    userName,
    userJob,
    nameInput,
    jobInput,
    container,
    popupForm,
    addCard,
    templateElement,
    addButton,
    formEditProfile,
    inputName,
    inputPlace,
    popupImageName,
    popupImageCard,
    validationConfig,
} from "./constants.js";

function disableSubmitButton(buttonElement) {
    addButton.classList.add("popup__save_disabled");
}

function removeFormErrorContainer(popup) {
    const formErrors = popup.querySelectorAll(".popup__error");
    formErrors.forEach((error) => {
        error.classList.remove("popup__error_visible");
    });
    const inputErrors = popup.querySelectorAll(".popup__input");
    inputErrors.forEach((error) => {
        error.classList.remove("popup__input_type_error");
    });
}
function removeInputValue(popup) {
    const valueInput = popup.querySelectorAll(".popup__input");
    valueInput.forEach((element) => {
        element.value = "";
    });
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", escClosePopup);
}

showPopupEditProfileButton.addEventListener("click", function () {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    removeFormErrorContainer(popupEdit);
    editFormValidator.enableValidation();
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
});

function submitEditProfileForm(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

initialCards.forEach(function (item) {
    const card = new Card(item.name, item.link, templateElement);
    const cardElement = card.generateCard();
    container.append(cardElement);
});

function submitAddCardForm(evt) {
    evt.preventDefault();
    const item = new Card(inputName.value, inputPlace.value);
    const newCardItem = item.generateCard();
    container.prepend(newCardItem);
    removeInputValue(popupAdd);

    closePopup(popupAdd);
}

addCard.addEventListener("submit", submitAddCardForm);

const formList = Array.from(document.querySelectorAll(validationConfig._formSelector));
formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });
});

const editFormValidator = new FormValidator(validationConfig, popupForm);

const addFormValidator = new FormValidator(validationConfig, addCard);
