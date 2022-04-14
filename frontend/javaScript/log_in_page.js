//DOM:en
const createUserBtn = document.querySelector(".createUserBtn");
const logInBtn = document.querySelector(".logInBtn");
const userNameLogInInput = document.querySelector("#userNameLogInInput");
const passwordLogInInput = document.querySelector("#passwordLogInInput");

//Funktioner
async function logIn() {

    let response = await axios.post("http://localhost:1337/api/auth/local", {

        identifier: userNameLogInInput.value,
        password: passwordLogInInput.value
    });

    let token = response.data.jwt;

    console.log(token);

    sessionStorage.setItem("token", token);

    sessionStorage.setItem("user", JSON.stringify(response.data.user));

}

//Eventlisteners
createUserBtn.addEventListener("click", (e) => {

    e.preventDefault();

    window.location.href="create_user_page.html";

})

logInBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    await logIn();

    if (sessionStorage.getItem("token")) {

        window.location.href="my_page.html";

    }

})