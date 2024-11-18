document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const registerForm = document.getElementById("register-form");

    // Fetch products from the backend
    fetch("/api/products")
        .then((response) => response.json())
        .then((products) => {
            products.forEach((product) => {
                const item = document.createElement("li");
                item.textContent = `${product.name} - $${product.price}`;
                productList.appendChild(item);
            });
        });

    // Handle user registration
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                alert(result.message);
                registerForm.reset();
            });
    });
});
