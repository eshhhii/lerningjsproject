import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleSubmitCallback) {
    super(popupSelector);
    this._handleSubmitCallback = handleSubmitCallback;
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback(this._card);
    });
    super.setEventListeners();
  }

  open(card) {
    this._card = card;
    super.open();
  }
}
