let popup = document.querySelector(".popup");
let showPopupButton = document.querySelector(".profile__edit");
let closePopupButton = document.querySelector(".popup__close");
let Username = document.querySelector(".profile__name");
let Userjob = document.querySelector(".profile__job");
let nameInput = document.querySelector("#username");
let jobInput = document.querySelector("#userjob");

function showPopup() {
    nameInput.value = Username.textContent;
    jobInput.value = Userjob.textContent;

    if (popup.classList.contains("popup__opened")) {
    }
    popup.classList.add("popup__opened");
}

function closePopup() {
    if (popup.classList.contains("popup__opened")) {
    }
    popup.classList.remove("popup__opened");
}
showPopupButton.addEventListener("click", showPopup);
closePopupButton.addEventListener("click", closePopup);

let formElement = document.querySelector(".popup__container");

function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector(".profile__name").textContent = nameInput.value;
    document.querySelector(".profile__job").textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
