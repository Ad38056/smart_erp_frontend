let customers = [];

function addCustomer() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !email || !phone) {
        alert("Please complete all customer fields.");
        return;
    }

    customers.push({
        name,
        email,
        phone
    });

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    displayCustomers();
}

function displayCustomers() {
    const box = document.getElementById("customers");
    box.innerHTML = "";

    customers.forEach((c) => {
        box.innerHTML += `
<div class="customer-card">
    <h3>${c.name}</h3>
    <p>${c.email}</p>
    <p>${c.phone}</p>
</div>
`;
    });
}
