/**
 * WENDY'S GARDEN - CORE INTERACTION SCRIPT
 * Synchronized for Home & About pages
 */

// 1. FAST-TRACK: Prevent "Flash of Unstyled Content" before DOM loads
if (sessionStorage.getItem('hasSeenGlobalAnim')) {
    document.documentElement.classList.add('no-anim');
}

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const heroElements = document.querySelectorAll('.reveal');
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    // Navigation Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Check if the intro has already played
    const hasSeenHomeAnim = sessionStorage.getItem('hasSeenHomeAnim');

    if (hasSeenHomeAnim) {
    heroElements.forEach(el => {
        el.style.transition = 'none'; // No sliding when returning home
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.classList.add('active'); 
    });
}
    else {
        // FIRST TIME: Play the smooth reveal
        setTimeout(() => {
            heroElements.forEach((el, i) => {
                setTimeout(() => el.classList.add('active'), i * 200);
            });
            sessionStorage.setItem('hasSeenHomeAnim', 'true');
        }, 500);
    }

    // Scroll Observer for lower sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => observer.observe(el));
});

    // --- 4. SMOOTH ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || !targetId.startsWith('#')) return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 5. DESKTOP MOUSE PARALLAX ---
    if (window.innerWidth > 1024 && heroContent) {
        window.addEventListener('scroll', function() {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
    }

    console.log("🌿 Wendy's Garden: Interactions fully synchronized.");

    