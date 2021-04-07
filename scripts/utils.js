export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", escClosePopup);
}

export const escClosePopup = function (evt) {
    const allPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        closePopup(allPopup);
    }
};