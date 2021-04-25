/*export function openPopup(popup) {
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
/*
export function removeFormErrorContainer(popup) {
    const formErrors = popup.querySelectorAll(".popup__error");
    formErrors.forEach((error) => {
        error.classList.remove("popup__error_visible");
    });
    const inputErrors = popup.querySelectorAll(".popup__input");
    inputErrors.forEach((error) => {
        error.classList.remove("popup__input_type_error");
    });
}

export function removeInputValue(popup) {
    const valueInput = popup.querySelectorAll(".popup__input");
    valueInput.forEach((element) => {
        element.value = "";
    });
}*/