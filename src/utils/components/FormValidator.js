export default class FormValidator {
    constructor(config, formElement) {
        this._input = config.inputSelector;
        this._submitButton = config.submitButtonSelector;
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

    _showInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
    }
    _checkInput(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList) || this._allInputsEmpty(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute("disabled", true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute("disabled");
        }
    }

    removeFormErrorContainer() {
        const formErrors = this._formElement.querySelectorAll(".popup__error");
        formErrors.forEach((error) => {
            error.classList.remove(this._errorClass);
        });
        const inputErrors = this._formElement.querySelectorAll(this._input);
        inputErrors.forEach((error) => {
            error.classList.remove(this._inputErrorClass);
        });
    }
 

    disableSubmitButton() {
        const submitButton = this._formElement.querySelector(this._submitButton);
        submitButton.classList.add(this._inactiveButtonClass);
            
    }

    _setInputListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._input));
        this._buttonElement = this._formElement.querySelector(this._submitButton);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInput(inputElement);
                this._toggleButtonState();
            });
        });
    }
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
        });
        this._setInputListeners();
    }
}
