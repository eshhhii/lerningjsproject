class FormValidator{
    constructor(config, formElement){
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    }


_allInputsEmpty() {
    return !this._inputList.some((inputElement) => inputElement.value.length > 0);
}

_hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
}

_toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
    if (_hasInvalidInput(inputList) || _allInputsEmpty(this._inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }
};

_showInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
};

_hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
};

_checkInput(formElement, inputElement, rest) {
    if (inputElement.validity.valid) {
        _hideInputError(formElement, inputElement, rest);
    } else {
        _showInputError(formElement, inputElement, rest);
    }
};

_setInputListeners(formElement, { inputSelector, submitButtonSelector, ...rest }) {
    const inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
    const buttonElement = this._formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInput(formElement, inputElement, rest);
            _toggleButtonState(inputList, buttonElement, rest);
        });
    });
};

enableValidation({ formSelector, ...rest }) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        _setInputListeners(formElement, rest);
    });
};
}

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
    };
    enableValidation(validationConfig);