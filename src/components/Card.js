export default class Card {
  constructor(
    item,
    userId,
    cardSelector,
    { handleCardClick, handleCardLike, handleCardDelete },
    id
  ) {
    this._title = item.name;
    this._link = item.link;
    this._ownerId = item.owner._id;
    this._likeCard = item.likes;

    this._userId = userId;
    this._card = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._id = id;

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

  generateCard() {
    this._element.querySelector(".element__title").textContent = this._title;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._title;

    if (this._ownerId !== this._userId) {
      this._bin.remove();
    }

    this.setEventListeners();
    this.rendererLikes();
    return this._element;
  }

  setEventListeners() {
    this._bin.addEventListener("click", () => {
      this._handleCardDelete();
    });
    this._like.addEventListener("click", () => {
      this._handleCardLike();
    });
    this._imageCard.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._likeCard.some((element) => {
      return element._id === this._userId;
    });
  }

  rendererLikes() {
    this._likeCounter.textContent = this._likeCard.length;
    this.changeLikes(this._userId);
  }

  changeLikes() {
    if (this.isLiked(this._userId)) {
      this._like.classList.add("element__like_active");
    } else {
      this._like.classList.remove("element__like_active");
    }
  }

  setLikes(likeList) {
    this._likeCard = likeList;
  }

  removeCard() {
    this._bin.closest(".element").remove();
  }
}
