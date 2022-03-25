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
        //Défini la catégorie de données attendue
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
        //Défini la catégorie de données attendue
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
        //Défini la catégorie de données attendue
        let media = await data.media;
        return {media}; //Retourne les données des medias [Sous forme d'un tableau {d'objets}]
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
    let {media} = await getMediaPhotographe();

        function compareLikes(a, b) {
            return a.likes - b.likes;
        }
        console.log(media.sort(compareLikes));
}


async function sortDate(){
    let {media} = await getMedia();

    function compareDate(a, b) {
            return new Date(a.date) - new Date(b.date);
    }
    console.log(media.sort(compareDate));
}

async function sortTitle() {
    let {media} = await getMedia();

    function compareTitle(a, b) {
        return a.title > b.title;
    }
    console.log(media.sort(compareTitle));
}






async function init() {
    // Récupère les datas des photographes
    let {photographers} = await getPhotographers();
    let {media} = await getMedia();
    displayHeader(photographers);
    displayMedia(media);
}

init();
