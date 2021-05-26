import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._saveButton = this._popupForm.querySelector(".popup__save");
  }

  _getInputValues() {
    this._newValues = {};
    this._inputList.forEach((inputElement) => {
      this._newValues[inputElement.name] = inputElement.value;
    });
    return this._newValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  rendererLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Cохранение...";
    } else {
      this._saveButton.textContent = this._defaultSaveButton.textContent;
    }
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
