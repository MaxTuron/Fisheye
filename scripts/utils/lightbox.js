let photoActu = 0;

//Ouverture modale
function openModalLightbox(numeroPhoto) {
    let images = document.getElementsByClassName("mySlides");
    //Si le numéro de la photo est supérieur au nombre total de photo alors on revient à la 1ere
    if (numeroPhoto > images.length) {
        //On affiche la modale
        document.getElementById("myModal" + 1).style.display = "block";
        //On utilise .focus pour que le navigateur cible la modale lors de son ouverture
        document.getElementById("myModal" + 1).focus();
        //On attribut le numéro de la photo à la variable servant au contrôle clavier
        photoActu = numeroPhoto;
    } else {
        //Si le numéro de la photo est inférieur à 1 alors on revient au dernier média
        if (numeroPhoto < 1) {
            document.getElementById("myModal" + images.length).style.display = "block";
            document.getElementById("myModal" + images.length).focus();
            photoActu = numeroPhoto;
        }
        //Sinon on affiche le média actuel
        else {
            document.getElementById("myModal" + numeroPhoto).style.display = "block";
            document.getElementById("myModal" + numeroPhoto).focus();
            photoActu = numeroPhoto;
        }
    }
}

//Fermeture de la modale partout sur la page
window.addEventListener("keydown", event => {
    let i;
    let media = document.getElementsByClassName("mySlides");
    //Si la touche utilisée est échap alors on ferme toutes les modales
    if (event.key === "Escape") {
        //Boucle parcourant tous les médias et utilise la fonction de fermeture
        for (i = 1; i < media.length; i++) {
            closeModalLightbox(i);
        }
    }
    //Si la touche utilisée est la fléche de gauche
    if (event.key === "ArrowLeft") {
        //Si le média actuel est inférieur à 1 alors on revient au dernier média
        if (photoActu <= 1) {
            closeModalLightbox(photoActu+1);
            photoActu = media.length
            openModalLightbox(photoActu);
            currentMedia(photoActu);
        }
        //Sinon au passe au média précédent
        else {
            let previousPhoto = photoActu - 1;
            closeModalLightbox(photoActu);
            openModalLightbox(previousPhoto);
            currentMedia(previousPhoto);
            photoActu = previousPhoto;
        }
    }
    //Si la touche utilisée est la fléche de gauche
    if (event.key === "ArrowRight") {
        //Si le média actuel est égal au nombre total de média alors on revient au 1er média
        if (photoActu === media.length) {
            closeModalLightbox(photoActu);
            photoActu = 1;
            openModalLightbox(photoActu);
            currentMedia(photoActu);
        }
        //Sinon au passe au média suivant
        else {
            let nextPhoto = photoActu + 1;
            closeModalLightbox(photoActu);
            openModalLightbox(nextPhoto);
            currentMedia(nextPhoto);
            photoActu = nextPhoto;
        }
    }
});

//Fermeture modale
function closeModalLightbox(numeroPhoto) {
    document.getElementById("myModal"+numeroPhoto).style.display = "none";
}

//Déclaration de l'index
let imagesIndex = 1;


//Fonction qui affiche l'image actuelle
function currentMedia(numeroPhoto) {
    let images = document.getElementsByClassName("mySlides");

    if (numeroPhoto > images.length) {
        showImages(imagesIndex= 1);
    } else {
        if (numeroPhoto < 1) {
            showImages(imagesIndex= images.length);
        } else {
            showImages(imagesIndex= numeroPhoto);
        }
    }
}

function showImages(imagesIndex) {
    //Récupère toutes les images
    let images = document.getElementsByClassName("mySlides");
    //Affiche l'image
    images[imagesIndex-1].style.display = "block";
    console.log(images)
}

//Ouverture de la modale au clavier
async function openModalKey(event,numeroPhoto){
    if (event.key === "Enter") {
        openModalLightbox(numeroPhoto);
        currentMedia(numeroPhoto);
    }
}