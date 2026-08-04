function loadUserProfile() {


    const user =
        JSON.parse(
            localStorage.getItem("user")
        );



    if (!user) {

        window.location.href = "login.html";

        return;

    }



    document.getElementById("name").innerHTML =
        user.name;


    document.getElementById("email").innerHTML =
        user.email;


    document.getElementById("role").innerHTML =
        "Role: " + user.role;


}



loadUserProfile();