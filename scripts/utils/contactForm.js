const form = document.getElementById('form');
const modal = document.getElementById("contact_modal");

//Empeche l'envoie du formulaire
form.addEventListener('submit', function (event) {
    event.preventDefault()
});


function displayModal() {
    modal.style.display = "block";
    document.getElementById("first").focus();
}

//Ferme la modale au click sur le bouton
function closeModal() {
    modal.style.display = "none";
}

function validate() {
    //Déclaration et récupération des variables et des regex
    let firstName = document.getElementById("first").value,
        lastName = document.getElementById("last").value,
        email = document.getElementById("email").value,
        message = document.getElementById("message").value,
        firstRegex = /[0-9]/.test(firstName),
        lastRegex = /[0-9]/.test(lastName),
        emailRegex = /@/.test(email);

    //Déclaration des messages d'erreurs
    let firstNameError = document.getElementById("firstNameError"),
        lastNameError = document.getElementById("lastNameError"),
        emailError = document.getElementById("emailError"),
        messageError = document.getElementById("messageError");

    //Déclaration des variables pour la validation finale des champs
    let firstNameValid = false,
        lastNameValid = false,
        emailValid = false,
        messageValid = false;

//Gestion du prénom
    if (firstName.length < 2 && firstName.length !== 0) {
        firstNameError.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    } else if (firstName.length === 0) {
        firstNameError.innerHTML = "Vous devez écrire votre prénom.";
    } else if (firstRegex === true) {
        firstNameError.innerHTML = "Le prénom ne doit pas contenir de nombres.";
    } else {
        firstNameValid = true;
        firstNameError.innerHTML = "";
    }

//Gestion du nom
    if (lastName.length < 2 && lastName.length !== 0) {
        lastNameError.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    } else if (lastName === "") {
        lastNameError.innerHTML = "Vous devez écrire votre nom.";
    } else if (lastRegex === true) {
        lastNameError.innerHTML = "Le nom ne doit pas contenir de nombres.";
    } else {
        lastNameValid = true;
        lastNameError.innerHTML = "";
    }

//Gestion de l'email
    if (email === "") {
        emailError.innerHTML = "Vous devez remplir ce champ.";
    } else if (emailRegex === false) {
        emailError.innerHTML = "Vous devez remplir une adresse email valide.";
    } else {
        emailValid = true;
        emailError.innerHTML = "";
    }

    //Gestion de la date de naissance
    if (message === "") {
        messageError.innerHTML = "Vous devez entrer un message.";
    } else {
        messageValid = true;
        messageError.innerHTML = "";
    }

    //Verification finale de tous les champs
    if (firstNameValid && lastNameValid && emailValid && messageValid) {
        closeModal();
        reset();
        console.log("Prenom: "+firstName, "- Nom: "+lastName, "- Email: "+email, "- Message: "+message)
    }
}

//Fonction pour réinitialiser le formulaire
function reset() {
    document.getElementById("form").reset();
}

//Permet de fermer la modale dans toute la page
window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal()
    }
});