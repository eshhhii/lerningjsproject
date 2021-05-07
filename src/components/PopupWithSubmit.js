import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup{
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._popupForm = this._popup.querySelector('.popup__form');
    }
    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            this._submit(evt, this._act);
        })
        super.setEventListeners();
    }

    open(act) {
        this._act = act;
        super.open();
    }
}