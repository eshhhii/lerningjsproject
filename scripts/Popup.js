import {popup} from './constants.js'

export class Popup{
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }
}

open() {
    this._popup.classList.add("popup_opened");
    setEventListeners();
    
}

close() {
    this._popup.classList.remove("popup_opened");
    setEventListeners();
}

_handleEscClose() {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        close(openedPopup);
    }
}

setEventListeners() {
    document.addEventListener("keydown", () => { //определить, что будет здесь this перед документ
        this._handleEscClose();
    });
}
/*
export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", escClosePopup);
}
 
export function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", escClosePopup);
}

export const escClosePopup = function (evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        closePopup(openedPopup);
    }
}*/