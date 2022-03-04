function photographerFactory(data) {
    const { name,id,city,country,tagline,price,portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const lien = document.createElement( 'a' );
        lien.setAttribute("href", 'photographer.html?id='+id)

        const nom = document.createElement( 'h2' );
        nom.textContent = name;

        const ville = document.createElement( 'p' );
        ville.textContent = city+",";
        ville.classList.add("location");

        const pays = document.createElement( 'span' );
        pays.textContent = " "+country;
        pays.classList.add("location");

        const description = document.createElement( 'p' );
        description.textContent = tagline;

        const prix = document.createElement( 'p' );
        prix.classList.add("prix");
        prix.textContent = price+"€/jour";

        article.appendChild(img);
        article.appendChild(lien);
        lien.appendChild(img);
        article.appendChild(nom);
        article.appendChild(ville);
        ville.appendChild(pays);
        article.appendChild(description);
        article.appendChild(prix);
        return (article);
    }
    return { name,city,country,tagline,price,picture, getUserCardDOM }
}