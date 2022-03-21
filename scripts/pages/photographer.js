let searchParams = window.location.search;
let searchParamsId = searchParams.substring(4, window.location.search.length);
let IDphotographer = parseInt(searchParamsId);

async function getPhotographers() {
    try {
        let response = await fetch("./data/photographers.json");
        let data = await response.json();
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
        let media = await data.media;
        return {media}; //Retourne les données des photographes [Sous forme d'un tableau {d'objets}]
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
};

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
    console.log(compteurLikes)
    totalLikes.innerHTML = compteurLikes;

};

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
};

async function init() {
    // Récupère les datas des photographes
    let {photographers} = await getPhotographers();
    let {media} = await getMedia();
    displayHeader(photographers);
    displayMedia(media);

};

init();
