import { popupForm } from "./constants.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
    }

    _getInputValues(){
        this._newValues = {};
        this._inputList.forEach(inputElement => {
            this._newValues[inputElement.name] = inputElement.value;
        });
        return this._newValues;
    }

setEventListeners(){
    popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
})
super.setEventListeners()
}

close(){
        super.close();
    }
}

