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
            <h3>användaruppgifter</h3>
            <p>användarnamn: ${data.username}</p>
            <p>emailadress: ${data.email}</p>
            <p>id: ${data.id}</p>
            <p>användare skapades: ${data.createdAt.slice("T", 10)}</p>
        `;

        userInfoWrapper.innerHTML = userInfo;

    }

}

async function drawUserProds() {

    let booksData = await getData(`http://localhost:1337/api/books?filters[userId][$eq]=${sessionStorage.getItem("userId")}`, sessionStorage.getItem("token"));

    let audiobooksData = await getData(`http://localhost:1337/api/audiobooks?filters[userId][$eq]=${sessionStorage.getItem("userId")}`, sessionStorage.getItem("token"));

    booksData.data.forEach(book => {

        let { title, author } = book.attributes;

        let theProd = `
            <article class="userProd">
                <p>bok</p>
                <p>titel: ${title}</p>
                <p>författare: ${author}</p>
            </article>
        `;

        userProdList.innerHTML += theProd;

    })

    audiobooksData.data.forEach(audiobook => {

        let { title, releaseDate } = audiobook.attributes;

        let theProd = `
            <article class="userProd">
                <p>ljudbok</p>
                <p>titel: ${title}</p>
                <p>utgiven: ${releaseDate}</p>
            </article>
        `;

        userProdList.innerHTML += theProd;

    })

}

//Eventlisterners
function showMyPage() {

    let loggedIn = checkUserStatus();

    if (loggedIn === true) {

        document.querySelector(".mySiteWrapper").classList.remove("hideElem");

        drawUserInfo();

        drawUserProds();

    }

}

showMyPage();

addNewProdBtn.addEventListener("click", () => {

    window.location.href="add_new_prod_page.html";

})

logOutBtn.addEventListener("click", () => {

    sessionStorage.removeItem("user");

    sessionStorage.removeItem("token");
    
    window.location.href="landing_page.html";

})
