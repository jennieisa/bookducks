//DOM:en
const userNameInput = document.querySelector(".userNameInput");
const emailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".passwordInput");
const createUserBtn = document.querySelector(".createUserBtn");

//Funktioner
async function registerUser() {

    let response = await axios.post("http://localhost:1337/api/auth/local/register",
        {
            username: userNameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        });

        console.log(response)

        return response;
    
}

//Eventlisterners
createUserBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    let response = await registerUser();

    sessionStorage.setItem("user", JSON.stringify(response.data.user));

    if(response) {

        window.location.href="log_in_page.html";
        
        alert("Din användare är nu skapad. Vänligen logga in.")
    }

})