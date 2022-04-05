function mediaFactory(data, numeroPhoto) {
    let {title, id, likes, image, video} = data;

    function getMediaCardDOM() {
        let picture = `assets/images/${image}`;
        let coeur = `assets/icons/coeur.svg`;
        let videos = `assets/video/${video}`;
        let mediaID = data.id;

        //Création de la div contenant le code HTML
        let div = document.createElement('div');

        //Si image est undefined, c'est que le média est une vidéo
        if (image === undefined) {
            //On écris le code HTML suivant
            div.innerHTML = ` 
             <button onkeydown="openModalKey(event,${numeroPhoto})" class="imgButton"><video src="${videos}" aria-label="video" poster="${videos}" class="hover-shadow" onclick="openModalLightbox(${numeroPhoto});currentMedia(${numeroPhoto})"></button>                        
             </video>
             <h2 class="titre_media">${title}
                <button class="addLikes" data-id="${id}" onclick="addLike(${mediaID})">${likes}</button>
                <img src="${coeur}" alt="likes" class="img_coeur LikesMedia">
             </h2>
             <div tabindex="0" onkeydown="modalKeyboard(event,${numeroPhoto});" autofocus>
                <div id="myModal${numeroPhoto}" class="modal" aria-hidden="true" role="img">
                    <span class="close cursor" aria-label="Close dialog" tabindex=0 onclick="closeModalLightbox(${numeroPhoto})">X</span>
                    <div class="modal-content">
                        <div class="mySlides" aria-label="image closeup view" role="dialog">
                            <video class="img_lightbox" controls>
                                <source src="${videos}" type="video/mp4">
                            </video>
                        </div>  
                        <a class="prev" aria-label="Previous image" tabindex=0 onclick="openModalLightbox(${numeroPhoto}-1);currentMedia(${numeroPhoto}-1);closeModalLightbox(${numeroPhoto})"><</a>
                        <a class="next" aria-label="Next image" tabindex=0 onclick="openModalLightbox(${numeroPhoto}+1);currentMedia(${numeroPhoto}+1);closeModalLightbox(${numeroPhoto})">></a>             
                    </div>
                </div>  
             </div>              
        `;
            //Sinon c'est que c'est une image
        } else {
            //On écris le code HTML suivant
            div.innerHTML = `

             <button onkeydown="openModalKey(event,${numeroPhoto})" class="imgButton"><img src="${picture}" alt="${title}" class="hover-shadow" onclick="openModalLightbox(${numeroPhoto});currentMedia(${numeroPhoto})"></button>
             <h2 class="titre_media">${title}
             <div>
                <button class="addLikes" data-id="${id}" onclick="addLike(${mediaID})" role="button">${likes}</button>
                <img src="${coeur}" alt="likes" class="img_coeur" role="img">
                </div>
             </h2>  
             <div tabindex="0" onkeydown="modalKeyboard(event,${numeroPhoto});" autofocus>
                <div id="myModal${numeroPhoto}" aria-modal="true" class="modal" aria-hidden="true" role="dialog" >
                    <span id="closeBtn${numeroPhoto}" tabindex=0 class="close cursor" aria-label="Close dialog" onclick="closeModalLightbox(${numeroPhoto})" role="button">X</span>
                    <div class="modal-content">
                        <div class="mySlides" aria-label="image closeup view">
                            <img class="img_lightbox" src="${picture}" alt="image${title}" role="img">
                             <p>${title}</p>
                        </div>  
                        <a class="prev" role="button" aria-label="Previous image" onclick="openModalLightbox(${numeroPhoto}-1);currentMedia(${numeroPhoto}-1);closeModalLightbox(${numeroPhoto})"><</a>
                        <a class="next" role="button" aria-label="Next image" onclick="openModalLightbox(${numeroPhoto}+1);currentMedia(${numeroPhoto}+1);closeModalLightbox(${numeroPhoto})">></a>
                    </div>
                </div>
             </div>
        `;
            div.className= 'divCard';
        }
        return (div);
    }

    return {title, id, likes, image, video, getMediaCardDOM}
}