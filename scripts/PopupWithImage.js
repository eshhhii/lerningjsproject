import {popupImageCard, popupImageName } from "./constants.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
    }
    open({link, name}) {
        popupImageName.textContent = this._name;
        popupImageCard.src = this._link;
        popupImageName.alt = this._name;

        super.open();
    }
}
