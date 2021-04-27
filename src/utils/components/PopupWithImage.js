import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        this._popupImageName = this._popup.querySelector(".popup__title_image");
        super(popupSelector);
    }

    open({ name, link }) {
        this._popupImageName.textContent = name;
        this._popup.querySelector(".popup__image").src = link;
        this._popupImageName.alt = name;

        super.open();
    }
}