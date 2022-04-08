let photoActu = 0;

//Ouverture modale
function openModalLightbox(numeroPhoto) {
    let images = document.getElementsByClassName("mySlides");
    if (numeroPhoto > images.length) {
        document.getElementById("myModal" + 1).style.display = "block";
        document.getElementById("myModal" + 1).focus();
        photoActu = numeroPhoto;
    } else {
        if (numeroPhoto < 1) {
            document.getElementById("myModal" + images.length).style.display = "block";
            document.getElementById("myModal" + images.length).focus();
            photoActu = numeroPhoto;
        } else {
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
    if (event.key === "Escape") {
        for (i = 1; i < media.length; i++) {
            closeModalLightbox(i);
        }
    }
    if (event.key === "ArrowLeft") {
        if (photoActu <= 1) {
            closeModalLightbox(photoActu+1);
            photoActu = media.length
            openModalLightbox(photoActu);
            currentMedia(photoActu);
        }else {
            let previousPhoto = photoActu - 1;
            closeModalLightbox(photoActu);
            openModalLightbox(previousPhoto);
            currentMedia(previousPhoto);
            photoActu = previousPhoto;
        }
    }
    if (event.key === "ArrowRight") {
        if (photoActu === media.length) {
            closeModalLightbox(photoActu);
            photoActu = 1;
            openModalLightbox(photoActu);
            currentMedia(photoActu);
        }else {
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