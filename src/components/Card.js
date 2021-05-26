export default class Card {
  constructor(
    item,
    userId,
    cardSelector,
    { handleCardClick, handleCardLike, handleCardDelete },
    cardId
  ) {
    this._title = item.name;
    this._link = item.link;
    this._ownerId = item.ownerId;
    this._likes = item.likes;

    this.userId = userId;
    this._card = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._cardId = cardId;

    this._element = this._getTemplate();
    this._imageCard = this._element.querySelector(".element__image");
    this._like = this._element.querySelector(".element__like");
    this._likeCounter = this._element.querySelector(".element__counter");
    this._bin = this._element.querySelector(".element__bin");
  }

  _getTemplate() {
    const newCard = this._card.content
      .querySelector(".element")
      .cloneNode(true);

    return newCard;
  }
  //проверяю по id кому устанавливать корзину

  //создаю карточку
  generateCard() {
    this._element.querySelector(".element__title").textContent = this._title;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._title;

    if (this._ownerId !== this._userId) {
      this._bin.remove();
    }

    this.setEventListeners();
    return this._element;
  }

  //установила слушатели
  setEventListeners() {
    this._element
      .querySelector(".element__bin")
      .addEventListener("click", () => {
        this._handleCardDelete();
      });
    this._like.addEventListener("click", () => {
      this._handleCardLike();
    });
    this._imageCard.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  getIdCard() {
    return this._cardId;
  }

  // Определяем есть ли совпадения в массиве лайков
  isLiked() {
    return this._likes.some((element) => {
      return element._id === this._userId;
    });
  }

  // Отрисовать лайки
  _updateLikes() {
    this._likes.textContent = this._likeCounter.length;
    this.renderLikes(this._userId);
  }

  // Изменение состояния лайка
  renderLikes() {
    if (this.isLiked() === true) {
      this._like.classList.add("element__like_active");
    } else {
      this._like.classList.remove("element__like_active");
    }
  }

  // Установка кол-ва лайков
  setLikes(likeList) {
    this._likes = likeList;
    this._updateLikes();
  }

  // Удалить карточку
  removeCard() {
    this._bin.closest(".element").remove();
  }
}

/*export default class Card {
  constructor(name, link, cardSelector, { handleCardClick }) {
    this._title = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._card = cardSelector;
    this._element = this._getTemplate();
    this._imageCard = this._element.querySelector(".element__image");
    this._like = this._element.querySelector(".element__like");
  }

  _getTemplate() {
    const newCard = this._card.content
      .querySelector(".element")
      .cloneNode(true);

    return newCard;
  }
  generateCard() {
    this.setEventListeners();
    this._element.querySelector(".element__title").textContent = this._title;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._title;

    return this._element;
  }

  setEventListeners() {
    this._element
      .querySelector(".element__bin")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._like.addEventListener("click", () => {
      this._handleLikeCard();
    });
    this._imageCard.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  _handleLikeCard() {
    this._like.classList.toggle("element__like_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }
}*/
