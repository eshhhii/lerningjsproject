import {popupImageCard, popupImageName } from "./constants.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
    }
    open({link, name}) {
        const imagePopup = this._popup.querySelector('.popup__image')
        popupImageCard.src = link;
        popupImageName.alt = name;

        super.open();
    }
}
