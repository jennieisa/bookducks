//DOM:en
const userInfoWrapper = document.querySelector(".userInfoWrapper");
const addNewProdBtn = document.querySelector(".addNewProdBtn");

//funktioner
async function drawUserInfo() {

    let data = await getData("http://localhost:1337/api/users/me", sessionStorage.getItem("token"));
    
    console.log(data);

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

//Eventlisterners
addNewProdBtn.addEventListener("click", () => {

    window.location.href="add_new_prod_page.html";

})

