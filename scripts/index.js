const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_images");
const showPopupEditProfileButton = document.querySelector(".profile__edit");
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
const inputName = addCard.querySelector("#placeName");
const inputPlace = addCard.querySelector("#placeLink");
const popupImageName = popupImage.querySelector(".popup__title");
const popupImageCard = popupImage.querySelector(".popup__image");
const titlePopup = popupImage.querySelector(".popup__title");
const imagePopup = popupImage.querySelector(".popup__image");
const templateElement = document.querySelector(".template");
const addButton = addCard.querySelector(".popup__save");
const formEditProfile = document.querySelector(".popup__container");

function disableSubmitButton(buttonElement) {
    addButton.classList.add("popup__save_disabled");
}

function removeFormErrorContainer(popup){
    const formErrors = popup.querySelectorAll('.popup__error');
    formErrors.forEach((error) => {
            error.classList.remove('popup__error_visible');
        }); 
        const inputErrors = popup.querySelectorAll('.popup__input');
        inputErrors.forEach((error) => {
            error.classList.remove('popup__input_type_error');
        });
    }   

const escClosePopup = function (evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        closePopup(openedPopup);
    }
};

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", escClosePopup);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", escClosePopup);
}

showPopupEditProfileButton.addEventListener("click", function () {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    removeFormErrorContainer(popupEdit);
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
    inputName.value = "";
    inputPlace.value = "";
    disableSubmitButton();
    removeFormErrorContainer(popupAdd);
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

function showImagePopup(element) {
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


function renderList() {
    const result = initialCards.map(createNewCard);

    container.append(...result);
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    const item = { name: inputName.value, link: inputPlace.value };
    const newCardItem = createNewCard(item);
    container.prepend(newCardItem);
    inputName.value = "";
    inputPlace.value = "";

    closePopup(popupAdd);
}

renderList();
addCard.addEventListener("submit", submitAddCardForm);
