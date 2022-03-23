//Ouverture modale
function openModalLightbox(numeroPhoto) {

    let images = document.getElementsByClassName("mySlides");
    if (numeroPhoto > images.length) {

        document.getElementById("myModal" + 1).style.display = "block";
    } else {
        if (numeroPhoto < 1) {
            document.getElementById("myModal" + images.length).style.display = "block";
        } else {
            document.getElementById("myModal" + numeroPhoto).style.display = "block";
        }
    }

}
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

function showImages(numeroPhoto) {
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