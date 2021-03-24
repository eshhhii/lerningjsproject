const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_images");
const showPopupButton = document.querySelector(".profile__edit");
const closePopupButton = document.querySelector(".popup__close");
const showPopupAddButton = document.querySelector(".profile__add");
const closePopupAddButton = popupAdd.querySelector(".popup__close");
const closeImagePopupButton = popupImage.querySelector(".popup__close");
const Username = document.querySelector(".profile__name");
const Userjob = document.querySelector(".profile__job");
const nameInput = document.querySelector("#username");
const jobInput = document.querySelector("#userjob");
const container = document.querySelector(".elements__list");
const addCard = document.querySelector("#popupFormAdd");
const templateElement = document.querySelector(".template");
let formElement = document.querySelector(".popup__container");

function notValidButton(addCard) {
    const addButton = addCard.querySelector(".popup__save");
    addButton.classList.add("popup__save_disabled");
}

const escClosePopup = function (evt) {
    const allPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        closePopup(allPopup);
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

function showImagePopup(element) {
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
    document.querySelector(".profile__name").textContent = nameInput.value;
    document.querySelector(".profile__job").textContent = jobInput.value;

    closePopup(popupEdit);
}

formElement.addEventListener("submit", formSubmitHandler);

function createNewCard(element) {
    const newCard = templateElement.content.cloneNode(true);
    const titleCard = newCard.querySelector(".element__title");
    const linkCard = newCard.querySelector(".element__image");
    const deleteButton = newCard.querySelector(".element__bin");
    const likeButton = newCard.querySelector(".element__like");

    titleCard.textContent = element.name;
    linkCard.src = element.link;

    deleteButton.addEventListener("click", deleteCard);
    likeButton.addEventListener("click", function () {
        likeButton.classList.toggle("element__like_active");
    });
    function deleteCard(evt) {
        evt.target.closest(".element").remove();
    }

    linkCard.addEventListener("click", function () {
        const titlePopup = popupImage.querySelector(".popup__title");
        const imagePopup = popupImage.querySelector(".popup__image");
        titlePopup.textContent = element.name;
        imagePopup.src = element.link;
        imagePopup.alt = element.name;
        openPopup(popupImage);
    });
    return newCard;
}

function renderList() {
    const result = initialCards.map(createNewCard);

    container.append(...result);
}

function addCardFormListener(evt) {
    evt.preventDefault();
    const inputName = addCard.querySelector("#placeName");
    const inputPlace = addCard.querySelector("#placeLink");
    const item = { name: inputName.value, link: inputPlace.value };
    const newCardItem = createNewCard(item);
    container.prepend(newCardItem);
    inputName.value = "";
    inputPlace.value = "";

    closePopup(popupAdd);
}

renderList();
addCard.addEventListener("submit", addCardFormListener);
