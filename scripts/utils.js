export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", escClosePopup);
}

export const escClosePopup = function (evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        closePopup(openedPopup);
    }
};