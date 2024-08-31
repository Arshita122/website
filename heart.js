// Example of loading wishlist items dynamically
function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.querySelector('.wishlist-items');
    wishlistContainer.innerHTML = ''; // Clear current wishlist items

    wishlist.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.classList.add('wishlist-item');
        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="wishlist-img">
            <div class="wishlist-info">
                <p class="wishlist-title">${item.title}</p>
                <p class="wishlist-price">Rs. ${item.price}</p>
                <button class="remove-from-wishlist">Remove</button>
            </div>
        `;
        wishlistContainer.appendChild(wishlistItem);

        // Add event listener for removing the item
        wishlistItem.querySelector('.remove-from-wishlist').addEventListener('click', () => {
            removeItemFromWishlist(item.id); // Function to remove the item from storage
            wishlistItem.remove();
        });
    });
}

function removeItemFromWishlist(itemId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== itemId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Load wishlist on page load
loadWishlist();
// JavaScript to handle adding/removing items from wishlist
document.querySelectorAll('.remove-from-wishlist').forEach(button => {
    button.addEventListener('click', (event) => {
        const item = event.target.closest('.wishlist-item');
        item.remove();  // Remove the item from the wishlist in the DOM

        // Further code to handle removing the item from the stored wishlist data (if using localStorage or an API)
    });
});
