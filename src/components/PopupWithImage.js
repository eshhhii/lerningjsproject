import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
    }
    
    open({name, link}) {
        this._popup.querySelector(".popup__title_image").textContent = name;
        this._popup.querySelector(".popup__image").src = link;
        this._popup.querySelector(".popup__title_image").alt = name;

        super.open();
    }
}
