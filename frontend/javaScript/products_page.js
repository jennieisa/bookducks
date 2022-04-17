//DOM:en
const prodList = document.querySelector(".prodList");

//Funktioner
async function drawProducts() {

    let audiobooksData = await getPublicData("http://localhost:1337/api/audiobooks?populate=*");
    let booksData = await getPublicData("http://localhost:1337/api/books?populate=*");

    audiobooksData.data.forEach(audiobook => {

        let { title, length, cover, grade, genres, releaseDate } = audiobook.attributes;

        let { username, email } = audiobook.attributes.users_permissions_user.data.attributes;
       
        let audiobookGenres = "";

        genres.data.forEach(elem => {

            audiobookGenres += " " + elem.attributes.name;

        })

        let theProd = `
            <article class="theProdArticle">
                <section class="">
                    <h3>ljudbok</h3>
                    <section class="">
                        <p>titel: ${title}</p>
                        <p>längd: ${length} h</p>
                        <p>betyg: ${grade} av 10</p>
                        <p>genres: ${audiobookGenres}</p>
                        <p>utgiven: ${releaseDate}</p>
                    </section>
                    <section class="">
                        <h4>kontaktuppgifter</h4>
                        <p>${username}</p>
                        <p>${email}</p>
                    </section>
                </section>
                <section class="wrapperImgBtn">
                    <img src="http://localhost:1337${cover.data.attributes.url}" alt="produktbild">
                    <button class="buttonStyle">låna</button>
                </section>
            </article>
        `;

        prodList.innerHTML += theProd;

    });

    booksData.data.forEach(book => {

        let { title, author, cover, grade, genres, pages } = book.attributes;

        let { username, email } = book.attributes.users_permissions_user.data.attributes;

        let bookgenres = "";

        genres.data.forEach(elem => {

            bookgenres += " " + elem.attributes.name;

        })
         

        let theProd = `
            <article class="theProdArticle">
                <section class="">
                    <h3>bok</h3>
                    <section class="">
                        <p>titel: ${title}</p>
                        <p>författare: ${author}</p>
                        <p>antal sidor: ${pages}</p>
                        <p>genres: ${bookgenres}</p>
                        <p>betyg: ${grade} av 10</p>
                    </section>
                    <section class="">
                        <h4>kontaktuppgifte</h4>
                        <p>${username}</p>
                        <p>${email}</p>
                    </section>
                </section>
                <section class="wrapperImgBtn">
                    <img src="http://localhost:1337${cover.data.attributes.url}" alt="produktbild">
                    <button class="buttonStyle">låna</button>
                </section>
            </article>
        `;

        prodList.innerHTML += theProd;

    })
    
    
}

drawProducts();
