/**
 * Global Animations & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after revealing if we want it to stay
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Smooth Hover Parallax for Cards
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) translateY(0) rotateX(0) rotateY(0)`;
        });
    });

    // 4. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // Create a mobile overlay if it doesn't exist
            let overlay = document.querySelector('.mobile-overlay');

            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'mobile-overlay glass-card';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '100%';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.zIndex = '299';
                overlay.style.display = 'flex';
                overlay.style.flexDirection = 'column';
                overlay.style.alignItems = 'center';
                overlay.style.justifyContent = 'center';
                overlay.style.gap = '2rem';
                overlay.style.transition = 'left 0.3s ease';
                overlay.style.borderRadius = '0';

                // Clone nav links into overlay
                const links = document.querySelectorAll('.nav-link');
                links.forEach(link => {
                    const clone = link.cloneNode(true);
                    clone.style.fontSize = '1.5rem';
                    clone.addEventListener('click', () => {
                        overlay.style.left = '100%';
                    });
                    overlay.appendChild(clone);
                });

                document.body.appendChild(overlay);
            }

            if (overlay.style.left === '0%') {
                overlay.style.left = '100%';
                mobileToggle.innerHTML = '☰';
            } else {
                overlay.style.left = '0%';
                mobileToggle.innerHTML = '✕';
            }
        });
    }
});
