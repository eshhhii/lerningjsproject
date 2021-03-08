let popup = ['.popup popup_edit', '.popup popup_add', '.popup popup_image'];
let showPopupButton = document.querySelector(".profile__edit");
let closePopupButton = document.querySelector(".popup__close");
let Username = document.querySelector(".profile__name");
let Userjob = document.querySelector(".profile__job");
let nameInput = document.querySelector("#username");
let jobInput = document.querySelector("#userjob");
const container = document.querySelector('.elements__list');
const addCard = document.querySelector('#popupFormAdd');
const templateElement = document.querySelector('.template');


function showPopup() {
    nameInput.value = Username.textContent;
    jobInput.value = Userjob.textContent;

    if (popup.classList.contains("popup__opened")) {
    }
    popup.classList.add("popup__opened");
}

function closePopup() {
    if (popup.classList.contains("popup__opened")) {
    }
    popup.classList.remove("popup__opened");
}
showPopupButton.addEventListener("click", showPopup);
closePopupButton.addEventListener("click", closePopup);

let formElement = document.querySelector(".popup__container");

function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector(".profile__name").textContent = nameInput.value;
    document.querySelector(".profile__job").textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

function createNewCard(element) {
const newCard = templateElement.content.cloneNode(true);
const titleCard = newCard.querySelector('.element__title');
const linkCard = newCard.querySelector('.element__image');
titleCard.textContent = element.name;
linkCard.src = element.link;

return newCard;
}

function renderList() {
    const result = initialCards.map(createNewCard);

    container.append(...result);
}

function addCardFormListener(evt) {
  evt.preventDefault();
  const inputName = addCard.querySelector('#placeName');
  const inputPlace = addCard.querySelector('#placeLink');
  const placeName = inputName.value;
  const placeLink = inputPlace.value;

 const newCardName = createNewCard({name: placeName});
 const newCardLink = createNewCard({link: placeLink});

 container.prepend(newCardName, newCardLink);

 inputName.value = '';
 inputPlace.value = '';
 
}


renderList();
addCard.addEventListener('submit', addCardFormListener);