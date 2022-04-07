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
             <video onkeydown="openModalKey(event,${numeroPhoto})" onclick="openModalLightbox(${numeroPhoto});currentMedia(${numeroPhoto})" aria-label="${title}, closeup view" class="hover-shadow imgButton">
                 <source src="${videos}" type="video/mp4">
             </video>
             <h2 class="titre_media">${title}
             <div>
                <button class="addLikes" data-id="${id}" onclick="addLike(${mediaID})">${likes}</button>
                <img src="${coeur}" alt="likes" class="img_coeur LikesMedia">
             </div>
             </h2>
             <div onkeydown="modalKeyboard(event,${numeroPhoto});">
                <div tabindex="0" id="myModal${numeroPhoto}" class="modal" aria-hidden="true" role="dialog" autofocus>
                    <span class="close cursor" aria-label="Close dialog" onclick="closeModalLightbox(${numeroPhoto})">X</span>
                    <div class="modal-content">
                        <div class="mySlides" aria-label="image closeup view" role="dialog">
                            <video onkeydown="modalKeyboard(event,${numeroPhoto});" class="img_lightbox" controls>
                                <source src="${videos}" type="video/mp4">
                            </video>
                            <p class="titre_media">${title}</p>
                        </div>
                        <a class="prev" aria-label="Previous image" onclick="openModalLightbox(${numeroPhoto}-1);currentMedia(${numeroPhoto}-1);closeModalLightbox(${numeroPhoto})"><</a>
                        <a class="next" aria-label="Next image" onclick="openModalLightbox(${numeroPhoto}+1);currentMedia(${numeroPhoto}+1);closeModalLightbox(${numeroPhoto})">></a>             
                    </div>
                </div>  
             </div>              
        `;
            div.id= 'media'+numeroPhoto;
            div.className= 'divCard hideTab';
            //Sinon c'est que c'est une image
        } else {
            //On écris le code HTML suivant
            div.innerHTML = `
             <button numeroPhoto="${numeroPhoto}" tabindex="0" onkeydown="openModalKey(event,${numeroPhoto})" class="imgButton"><img src="${picture}" alt="${title}, closeup view" class="hover-shadow" onclick="openModalLightbox(${numeroPhoto});currentMedia(${numeroPhoto})"></button>
             <h2 class="titre_media">${title}
             <div>
                <button tabindex="0" class="addLikes" data-id="${id}" onclick="addLike(${mediaID})" role="button">${likes}</button>
                <img src="${coeur}" alt="likes" class="img_coeur" role="img">
             </div>
             </h2>  
             <div onkeydown="modalKeyboard(event,${numeroPhoto})" aria-label="${title} closeup view">
                <div tabindex="0" id="myModal${numeroPhoto}" aria-modal="true" class="modal" role="dialog" >
                    <span id="closeBtn${numeroPhoto}" class="close cursor" aria-label="Close dialog" onclick="closeModalLightbox(${numeroPhoto})" role="button">X</span>
                    <div class="modal-content">
                        <div class="mySlides" aria-label="image closeup view">
                            <img class="img_lightbox" src="${picture}" alt="${title}" role="img">
                             <p class="titre_media">${title}</p>
                        </div>  
                        <a class="prev" role="button" aria-label="Previous image" onclick="openModalLightbox(${numeroPhoto}-1);currentMedia(${numeroPhoto}-1);closeModalLightbox(${numeroPhoto})"><</a>
                        <a class="next" role="button" aria-label="Next image" onclick="openModalLightbox(${numeroPhoto}+1);currentMedia(${numeroPhoto}+1);closeModalLightbox(${numeroPhoto})">></a>
                    </div>
                </div>
             </div>
        `;
            div.id= 'media'+numeroPhoto;
            div.className= 'divCard hideTab';
        }
        return (div);
    }

    return {title, id, likes, image, video, getMediaCardDOM}
}