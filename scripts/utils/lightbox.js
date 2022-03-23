//Ouverture modale
function openModalLightbox(numeroPhoto) {
    document.getElementById("myModal"+numeroPhoto).style.display = "block";
}
//Fermeture modale
function closeModalLightbox(numeroPhoto) {
    document.getElementById("myModal"+numeroPhoto).style.display = "none";
}

//Déclaration de l'index
let imagesIndex = 1;

showImages(imagesIndex);

// Fonction suivant/précédent
function changeMedia(numeroPhoto) {
    showImages(imagesIndex += numeroPhoto);
}

//Fonction qui affiche l'image actuelle
function currentMedia(numeroPhoto) {
    showImages(imagesIndex = numeroPhoto);
}

function showImages(numeroPhoto) {
    let i;
    //Récupère toutes les images
    let images = document.getElementsByClassName("mySlides");
    //Retour à la 1ere image
    if (numeroPhoto > images.length) {imagesIndex = 1}
    //Retour à la dernière image
    if (numeroPhoto < 1) {imagesIndex = images.length}
    //Boucle permettant de passer d'une image à une autre
    for (i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
    //Affiche les images
    images[imagesIndex-1].style.display = "block";
    console.log(images)
}