/**
 * Wendy's Garden - Shop Logic
 * Features: Instant re-load, Navigation scroll, and Product filtering.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const navbar = document.querySelector('.navbar');
    const heroElements = document.querySelectorAll('.hero-content .reveal');
    const searchInput = document.getElementById('plantSearch');
    const priceSlider = document.getElementById('priceRange');
    const products = Array.from(document.querySelectorAll('.product-card'));
    
    // Check if the intro has already played in this session
    const hasSeenGlobalAnim = sessionStorage.getItem('hasSeenGlobalAnim');

    // --- 1. NAVIGATION & INSTANT LOAD LOGIC ---
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    };

    const initHero = () => {
    // 1. Check if the animation has already played once in this session
    const hasSeenGlobalAnim = sessionStorage.getItem('hasSeenGlobalAnim');

    if (hasSeenGlobalAnim) {
        // INSTANT STATE: Remove transitions and show text immediately
        heroElements.forEach(el => {
            el.style.transition = "none"; // Disables the 1.8s slide/fade
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
            el.style.letterSpacing = "-2px"; // Matches your "active" CSS state
            el.classList.add('active');
        });
    } else {
        // FIRST TIME VISIT: Play the smooth 1.8s animation
        setTimeout(() => {
            heroElements.forEach(el => el.classList.add('active'));
            sessionStorage.setItem('hasSeenGlobalAnim', 'true');
        }, 300);
    }
};

    // --- 2. FILTERING LOGIC ---
    const updateShop = () => {
        const query = searchInput?.value.toLowerCase() || '';
        const maxPrice = parseInt(priceSlider?.value) || 1000;
        document.getElementById('priceValue').textContent = `P${maxPrice}`;

        products.forEach(card => {
            const name = card.dataset.name.toLowerCase();
            const price = parseInt(card.dataset.price);
            
            if (name.includes(query) && price <= maxPrice) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    };

    // --- 3. EVENT LISTENERS ---
    window.addEventListener('scroll', handleScroll);
    searchInput?.addEventListener('input', updateShop);
    priceSlider?.addEventListener('input', updateShop);
    
    document.getElementById('resetFilters')?.addEventListener('click', () => {
        searchInput.value = '';
        priceSlider.value = 1000;
        updateShop();
    });

    // Initialize
    handleScroll();
    initHero();
});

let cart = [];

// Handle Adding to Cart
document.querySelectorAll('.btn-cart-add').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const plant = {
            name: card.dataset.name,
            price: parseInt(card.dataset.price)
        };
        
        cart.push(plant);
        updateCartUI();
    });
});

// Toggle Cart Dropdown
document.getElementById('cartIcon').addEventListener('click', () => {
    document.getElementById('cartDropdown').classList.toggle('active');
});

function updateCartUI() {
    const cartList = document.getElementById('cartItems');
    const countLabel = document.querySelector('.cart-count');
    const totalLabel = document.getElementById('totalPrice');
    
    // Update Count
    countLabel.textContent = cart.length;
    
    // Clear and Redraw List
    cartList.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.style.cssText = "display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.9rem;";
        li.innerHTML = `<span>${item.name}</span> <span>P${item.price}</span>`;
        cartList.appendChild(li);
    });
    
    totalLabel.textContent = total;
    
    if(cart.length > 0) {
        document.querySelector('.empty-msg').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    const cartCount = document.querySelector('.cart-count');

    // Select all "Add to Cart" buttons
    const addButtons = document.querySelectorAll('.btn-cart-add');

    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Find the closest product card to get data
            const card = e.target.closest('.product-card');
            const name = card.getAttribute('data-name');
            const price = card.getAttribute('data-price');

            // Add to our cart array
            cart.push({ name, price });

            // Update the UI count
            cartCount.textContent = cart.length;

            // Optional: Simple feedback
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-shopping-cart"></i>';
            }, 1000);
        });
    });
});