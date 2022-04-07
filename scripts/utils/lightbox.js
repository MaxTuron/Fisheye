//Ouverture modale
function openModalLightbox(numeroPhoto) {
    let images = document.getElementsByClassName("mySlides");
    if (numeroPhoto > images.length) {
        document.getElementById("myModal" + 1).style.display = "block";
        document.getElementById("myModal" + 1).focus();
    } else {
        if (numeroPhoto < 1) {
            document.getElementById("myModal" + images.length).style.display = "block";
            document.getElementById("myModal" + images.length).focus();
        } else {
            document.getElementById("myModal" + numeroPhoto).style.display = "block";
            document.getElementById("myModal" + numeroPhoto).focus();
        }
    }
}

//Fermeture de la modale partout sur la page
window.addEventListener("keydown", event => {
    let i;
    let media = document.getElementsByClassName("mySlides");
    if (event.key === "Escape") {
        for (i = 1; i < media.length; i++) {
            closeModalLightbox(i);
        }
    }
});

//Fermeture modale
function closeModalLightbox(numeroPhoto) {
    document.getElementById("myModal"+numeroPhoto).style.display = "none";
}


//Déclaration de l'index
let imagesIndex = 1;

showImages(imagesIndex);

//Fonction qui affiche l'image actuelle
function currentMedia(numeroPhoto) {

    let images = document.getElementsByClassName("mySlides");

    if (numeroPhoto > images.length) {
        imagesIndex = 1;
        showImages(imagesIndex);
    } else {
        if (numeroPhoto < 1) {
            imagesIndex = images.length;
            showImages(imagesIndex);
        } else {
            showImages(imagesIndex = numeroPhoto);
        }
    }
}

function showImages() {
    let i;
    //Récupère toutes les images
    let images = document.getElementsByClassName("mySlides");

    //Boucle permettant de passer d'une image à une autre
    for (i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
    //Affiche les images
    images[imagesIndex-1].style.display = "block";
    console.log(images)
}

async function openModalKey(event,numeroPhoto){
    if (event.key === "Enter") {
        openModalLightbox(numeroPhoto);
        currentMedia(numeroPhoto);
    }
}

async function modalKeyboard(event, numeroPhoto){
    let nextMedia = numeroPhoto+1;
    let previousMedia = numeroPhoto-1;
    if (event.key === "ArrowLeft") {
        openModalLightbox(previousMedia);
        currentMedia(previousMedia);
        closeModalLightbox(numeroPhoto);
    }
    if (event.key === "ArrowRight") {
        openModalLightbox(nextMedia);
        currentMedia(nextMedia);
        closeModalLightbox(numeroPhoto);
    }
}