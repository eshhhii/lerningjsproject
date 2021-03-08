const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const showPopupButton = document.querySelector(".profile__edit");
const closePopupButton = document.querySelector(".popup__close");
const showPopupAddButton = document.querySelector('.profile__add');
const closePopupAddButton = popupAdd.querySelector('.popup__close');
const popupImage = document.querySelector('.popup_image');
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


function createNewCard(element) {
const newCard = templateElement.content.cloneNode(true);
const titleCard = newCard.querySelector('.element__title');
const linkCard = newCard.querySelector('.element__image');
titleCard.textContent = element.name;
linkCard.src = element.link;


const likeButton = newCard.querySelector('.element__like');
likeButton.addEventListener('click', function(){
    likeButton.classList.toggle('element__like_active')
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

