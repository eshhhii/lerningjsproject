let popup = document.querySelector('.popup');
let showPopupButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');


showPopupButton.addEventListener('click', togglePopup);
function togglePopup (){
    if (popup.classList.contains('popup__opened')){ 
        console.log('popup is open now');     
}
popup.classList.toggle('popup__opened');  
}

showPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);


