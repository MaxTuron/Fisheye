function openModalLightbox() {
    document.getElementById("myModal").style.display = "block";
}

function closeModalLightbox() {
    document.getElementById("myModal").style.display = "none";
}

let slideIndex = 1;

showSlides(slideIndex);

// Next/previous controls
function changeMedia(numeroPhoto) {
    showSlides(slideIndex += numeroPhoto);
}


function currentMedia(numeroPhoto) {
    showSlides(slideIndex = numeroPhoto);
}

function showSlides(numeroPhoto) {
    let i;
    let slides = document.getElementsByClassName("mySlides"); //Récupère toutes les images
    if (numeroPhoto > slides.length) {slideIndex = 1} //Retour à la 1ere image
    if (numeroPhoto < 1) {slideIndex = slides.length} //Retour à la dernière image
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    console.log(slides)
}