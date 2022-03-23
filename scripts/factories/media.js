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
             <video src="${videos}" poster="${videos}"alt="video${title}" class="hover-shadow" onclick="openModalLightbox(${numeroPhoto});currentMedia(${numeroPhoto})">                        
             </video>
             <h2 class="titre_media">${title}
                <button class="addLikes" data-id="${id}" onclick="addLike(${mediaID})">${likes}</button>
                <img src="${coeur}" alt="likes" class="img_coeur LikesMedia">
             </h2>
             
             <div id="myModal${numeroPhoto}" class="modal" aria-hidden="true" role="img">
                <span class="close cursor" aria-label="Close dialog" onclick="closeModalLightbox(${numeroPhoto})">X</span>
                <div class="modal-content">
                    <div class="mySlides" aria-label="image closeup view" role="dialog">
                         <video controls>
                            <source src="${videos}" type="video/mp4">
                       </video>
                    </div>  
                     <a class="prev" aria-label="Previous image" onclick="openModalLightbox(${numeroPhoto}-1);currentMedia(${numeroPhoto}-1);closeModalLightbox(${numeroPhoto})"><</a>
                    <a class="next" aria-label="Next image" onclick="openModalLightbox(${numeroPhoto}+1);currentMedia(${numeroPhoto}+1);closeModalLightbox(${numeroPhoto})">></a>             
                </div>
             </div>
             
        `;
            //Sinon c'est que c'est une image
        } else {
            //On écris le code HTML suivant
            div.innerHTML = ` 
             <img src="${picture}" alt="image${title}" class="hover-shadow" onclick="openModalLightbox(${numeroPhoto});currentMedia(${numeroPhoto})">
             <h2 class="titre_media">${title}
             <div>
                <button class="addLikes" data-id="${id}" onclick="addLike(${mediaID})">${likes}</button>
                <img src="${coeur}" alt="likes" class="img_coeur">
                </div>
             </h2>  
             
             <div id="myModal${numeroPhoto}" class="modal" aria-hidden="true" role="img">
                <span class="close cursor" aria-label="Close dialog" onclick="closeModalLightbox(${numeroPhoto})">X</span>
                <div class="modal-content">
                    <div class="mySlides" aria-label="image closeup view" role="dialog">
                         <img src="${picture}" alt="image${title}">
                         <p>${title}</p>
                    </div>  
                    <a class="prev" aria-label="Previous image" onclick="openModalLightbox(${numeroPhoto}-1);currentMedia(${numeroPhoto}-1);closeModalLightbox(${numeroPhoto})"><</a>
                    <a class="next" aria-label="Next image" onclick="openModalLightbox(${numeroPhoto}+1);currentMedia(${numeroPhoto}+1);closeModalLightbox(${numeroPhoto})">></a>
                </div>
             </div>
        `;
        }
        return (div);
    }

    return {title, id, likes, image, video, getMediaCardDOM}
}