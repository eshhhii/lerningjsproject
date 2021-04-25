export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", () =>{
     this._handleEscClose
    });
}

close() {
    this._popup.classList.remove("popup_opened");
    document.addEventListener("keydown", () =>{
        this._handleEscClose
       });
}

_handleEscClose() {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        this.close(openedPopup);
    }
}
_handleOverlayClose() {
    this._popup.addEventListener("click", () => {
    this.close();
    });
this._popup.querySelector(".popup__container")
.addEventListener("click",function (evt) {
    evt.stopPropagation();
});
}

setEventListeners() {
    this._popup.querySelector('.popup__close')
    .addEventListener("click", () => { 
        this.close();
    });
    this._handleOverlayClose();
}
}
