async function getPhotographers() {
    try {
        const response = await fetch("./data/photographers.json");
        const data = await response.json();
        //Défini la catégorie de données attendue
        const photographers = await data.photographers;
        console.log(photographers);
        return {photographers}; //Retourne les données des photographes [Sous forme d'un tableau {d'objets}]
    } catch (error) {
        console.error(error);
    }
}

//Fonction qui sert à afficher les données des photographes
async function displayData(photographers) {
    //On défini ou l'on veut afficher le résultat
    const photographersSection = document.querySelector(".photographer_section");

    //Pour chaque photographe
    photographers.forEach((photographer) => {
        //On utilise la factory
        const photographerModel = photographerFactory(photographer);
        //On récupére les informations
        const userCardDOM = photographerModel.getUserCardDOM();
        //On affiche les informations dans la section préalablement récupérer
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const {photographers} = await getPhotographers();
    displayData(photographers);
}

init();
    