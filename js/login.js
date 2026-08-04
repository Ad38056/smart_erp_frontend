document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        async function (e) {


            e.preventDefault();


            const email =
                document.getElementById("email").value;


            const password =
                document.getElementById("password").value;



            try {


                const response =
                    await fetch(
                        `${API_URL}/auth/login`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },


                            body: JSON.stringify({

                                email,

                                password

                            })

                        });



                const data =
                    await response.json();



                if (data.token) {


                    saveToken(
                        data.token
                    );


                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );


                    window.location.href =
                        "dashboard.html";


                }
                else {


                    document
                        .getElementById("message")
                        .innerHTML =
                        data.message;


                }


            }
            catch (error) {


                document
                    .getElementById("message")
                    .innerHTML =
                    "Server connection error";


            }


        });