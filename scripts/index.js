let popup = document.querySelector(".popup");
let showPopupButton = document.querySelector(".profile__edit");
let closePopupButton = document.querySelector(".popup__close");
let userName = document.querySelector(".profile__name");
let userJob = document.querySelector(".profile__job");
let nameInput = document.querySelector("#username");
let jobInput = document.querySelector("#userjob");
let formElement = document.querySelector(".popup__container");

function showPopup() {

    if (popup.classList.contains("popup_opened")) {
        nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    }
    popup.classList.add("popup_opened");
}

function closePopup() {
    popup.classList.remove("popup_opened");
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;

    closePopup();
}

showPopupButton.addEventListener("click", showPopup);
closePopupButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
