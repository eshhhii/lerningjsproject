import {addCard, validationConfig} from './constants.js'

export class FormValidator{
    constructor(rest, formElement){
    this._inputSelector = rest.inputSelector;
    this._submitButtonSelector = rest.submitButtonSelector;
    this._inactiveButtonClass = rest.inactiveButtonClass;
    this._inputErrorClass = rest.inputErrorClass;
    this._errorClass = rest.errorClass;
    this._formElement = formElement;
    }

_allInputsEmpty() {
    return !this._inputList.some((inputElement) => inputElement.value.length > 0);
}

_hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
}

toggleButtonState() {
    if (_hasInvalidInput(inputList) || _allInputsEmpty(this._inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }
}

_showInputError() {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
}

_hideInputError() {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
}

_checkInput() {
    console.log(this._inputElement);
    if (inputElement.validity.valid) {
        this._hideInputError();
    } else {
        this._showInputError();
    }
}

_setInputListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            this._checkInput();
            this.toggleButtonState();
        });
    })
}

enableValidation() {
    this._setInputListeners();
}
}

   /* const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
    };
    enableValidation(validationConfig); */