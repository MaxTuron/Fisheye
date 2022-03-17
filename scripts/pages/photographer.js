let searchParams = window.location.search;
let searchParamsId = searchParams.substring(4,window.location.search.length);
let IDphotographer = parseInt(searchParamsId);

async function getPhotographers() {
    try {
        const response = await fetch("./data/photographers.json");
        const data = await response.json();
        const photographers = await data.photographers;
        return { photographers }; //Retourne les données des photographes [Sous forme d'un tableau {d'objets}]
    } catch (error) {
        console.error(error);
    }
}

async function getMedia() {
    try {
        const response = await fetch("./data/photographers.json");
        const data = await response.json();
        const media = await data.media;
        return {media}; //Retourne les données des photographes [Sous forme d'un tableau {d'objets}]
    } catch (error) {
        console.error(error);
    }
}


async function displayData(photographers, media) {
    const photographersSection = document.querySelector(".photographer_info");
    const mediaSection = document.querySelector(".media_section");
    const totalLikes = document.querySelector(".totalLikes");
    const prix = document.querySelector(".prixPhoto");

    let compteurLikes = 0;
    let prixPhotographe = 0;

    photographersSection.innerHTML=`<button class="contact_button" onclick="displayModal()">Contactez-moi</button>`;

    photographers.forEach((photographer) => {
        if (photographer.id===IDphotographer){
            const photographerModel = photographerInfosFactory(photographer);
            const photographerModelPhoto = photographerPhotoFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            const userCardDOMPhoto = photographerModelPhoto.getUserCardDOMPhoto();
            photographersSection.appendChild(userCardDOM);
            photographersSection.appendChild(userCardDOMPhoto);
            prixPhotographe = photographer.price;
        }
    });

    media.forEach((medias) => {
        if (medias.photographerId===IDphotographer){
            const mediaModel = mediaFactory(medias);
            const mediaCardDOM = mediaModel.getMediaCardDOM();
            mediaSection.appendChild(mediaCardDOM);
            compteurLikes = compteurLikes + medias.likes;
        }
    });
    console.log(compteurLikes)
    totalLikes.innerHTML=compteurLikes;
    prix.innerHTML=prixPhotographe+"€/jour";
};

async function addLike(id, likes) {

    const mediaLikes = document.querySelectorAll(".addLikes");
    const totalLikes = document.querySelector(".totalLikes");

    const compteur= mediaLikes[0].innerHTML;
    const compteurTotal = totalLikes.innerHTML;

    let newcompteur = parseInt(compteur);
    let newcompteurTotal = parseInt(compteurTotal);

    newcompteur = newcompteur+1;
    newcompteurTotal = newcompteurTotal+1;

    mediaLikes.innerHTML=newcompteur;
    totalLikes.innerHTML=newcompteurTotal;

};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { media } = await getMedia();
    displayData(photographers, media);

};

init();
