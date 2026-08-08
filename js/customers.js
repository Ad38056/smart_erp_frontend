```jsx
import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Get customers from backend
    const loadCustomers = async () => {
        try {
            setLoading(true);

            const response = await api.get("/customers");

            setCustomers(response.data);

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to load customers"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    // Handle input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Add customer
    const addCustomer = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            setMessage("Customer name is required");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const response = await api.post("/customers", {
                name: form.name,
                email: form.email,
                phone: form.phone,
                company: form.company,
                address: form.address
            });

            setCustomers([
                response.data,
                ...customers
            ]);

            setForm({
                name: "",
                email: "",
                phone: "",
                company: "",
                address: ""
            });

            setMessage("Customer added successfully");

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to add customer"
            );

        } finally {
            setLoading(false);
        }
    };

    // Delete customer
    const deleteCustomer = async (id) => {

        if (!window.confirm("Delete this customer?")) {
            return;
        }

        try {
            await api.delete(`/customers/${id}`);

            setCustomers(
                customers.filter(customer => customer.id !== id)
            );

            setMessage("Customer deleted successfully");

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to delete customer"
            );
        }
    };

    return (
        <div className="customers-page">

            <h1>Customers</h1>

            {message && (
                <div className="message">
                    {message}
                </div>
            )}

            <form onSubmit={addCustomer}>

                <input
                    type="text"
                    name="name"
                    placeholder="Customer name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Add Customer"}
                </button>

            </form>

            <div className="customers-list">

                {loading && customers.length === 0 ? (
                    <p>Loading customers...</p>
                ) : customers.length === 0 ? (
                    <p>No customers found.</p>
                ) : (
                    customers.map(customer => (

                        <div
                            className="customer-card"
                            key={customer.id}
                        >

                            <h3>{customer.name}</h3>

                            <p>
                                Email: {customer.email || "N/A"}
                            </p>

                            <p>
                                Phone: {customer.phone || "N/A"}
                            </p>

                            <p>
                                Company: {customer.company || "N/A"}
                            </p>

                            <p>
                                Address: {customer.address || "N/A"}
                            </p>

                            <button
                                onClick={() =>
                                    deleteCustomer(customer.id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    ))
                )}

            </div>

        </div>
    );
}

export default Customers;
```
