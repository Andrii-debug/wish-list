const btn = document.querySelector('.chose-btn')
const popup = document.querySelector('.b-popup')
const closePopup = document.querySelector('.close-popup')
const imagesContainer = document.querySelector('.popup-content-images')
const figure = document.querySelector('.avatar')
const imgBtn = document.querySelector('.chose-btns')

const PathImg = {
    PATH : './img/',
    LinkImgArray : ['woman.png', 'user-man.png', 'man.png', 'avatar.png', 'gamer.png', 'secondMan.png']
}


for (let i =0; i < PathImg.LinkImgArray.length; i++) {
    let data = PathImg.LinkImgArray[i]
    let img = document.createElement('img')
    img.className = 'avatar-icons'
    let adress = img.src = PathImg.PATH + data
    img.innerHTML = adress
    imagesContainer.appendChild(img)
   

}

imgBtn.addEventListener('click', () => {
    popup.style.display = 'block'
})

closePopup.addEventListener('click', () => {
    popup.style.display = 'none'
   
})

const popUpContent = document.querySelectorAll('.avatar-icons')
popUpContent.forEach(function SelectAvatar(element) {
    element.addEventListener('click', () => {
        
        
        let getYes = confirm('Do you want install this img???')
        let PATH = element.src;
        if (getYes) {
            figure.src = PATH; 
        }
        localStorage.setItem('image-src', PATH)
    })
})


window.addEventListener('load', () => {
    let getImageSrc = localStorage.getItem('image-src')

    if (getImageSrc === null) {
        figure.src = "./img/user.png";
    } else {
        figure.src = getImageSrc;
    }
    
})


///////////////////////////// popUpInfo ///////////////////////////

const infoBtn = document.querySelector('.info')
const SecondPopUpContainer = document.querySelector('.popContainer')
const SecondPopUpText = document.querySelector('.popupTextBlock')
const CloseSecondPopUp = document.querySelector('.closeSecond-PopUp')

infoBtn.addEventListener('click', () => {
    SecondPopUpContainer.style.display = 'block'
    
})


CloseSecondPopUp.addEventListener('click', () => {
    SecondPopUpContainer.style.display = 'none';
})
