const CartItems = document.querySelector(".cart-items");

function displayCartItems() {
    const items = JSON.parse(localStorage.getItem("cart")) || [];

    // Clear previous items
    CartItems.innerHTML = '';

    items.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart_item";

        cartItem.innerHTML = `
            <p class="cart_id">${item.id}</p>
            <p class="cart_title">${item.title}</p>
            <img src="${item.image}" alt="${item.title}" class="cart_img"/>
            <p class="cart_price">Rs.${item.price}</p>
            <p class="cart_quantity">
                Quantity: 
                <button class="quantity-btn decrease">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase">+</button>
            </p>
            <p class="cart_total">Total: Rs.<span>${(item.price * item.quantity).toFixed(2)}</span></p>
            <button class="cart_delete_btn">Delete</button>
        `;

        // Add event listener to the delete button
        const deleteButton = cartItem.querySelector(".cart_delete_btn");
        deleteButton.addEventListener("click", () => {
            deleteCartItem(item.id);
        });

        // Add event listeners to quantity buttons
        const decreaseBtn = cartItem.querySelector(".decrease");
        const increaseBtn = cartItem.querySelector(".increase");
        const quantitySpan = cartItem.querySelector(".cart_quantity span");
        const totalSpan = cartItem.querySelector(".cart_total span");

        decreaseBtn.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
                updateQuantityAndTotal();
            }
        });

        increaseBtn.addEventListener("click", () => {
            item.quantity++;
            updateQuantityAndTotal();
        });

        function updateQuantityAndTotal() {
            quantitySpan.textContent = item.quantity;
            totalSpan.textContent = (item.price * item.quantity).toFixed(2);
            updateLocalStorage();
            updateCartTotal();
        }

        function updateLocalStorage() {
            localStorage.setItem("cart", JSON.stringify(items));
        }

        CartItems.appendChild(cartItem);
    });

    updateCartTotal();

function updateCartTotal() {
    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartTotalElement = document.querySelector(".cart-total");
    if (cartTotalElement) {
        cartTotalElement.textContent = `Total: Rs.${cartTotal.toFixed(2)}`;
    }
}
}
function displayCartItems() {
    const items = JSON.parse(localStorage.getItem("cart")) || [];

    // Clear previous items
    CartItems.innerHTML = '';

    function updateCartIcon() {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        const cartIcon = document.querySelector(".cart-icon");
        if (cartIcon) {
            cartIcon.setAttribute("data-count", cartCount);
            cartIcon.classList.toggle("has-items", cartCount > 0);
        }
    }

    items.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart_item";

        cartItem.innerHTML = `
            <p class="cart_id">${item.id}</p>
            <p class="cart_title">${item.title}</p>
            <img src="${item.image}" alt="${item.title}" class="cart_img"/>
            <p class="cart_price">Rs.${item.price}</p>
            <button class="cart_delete_btn">Delete</button>
        `;

        // Add event listener to the delete button
        const deleteButton = cartItem.querySelector(".cart_delete_btn");
        deleteButton.addEventListener("click", () => {
            deleteCartItem(item.id);
            updateCartIcon();
        });

        CartItems.appendChild(cartItem);
    });

    updateCartIcon();

    function updateCartIcon() {
        const cartCount = items.reduce((total, item) => total + item.quantity, 0);
        const cartIcon = document.querySelector(".cart-icon");
        if (cartIcon) {
            cartIcon.setAttribute("data-count", cartCount);
            cartIcon.classList.toggle("has-items", cartCount > 0);
        }
    }

    updateCartIcon();
}
function deleteCartItem(itemId) {
    let items = JSON.parse(localStorage.getItem("cart")) || [];
    items = items.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(items));
    displayCartItems(); // Refresh the cart display
}

displayCartItems();
