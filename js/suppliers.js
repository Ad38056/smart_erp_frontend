const suppliers = [

    {
        name: "aderajew Trading",
        phone: "+251900000000",
        country: "Ethiopia"
    },

    {
        name: "Global Supply PLC",
        phone: "+251911111111",
        country: "Ethiopia"
    }

];



const box = document.getElementById("suppliers");


suppliers.forEach(s => {


    box.innerHTML += `

<div class="supplier-card">

<h3>${s.name}</h3>

<p>${s.phone}</p>

<p>${s.country}</p>


</div>

`;

});