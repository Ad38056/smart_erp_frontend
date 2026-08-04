let customers = [];


function addCustomer() {

    const name =
        document.getElementById("name").value;


    const email =
        document.getElementById("email").value;


    const phone =
        document.getElementById("phone").value;



    customers.push({

        name,
        email,
        phone

    });


    displayCustomers();

}



function displayCustomers() {


    const box =
        document.getElementById("customers");


    box.innerHTML = "";


    customers.forEach(c => {


        box.innerHTML += `

<div class="customer-card">

<h3>${c.name}</h3>

<p>${c.email}</p>

<p>${c.phone}</p>

</div>

`;

    });


}