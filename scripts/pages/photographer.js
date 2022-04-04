//On récupére ce qu'il y a apres le .html dans l'url de la page
let searchParams = window.location.search;
//On récupére uniquement ce qui nous intéresse, l'ID, en enlevant '?id=' de l'url
let searchParamsId = searchParams.substring(4, window.location.search.length);
//On parse le résultat pour pouvoir l'utiliser
let IDphotographer = parseInt(searchParamsId);

async function getData() {
    try {
        let response = await fetch("./data/photographers.json");
        let data = await response.json();
        //Récupère la catégorie "photographe" du fichier JSON
        let allData = await data;
        let photographers = allData.photographers;
        let media = allData.media;
        let newMedia = [];

        //Boucle qui parcourt tous les médias
        media.forEach((medias) => {
            //Vérification de l'ID du média avec l'ID du photographe actuel
            if (medias.photographerId === IDphotographer) {
                //Si les ID sont identiques alors le média et ajouté au tableau
                newMedia.push(medias);
            }
        });

        return {photographers, media, newMedia}; //Retourne les données des photographes [Sous forme d'un tableau {d'objets}]
    } catch (error) {
        console.error(error);
    }
}

async function displayHeader(photographers) {
    let photographersSection = document.querySelector(".photographer_info");
    let prix = document.querySelector(".prixPhoto");

    let prixPhotographe = 0;

    photographers.forEach((photographer) => {
        if (photographer.id === IDphotographer) {
            let photographerModel = photographerInfosFactory(photographer);
            let photographerButtonModel = photographerInfosFactory(photographer);
            let photographerModelPhoto = photographerPhotoFactory(photographer);

            let userCardDOM = photographerModel.getUserCardDOM();
            let userButtonCardDOM = photographerButtonModel.getButtonContact();
            let userCardDOMPhoto = photographerModelPhoto.getUserCardDOMPhoto();

            photographersSection.appendChild(userCardDOM);
            photographersSection.appendChild(userButtonCardDOM);
            photographersSection.appendChild(userCardDOMPhoto);

            prixPhotographe = photographer.price;
        }
    });
    prix.innerHTML = prixPhotographe + "€/jour";
}

async function displayMedia(media) {
    let mediaSection = document.querySelector(".media_section");
    let totalLikes = document.querySelector(".totalLikes");

    let compteurLikes = 0;
    let numeroPhoto =0;

    media.forEach((medias) => {
        if (medias.photographerId === IDphotographer) {
            numeroPhoto = numeroPhoto +1;
            let mediaModel = mediaFactory(medias, numeroPhoto);
            let mediaCardDOM = mediaModel.getMediaCardDOM();
            mediaSection.appendChild(mediaCardDOM);
            compteurLikes = compteurLikes + medias.likes;
        }
    });
    totalLikes.innerHTML = compteurLikes;

}

async function addLike(id) {
    //Récupère tous les médias
    let {media} = await getData();

    let totalLikes = document.querySelector(".totalLikes");
    let mediaLikes = document.querySelector("[data-id=" + CSS.escape(id) + "]");

    //Récupère les likes de tous les médias
    let compteurTotal = totalLikes.innerHTML;
    //Récupère les likes d'un média
    let compteurMedia = mediaLikes.innerHTML;

    //On parse les valeurs récupérer précédemment pour pouvoir l'incrémenté
    let newcompteurTotal = parseInt(compteurTotal);
    let newcompteurMedia = parseInt(compteurMedia);

    //Pour chaque média
    media.forEach((medias) => {
        //On compare l'id du média avec l'id envoyé lors du clic sur le bouton
        if (medias.id === id) {
            //On ajoute 1 au compteur de likes du média et du total
            newcompteurTotal = newcompteurTotal + 1;
            newcompteurMedia = newcompteurMedia + 1;
            //On affiche le nouveau résultat
            totalLikes.innerHTML = newcompteurTotal;
            mediaLikes.innerHTML = newcompteurMedia;
        }
    });
}

async function sortPopularity(){
    //Récupère les médias du photographe
    let {newMedia} = await getData();
    let mediaSection = document.querySelector(".media_section");

    //Fonction qui compare les likes
    function compareLikes(a, b) {
        return b.likes - a.likes;
    }
    //Tri les likes dans l'ordre croissant
    newMedia.sort(compareLikes);
    //Vide les médias déjà presents
    mediaSection.innerHTML=``;
    //Affiche les médias dans le nouvel ordre
    displayMedia(newMedia);
}

async function sortDate(){
    let {newMedia} = await getData();
    let mediaSection = document.querySelector(".media_section");

    //Fonction qui compare les dates
    function compareDate(a, b) {
            return new Date(a.date) - new Date(b.date);
    }
    //Tri les date dans l'ordre croissant
    newMedia.sort(compareDate);
    //Vide les médias déjà presents
    mediaSection.innerHTML=``;
    //Affiche les médias dans le nouvel ordre
    displayMedia(newMedia);
}

async function sortTitle() {
    //Récupère le tableau des médias du photographe
    let {newMedia} = await getData();
    let mediaSection = document.querySelector(".media_section");

    //Fonction qui compare les titres
    function compareTitle(a, b) {
        return a.title > b.title;
    }
    //Tri les titres dans l'ordre alphabétique
    newMedia.sort(compareTitle);
    //Vide les médias déjà presents
    mediaSection.innerHTML=``;
    //Affiche les médias dans le nouvel ordre
    displayMedia(newMedia);
}

async function init() {
    // Récupères les datas des photographes
    let {photographers} = await getData();
    // Récupères les datas des médias
    let {media} = await getData();
    displayHeader(photographers);
    displayMedia(media);
}

init();
