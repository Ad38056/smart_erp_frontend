function saveToken(token) {

    localStorage.setItem(
        "token",
        token
    );

}



function getToken() {

    return localStorage.getItem(
        "token"
    );

}



function getUser() {

    return JSON.parse(
        localStorage.getItem("user")
    );

}



function logout() {

    localStorage.removeItem(
        "token"
    );


    localStorage.removeItem(
        "user"
    );


    window.location.href = "login.html";

}