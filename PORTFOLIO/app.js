// Strict mode to catch errors early
'use strict';

// Theme Toggle System
(function () {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleNav = document.getElementById('themeToggleNav');
    const themeIcon = document.getElementById('themeIcon');
    const themeIconNav = document.getElementById('themeIconNav');
    const body = document.body;

    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // Apply theme on page load
    function initTheme() {
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            updateIcons(true);
        } else {
            body.classList.remove('light-mode');
            updateIcons(false);
        }
    }

    // Update both theme icons
    function updateIcons(isLight) {
        const icons = [
            { element: themeIcon, isLight: isLight },
            { element: themeIconNav, isLight: isLight }
        ];

        icons.forEach(({ element, isLight }) => {
            if (!element) return;

            if (isLight) {
                element.classList.remove('fa-moon');
                element.classList.add('fa-sun');
            } else {
                element.classList.remove('fa-sun');
                element.classList.add('fa-moon');
            }
        });
    }

    // Toggle theme function
    function handleThemeToggle(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');

        updateIcons(isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    // Initialize theme
    initTheme();

    // Add event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', handleThemeToggle, { passive: false });
    }

    if (themeToggleNav) {
        themeToggleNav.addEventListener('click', handleThemeToggle, { passive: false });
    }
})();

// Cursor Effects
(function () {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateOutline);
    }

    animateOutline();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-image');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
})();

// Navigation Scroll Effect
(function () {
    const nav = document.getElementById('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
})();

// Reveal on Scroll Animation
(function () {
    const projectCards = document.querySelectorAll('.project-card');
    const skillCards = document.querySelectorAll('.skill-card');
    const serviceCards = document.querySelectorAll('.service-card');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 100) {
                card.classList.add('visible');
            }
        });

        skillCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 50) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            }
        });

        serviceCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 50) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
})();

// Smooth Scroll for Anchor Links
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();

// Contact Form Handler
(function () {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const mailtoLink = `mailto:ayanshahid1612@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        window.location.href = mailtoLink;
        this.reset();
        alert('Thank you for your message! Your email client will open to send the message.');
    });

    // Form input focus effects
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = '#fff';
            this.style.background = '#222';
        });

        input.addEventListener('blur', function () {
            this.style.borderColor = '#333';
            this.style.background = '#1a1a1a';
        });
    });

    // Button hover effect
    const submitBtn = document.querySelector('#contactForm button');
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', function () {
            this.style.background = '#f0f0f0';
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.2)';
        });

        submitBtn.addEventListener('mouseleave', function () {
            this.style.background = '#fff';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }
})();

// Mobile Menu System
(function () {
    function createMobileMenu() {
        // Check if mobile menu already exists
        if (document.querySelector('.mobile-menu-btn')) return;

        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
        document.body.appendChild(mobileMenuBtn);

        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <a href="#home">Home</a>
            <a href="#skills">Skills</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        `;
        document.body.appendChild(mobileNav);

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    }

    function handleResize() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (window.innerWidth <= 768 && !mobileMenuBtn) {
            createMobileMenu();
        } else if (window.innerWidth > 768 && mobileMenuBtn) {
            mobileMenuBtn.remove();
            const mobileNav = document.querySelector('.mobile-nav');
            if (mobileNav) mobileNav.remove();
        }
    }

    // Initialize on load
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Handle resize with debouncing
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });
})();