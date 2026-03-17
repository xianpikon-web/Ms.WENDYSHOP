/**
 * WENDY'S GARDEN - ABOUT PAGE LOGIC
 * Handles session-aware animations, solid navigation transitions, and scroll reveals.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ELEMENT SELECTIONS ---
    const navbar = document.querySelector('.navbar'); //
    const aboutTitles = document.querySelectorAll('.about-header .reveal'); //
    const scrollElements = document.querySelectorAll('.scroll-reveal'); //
    const hasSeenAboutAnim = sessionStorage.getItem('hasSeenAboutAnim'); //

    // --- 2. HERO ANIMATION (SESSION AWARE) ---
    if (hasSeenAboutAnim) {
        // STAY STATE: User has already seen the animation
        aboutTitles.forEach((el) => {
            el.classList.add('active'); //
            // Force final styles to bypass CSS transitions and match Home page "Stay" logic
            el.style.opacity = "1"; //
            el.style.transform = "translateY(0) scale(1)"; //
            el.style.letterSpacing = "-2px"; // Synchronized with Home giant text
            el.style.transition = "none"; // Stops sliding movement on re-entry
        });
    } else {
        // FIRST VISIT: Run the staggered reveal
        setTimeout(() => {
            aboutTitles.forEach((el, index) => {
                // Apply staggered transition timing for a premium feel
                el.style.transition = `all 1.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.3}s`; //
                el.classList.add('active'); //
            });
            // Mark session so it stays static on refresh/re-click
            sessionStorage.setItem('hasSeenAboutAnim', 'true'); //
        }, 200);
    }

    // --- 3. NAVBAR SCROLL TRANSFORM ---
    /**
     * Logic to transform the navbar design based on scroll position.
     * Matches the 'scrolled' class behavior in style.css.
     */
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled'); // Adds the solid Deep Forest styling
        } else {
            navbar?.classList.remove('scrolled'); // Returns to default state
        }
    };

    // Initialize the scroll listener
    window.addEventListener('scroll', handleScroll); //
    
    // Run once immediately to check position (in case of page refresh while scrolled)
    handleScroll(); 

    // --- 4. SCROLL REVEAL (INTERSECTION OBSERVER) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" //
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); //
                
                // Optional: Additional staggered delay for grid containers
                if (entry.target.classList.contains('values-grid')) {
                    entry.target.style.transitionDelay = "0.2s"; //
                }
                
                // PERFORMANCE: Stop watching the element once it has revealed
                observer.unobserve(entry.target); //
            }
        });
    }, observerOptions);

    // Start observing all elements with the .scroll-reveal class
    scrollElements.forEach(el => scrollObserver.observe(el)); //

    console.log("🌿 Wendy's About Page: Ready and Blooming!");
});