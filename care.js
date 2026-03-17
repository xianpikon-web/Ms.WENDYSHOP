/**
 * Wendy's Garden - Care Tips Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const navbar = document.querySelector('.navbar');
    const heroElements = document.querySelectorAll('.hero-content .reveal');
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const hasSeenGlobalAnim = sessionStorage.getItem('hasSeenGlobalAnim');

    // --- 1. NAVIGATION & HERO ANIMATIONS ---
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    };

    const initAnimations = () => {
        if (hasSeenGlobalAnim) {
            heroElements.forEach(el => {
                el.classList.add('active');
                el.style.transition = "none"; // Instant show if already seen
            });
        } else {
            setTimeout(() => {
                heroElements.forEach(el => el.classList.add('active'));
                sessionStorage.setItem('hasSeenGlobalAnim', 'true');
            }, 200);
        }
    };

    // --- 2. SCROLL REVEAL FOR TIPS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => observer.observe(el));

    // Initialize
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    initAnimations();
});