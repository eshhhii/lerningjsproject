const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_images');
const showPopupButton = document.querySelector(".profile__edit");
const closePopupButton = popupEdit.querySelector(".popup__close");
const showPopupAddButton = document.querySelector('.profile__add');
const closePopupAddButton = popupAdd.querySelector('.popup__close');
const closeImagePopupButton = popupImage.querySelector('.popup__close');
const popupImageName = popupImage.querySelector('.popup__title');
const popupImageCard = popupImage.querySelector('.popup__image');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#userjob');
const container = document.querySelector('.elements__list');
const addCard = document.querySelector('#popupFormAdd');
const inputName = addCard.querySelector('#placeName');
const inputPlace = addCard.querySelector('#placeLink');
const templateElement = document.querySelector('.template');
const formElement = popupEdit.querySelector('.popup__container');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;

    closePopup(popupEdit);
}

formElement.addEventListener('submit', formSubmitHandler);

showPopupButton.addEventListener('click', () => openPopup(popupEdit));
closePopupButton.addEventListener('click', () => closePopup(popupEdit));

showPopupAddButton.addEventListener('click', () => openPopup(popupAdd));
closePopupAddButton.addEventListener('click', () => closePopup(popupAdd));

function openImagePopup(element) {
    popupImageName.textContent = element.name;
    popupImageCard.src = element.link;
    popupImage.classList.add('popup_opened');
}

function deleteCard(evt) {
    evt.target.closest('.element').remove();
}

function createNewCard(element) {
const newCard = templateElement.content.cloneNode(true);
const titleCard = newCard.querySelector('.element__title');
const linkCard = newCard.querySelector('.element__image');
const deleteButton = newCard.querySelector('.element__bin');
const likeButton = newCard.querySelector('.element__like');

titleCard.textContent = element.name;
linkCard.src = element.link;
linkCard.alt = element.name;

deleteButton.addEventListener('click', deleteCard);
likeButton.addEventListener('click', function(){
    likeButton.classList.toggle('element__like_active')
})

linkCard.addEventListener('click', () => {
    openImagePopup(element);

})

return newCard;
}

closeImagePopupButton.addEventListener('click', () => closePopup(popupImage));

function renderList() {
    const result = initialCards.map(createNewCard);

    container.append(...result);
}

function addCardFormListener(evt) {
  evt.preventDefault();
  const item = {name: inputName.value, link: inputPlace.value}
  const newCardItem = createNewCard(item);
 container.prepend(newCardItem);
 inputName.value = '';
 inputPlace.value = '';

 closePopup(popupAdd);
}

renderList();
addCard.addEventListener('submit', addCardFormListener);

