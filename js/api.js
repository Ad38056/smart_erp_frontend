```javascript
const API_URL = "http://localhost:5000/api";


// ========================================
// GENERAL API REQUEST
// ========================================

async function apiRequest(endpoint, method = "GET", data = null) {

    const token = localStorage.getItem("token");

    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Add JWT token
    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    // Add body for POST / PUT
    if (data !== null) {
        options.body = JSON.stringify(data);
    }

    try {

        const response = await fetch(
            `${API_URL}${endpoint}`,
            options
        );

        const result = await response.json();

        if (!response.ok) {

            return {
                success: false,
                status: response.status,
                message: result.message || "Request failed",
                data: null
            };
        }

        return {
            success: true,
            status: response.status,
            data: result
        };

    } catch (error) {

        console.error("API Error:", error);

        return {
            success: false,
            status: 0,
            message: "Server connection failed",
            data: null
        };
    }
}


// ========================================
// AUTHENTICATION
// ========================================

async function loginUser(email, password) {

    return await apiRequest(
        "/auth/login",
        "POST",
        {
            email,
            password
        }
    );
}


async function registerUser(name, email, password) {

    return await apiRequest(
        "/auth/register",
        "POST",
        {
            name,
            email,
            password
        }
    );
}


// ========================================
// PRODUCTS
// ========================================

async function getProducts() {
    return await apiRequest("/products");
}


async function getProduct(id) {
    return await apiRequest(`/products/${id}`);
}


async function createProduct(product) {
    return await apiRequest(
        "/products",
        "POST",
        product
    );
}


async function updateProduct(id, product) {
    return await apiRequest(
        `/products/${id}`,
        "PUT",
        product
    );
}


async function deleteProduct(id) {
    return await apiRequest(
        `/products/${id}`,
        "DELETE"
    );
}


// ========================================
// CUSTOMERS
// ========================================

async function getCustomers() {
    return await apiRequest("/customers");
}


async function getCustomer(id) {
    return await apiRequest(`/customers/${id}`);
}


async function createCustomer(customer) {
    return await apiRequest(
        "/customers",
        "POST",
        customer
    );
}


async function updateCustomer(id, customer) {
    return await apiRequest(
        `/customers/${id}`,
        "PUT",
        customer
    );
}


async function deleteCustomer(id) {
    return await apiRequest(
        `/customers/${id}`,
        "DELETE"
    );
}


// ========================================
// SUPPLIERS
// ========================================

async function getSuppliers() {
    return await apiRequest("/suppliers");
}


async function getSupplier(id) {
    return await apiRequest(`/suppliers/${id}`);
}


async function createSupplier(supplier) {
    return await apiRequest(
        "/suppliers",
        "POST",
        supplier
    );
}


async function updateSupplier(id, supplier) {
    return await apiRequest(
        `/suppliers/${id}`,
        "PUT",
        supplier
    );
}


async function deleteSupplier(id) {
    return await apiRequest(
        `/suppliers/${id}`,
        "DELETE"
    );
}


// ========================================
// ORDERS
// ========================================

async function getOrders() {
    return await apiRequest("/orders");
}


async function getOrder(id) {
    return await apiRequest(`/orders/${id}`);
}


async function createOrder(order) {
    return await apiRequest(
        "/orders",
        "POST",
        order
    );
}


async function updateOrder(id, order) {
    return await apiRequest(
        `/orders/${id}`,
        "PUT",
        order
    );
}


async function deleteOrder(id) {
    return await apiRequest(
        `/orders/${id}`,
        "DELETE"
    );
}


// ========================================
// DASHBOARD
// ========================================

async function getDashboardSummary() {
    return await apiRequest("/dashboard/summary");
}


// ========================================
// AUTH HELPERS
// ========================================

function saveToken(token) {
    localStorage.setItem("token", token);
}


function getToken() {
    return localStorage.getItem("token");
}


function saveUser(user) {
    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );
}


function getUser() {

    const user = localStorage.getItem("user");

    return user
        ? JSON.parse(user)
        : null;
}


function logoutUser() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
}


// ========================================
// EXPORT
// ========================================

export {
    apiRequest,

    // Authentication
    loginUser,
    registerUser,
    saveToken,
    getToken,
    saveUser,
    getUser,
    logoutUser,

    // Products
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,

    // Customers
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,

    // Suppliers
    getSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier,

    // Orders
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,

    // Dashboard
    getDashboardSummary
};
```
