//On récupére ce qu'il y a apres le .html dans l'url de la page
let searchParams = window.location.search;
//On récupére uniquement ce qui nous intéresse, l'ID, en enlevant '?id=' de l'url
let searchParamsId = searchParams.substring(4, window.location.search.length);
//On parse le résultat pour pouvoir l'utiliser
let IDphotographer = parseInt(searchParamsId);

async function getPhotographers() {
    try {
        let response = await fetch("./data/photographers.json");
        let data = await response.json();
        //Récupère la catégorie "photographe" du fichier JSON
        let photographers = await data.photographers;
        return {photographers}; //Retourne les données des photographes [Sous forme d'un tableau {d'objets}]
    } catch (error) {
        console.error(error);
    }
}

async function getMedia() {
    try {
        let response = await fetch("./data/photographers.json");
        let data = await response.json();
        //Récupère la catégorie "média" du fichier JSON
        let media = await data.media;
        return {media}; //Retourne les données des medias [Sous forme d'un tableau {d'objets}]
    } catch (error) {
        console.error(error);
    }
}

async function getMediaPhotographe() {
    try {
        let response = await fetch("./data/photographers.json");
        let data = await response.json();
        //Récupère la catégorie "média" du fichier JSON
        let media = await data.media;
        //Déclaration d'un deuxième tableau
        let newMedia = [];

        //Boucle qui parcourt tous les médias
        media.forEach((medias) => {
            //Vérification de l'ID du média avec l'ID du photographe actuel
            if (medias.photographerId === IDphotographer) {
                //Si les ID sont identiques alors le média et ajouté au tableau
                newMedia.push(medias);
            }
        });
        //Retourne les données des medias [Sous forme d'un tableau {d'objets}]
        return {newMedia};
    } catch (error) {
        console.error(error);
    }
}


async function displayHeader(photographers) {
    let photographersSection = document.querySelector(".photographer_info");
    let prix = document.querySelector(".prixPhoto");

    let prixPhotographe = 0;

    photographersSection.innerHTML = `<button class="contact_button" onclick="displayModal()">Contactez-moi</button>`;

    photographers.forEach((photographer) => {
        if (photographer.id === IDphotographer) {
            let photographerModel = photographerInfosFactory(photographer);
            let photographerModelPhoto = photographerPhotoFactory(photographer);
            let userCardDOM = photographerModel.getUserCardDOM();
            let userCardDOMPhoto = photographerModelPhoto.getUserCardDOMPhoto();
            photographersSection.appendChild(userCardDOM);
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
    let {media} = await getMedia();

    let totalLikes = document.querySelector(".totalLikes");
    let mediaLikes = document.querySelector("[data-id=" + CSS.escape(id) + "]");

    let compteurTotal = totalLikes.innerHTML;
    let compteurMedia = mediaLikes.innerHTML;

    let newcompteurTotal = parseInt(compteurTotal);
    let newcompteurMedia = parseInt(compteurMedia);

    media.forEach((medias) => {
        if (medias.id === id) {
            newcompteurTotal = newcompteurTotal + 1;
            newcompteurMedia = newcompteurMedia + 1;
            totalLikes.innerHTML = newcompteurTotal;
            mediaLikes.innerHTML = newcompteurMedia;
        }
    });
}

async function sortPopularity(){
    let {newMedia} = await getMediaPhotographe();
    let mediaSection = document.querySelector(".media_section");
    let numeroPhoto =0;
    let totalLikes = document.querySelector(".totalLikes");
    let compteurLikes = 0;

    //Fonction qui compare les likes
    function compareLikes(a, b) {
        return a.likes - b.likes;
    }
    //Tri les likes dans l'ordre croissant
    newMedia.sort(compareLikes);
    //Vide les médias déjà presents
    mediaSection.innerHTML=``;
    //Affiche les médias dans le nouvel ordre
    newMedia.forEach((medias) => {
        numeroPhoto = numeroPhoto +1;
        let mediaModel = mediaFactory(medias, numeroPhoto);
        let mediaPopularityCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaPopularityCardDOM);
        compteurLikes = compteurLikes + medias.likes;
    });
    totalLikes.innerHTML = compteurLikes;
}


async function sortDate(){
    let {newMedia} = await getMediaPhotographe();
    let mediaSection = document.querySelector(".media_section");
    let numeroPhoto =0;
    let totalLikes = document.querySelector(".totalLikes");
    let compteurLikes = 0;

    //Fonction qui compare les dates
    function compareDate(a, b) {
            return new Date(a.date) - new Date(b.date);
    }
    //Tri les date dans l'ordre croissant
    newMedia.sort(compareDate);
    //Vide les médias déjà presents
    mediaSection.innerHTML=``;
    //Affiche les médias dans le nouvel ordre
    newMedia.forEach((medias) => {
        numeroPhoto = numeroPhoto +1;
        let mediaModel = mediaFactory(medias, numeroPhoto);
        let mediaDateCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaDateCardDOM);
        compteurLikes = compteurLikes + medias.likes;
    });
    totalLikes.innerHTML = compteurLikes;
}
async function sortTitle() {
    //Récupère le tableau des médias du photographe
    let {newMedia} = await getMediaPhotographe();
    let mediaSection = document.querySelector(".media_section");
    let numeroPhoto =0;
    let totalLikes = document.querySelector(".totalLikes");
    let compteurLikes = 0;

    //Fonction qui compare les titres
    function compareTitle(a, b) {
        return a.title > b.title;
    }
    //Tri les titres dans l'ordre alphabétique
    newMedia.sort(compareTitle);
    //Vide les médias déjà presents
    mediaSection.innerHTML=``;
    //Affiche les médias dans le nouvel ordre
    newMedia.forEach((medias) => {
        numeroPhoto = numeroPhoto +1;
        let mediaModel = mediaFactory(medias, numeroPhoto);
        let mediaTitleCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaTitleCardDOM);
        compteurLikes = compteurLikes + medias.likes;
    });
    totalLikes.innerHTML = compteurLikes;
}

async function init() {
    // Récupères les datas des photographes
    let {photographers} = await getPhotographers();
    // Récupères les datas des médias
    let {media} = await getMedia();
    displayHeader(photographers);
    displayMedia(media);
}

init();
