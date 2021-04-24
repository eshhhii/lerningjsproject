import {popupImageCard, popupImageName } from "./constants.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
    }
    open({name, link}) {
        popupImageName.textContent = name;
        popupImageCard.src = link;
        popupImageName.alt = name;

        super.open();
    }
}
