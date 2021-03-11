const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_images');
const showPopupButton = document.querySelector(".profile__edit");
const closePopupButton = document.querySelector(".popup__close");
const showPopupAddButton = document.querySelector('.profile__add');
const closePopupAddButton = popupAdd.querySelector('.popup__close');
const closeImagePopupButton = popupImage.querySelector('.popup__close');
const Username = document.querySelector('.profile__name');
const Userjob = document.querySelector('.profile__job');
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#userjob');
const container = document.querySelector('.elements__list');
const addCard = document.querySelector('#popupFormAdd');
const templateElement = document.querySelector('.template');

let formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__job').textContent = jobInput.value;

    closePopupEdit();
}

formElement.addEventListener('submit', formSubmitHandler);


function openPopupEdit() {
    popupEdit.classList.add('popup__opened');
}
function closePopupEdit() {
    popupEdit.classList.remove('popup__opened');
}

showPopupButton.addEventListener('click', openPopupEdit);
closePopupButton.addEventListener('click', closePopupEdit);

function openPopupAdd() {
    popupAdd.classList.add('popup__opened');
}

function closePopupAdd() {
    popupAdd.classList.remove('popup__opened');
}

showPopupAddButton.addEventListener('click', openPopupAdd);
closePopupAddButton.addEventListener('click', closePopupAdd);

function openImagePopup(element) {
    const popupImageName = popupImage.querySelector('.popup__title');
    const popupImageCard = popupImage.querySelector('.popup__image');

    popupImageName.textContent = element.name;
    popupImageCard.src = element.link;
    popupImageCard.alt = element.name;
    popupImage.classList.add('popup__opened');
}

function closeImagePopup() {
    popupImage.classList.remove('popup__opened');
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

deleteButton.addEventListener('click', deleteCard);
likeButton.addEventListener('click', function(){
    likeButton.classList.toggle('element__like_active')
})

linkCard.addEventListener('click', () => {
    openImagePopup(element);
closeImagePopupButton.addEventListener('click', closeImagePopup);

})

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
  const item = {name: inputName.value, link: inputPlace.value}
  const newCardItem = createNewCard(item);
 container.prepend(newCardItem);
 inputName.value = '';
 inputPlace.value = '';

 closePopupAdd();
}

renderList();
addCard.addEventListener('submit', addCardFormListener);
