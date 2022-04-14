//DOM:en
const userInfoWrapper = document.querySelector(".userInfoWrapper");
const addNewProdBtn = document.querySelector(".addNewProdBtn");
const userProdList = document.querySelector(".userProdList");
const logOutBtn = document.querySelector(".logOutBtn");

//funktioner
async function drawUserInfo() {

    let data = await getData("http://localhost:1337/api/users/me", sessionStorage.getItem("token"));

    if(data) {

        let userInfo = `
            <p>användarnamn: ${data.username}</p>
            <p>emailadress: ${data.email}</p>
            <p>id: ${data.id}</p>
            <p>användare skapades: ${data.createdAt}</p>
        `;

        userInfoWrapper.innerHTML = userInfo;

    }

}
drawUserInfo();

async function drawUserProds() {

    let booksData = await getData(`http://localhost:1337/api/books?filters[creator][$eq]=${sessionStorage.getItem("user")}`, sessionStorage.getItem("token"));

    let audiobooksData = await getData(`http://localhost:1337/api/audiobooks?filters[creator][$eq]=${sessionStorage.getItem("user")}`, sessionStorage.getItem("token"));

    console.log(booksData.data, audiobooksData.data)

    booksData.data.forEach(book => {

        let { title, author } = book.attributes;

        console.log(title, author)

        let theProd = `
            <article class="userProd">
                <p>${title}</p>
                <p>${author}</p>
            </article>
        `;

        userProdList.innerHTML += theProd;

    })

    audiobooksData.data.forEach(audiobook => {

        let { title, releaseDate } = audiobook.attributes;

        console.log(title, releaseDate)

        let theProd = `
            <article class="userProd">
                <p>${title}</p>
                <p>${releaseDate}</p>
            </article>
        `;

        userProdList.innerHTML += theProd;

    })

}

drawUserProds();

//Eventlisterners
addNewProdBtn.addEventListener("click", () => {

    window.location.href="add_new_prod_page.html";

})

logOutBtn.addEventListener("click", () => {

    sessionStorage.removeItem("user");

    sessionStorage.removeItem("token");
    
    window.location.href="landing_page.html";

})
