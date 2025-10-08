// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeToggleNav = document.getElementById('themeToggleNav');
const themeIcon = document.getElementById('themeIcon');
const themeIconNav = document.getElementById('themeIconNav');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    if (themeIconNav) {
        themeIconNav.classList.remove('fa-moon');
        themeIconNav.classList.add('fa-sun');
    }
}

function toggleTheme() {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        if (themeIconNav) {
            themeIconNav.classList.remove('fa-moon');
            themeIconNav.classList.add('fa-sun');
        }
        localStorage.setItem('theme', 'light');
    } else {
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        if (themeIconNav) {
            themeIconNav.classList.remove('fa-sun');
            themeIconNav.classList.add('fa-moon');
        }
        localStorage.setItem('theme', 'dark');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

if (themeToggleNav) {
    themeToggleNav.addEventListener('click', toggleTheme);
}

// Cursor effects (disabled in light mode)
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

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

const hoverElements = document.querySelectorAll('a, button, .project-image');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const projectCards = document.querySelectorAll('.project-card');
const skillCards = document.querySelectorAll('.skill-card');

const revealOnScroll = () => {
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

    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight - 50) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create mailto link
    const mailtoLink = `mailto:ayanshahid1612@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Open mail client
    window.location.href = mailtoLink;

    // Reset form
    this.reset();

    // Show success message
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
// Add this at the end of app.js

// Mobile Menu Toggle
const createMobileMenu = () => {
    const nav = document.getElementById('nav');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    document.body.appendChild(mobileMenuBtn);
    
    // Create mobile nav
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
    
    // Toggle menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
    
    // Close menu when clicking links
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
};

// Initialize mobile menu on load
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Reinitialize on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (window.innerWidth <= 768 && !mobileMenuBtn) {
            createMobileMenu();
        }
    }, 250);
});