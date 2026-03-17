document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const bg = document.querySelector('.hero-bg');
    const title = document.querySelector('.reveal-text');
    const subtext = document.querySelector('.reveal-subtext');
    const btn = document.querySelector('.reveal-btn');

    // 1. Initial State: Background Zoom
    // Start slightly zoomed out and ease into the zoom
    if (bg) {
        setTimeout(() => {
            bg.style.transition = "transform 8s ease-out";
            bg.style.transform = "scale(1.1)";
        }, 100);
    }

    // 2. Staggered Text Animations
    // Using a simple function to add the 'reveal' class at intervals
    const animateElement = (el, delay) => {
        if (el) {
            setTimeout(() => {
                el.classList.add('reveal');
            }, delay);
        }
    };

    animateElement(title, 500);    // Title pops up first
    animateElement(subtext, 900);  // Then the sub-headline
    animateElement(btn, 1300);     // Finally the button

    // 3. Smooth Page Transition
    // This listens for the click on the "Visit Now" button
    if (btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Stop the instant jump to home.html
            
            const destination = this.getAttribute('href');

            // Apply exit effects
            document.body.style.transition = "opacity 0.6s ease, filter 0.6s ease";
            document.body.style.opacity = "0";
            document.body.style.filter = "blur(10px)";

            // Wait for animation to finish, then go to home.html
            setTimeout(() => {
                window.location.href = destination;
            }, 600);
        });
    }
});