/* ==========================================================================
   app.js — UI behaviour only.
   All scroll-driven animation lives in motion.js (GSAP + ScrollTrigger).
   Each concern is an isolated IIFE so a failure in one can't take out the rest.
   ========================================================================== */
'use strict';

/* --------------------------------------------------------------------------
   Theme toggle
   Dark is the default. Persisted under the "theme" key.
   -------------------------------------------------------------------------- */
(function () {
    const body = document.body;
    const toggles = document.querySelectorAll('#themeToggle, #themeToggleNav');
    const icons = document.querySelectorAll('#themeIcon, #themeIconNav');

    function updateIcons(isLight) {
        icons.forEach((icon) => {
            icon.classList.toggle('fa-sun', isLight);
            icon.classList.toggle('fa-moon', !isLight);
        });
        toggles.forEach((btn) => {
            btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
        });
    }

    function applyTheme(theme) {
        const isLight = theme === 'light';
        body.classList.toggle('light-mode', isLight);
        updateIcons(isLight);
    }

    function handleToggle(e) {
        if (e) e.preventDefault();
        const isLight = !body.classList.contains('light-mode');
        applyTheme(isLight ? 'light' : 'dark');

        try {
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        } catch (err) {
            /* Private-mode / blocked storage: theme still applies for this visit. */
        }
    }

    let saved = 'dark';
    try {
        saved = localStorage.getItem('theme') || 'dark';
    } catch (err) {
        /* ignore */
    }

    applyTheme(saved);
    toggles.forEach((btn) => btn.addEventListener('click', handleToggle));
})();

/* --------------------------------------------------------------------------
   Custom cursor
   Hidden by CSS on coarse pointers, so bail out there instead of burning a
   rAF loop for nothing.
   -------------------------------------------------------------------------- */
(function () {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (!dot || !outline) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }, { passive: true });

    (function loop() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
    })();

    // Class swap rather than an inline transform, so it can't fight the
    // rAF-driven translate above.
    document.querySelectorAll('a, button, .project-card').forEach((el) => {
        el.addEventListener('mouseenter', () => outline.classList.add('is-hover'));
        el.addEventListener('mouseleave', () => outline.classList.remove('is-hover'));
    });
})();

/* --------------------------------------------------------------------------
   Mobile menu
   The markup lives in index.html (it used to be built in JS, which is how the
   mobile link set drifted out of sync with the desktop one). This just wires
   it up.
   -------------------------------------------------------------------------- */
(function () {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mobileNav');
    if (!btn || !nav) return;

    // Only reachable with JS, so it stays [hidden] until we take ownership.
    nav.removeAttribute('hidden');

    function setOpen(open) {
        btn.classList.toggle('active', open);
        nav.classList.toggle('active', open);
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setOpen(!nav.classList.contains('active'));
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            setOpen(false);
            btn.focus();
        }
    });

    // Close if the viewport grows past the breakpoint while the menu is open.
    window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
        if (e.matches) setOpen(false);
    });
})();

/* --------------------------------------------------------------------------
   Anchor scrolling
   Offsets for the fixed nav. The skip link is left to the browser so focus
   actually lands on <main>.
   -------------------------------------------------------------------------- */
(function () {
    const nav = document.getElementById('nav');

    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            if (!hash || hash === '#') return;

            const target = document.querySelector(hash);
            if (!target) return;

            e.preventDefault();
            const offset = (nav ? nav.offsetHeight : 0) + 12;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: Math.max(0, top),
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
            });
        });
    });
})();

/* --------------------------------------------------------------------------
   Contact form
   Hands off to the user's mail client and reports back through an
   aria-live region instead of alert().
   -------------------------------------------------------------------------- */
(function () {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form) return;

    const EMAIL = 'ayanshahid1612@gmail.com';

    function say(message, kind) {
        if (!status) return;
        status.textContent = message;
        status.classList.toggle('is-ok', kind === 'ok');
        status.classList.toggle('is-error', kind === 'error');
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            say('Please fill in every field with a valid value.', 'error');
            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const subject = form.elements.subject.value.trim();
        const message = form.elements.message.value.trim();

        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        window.location.href =
            `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        form.reset();
        say('Thanks! Your email client should open with the message ready to send.', 'ok');
    });

    // Clear the status as soon as the user starts over.
    form.addEventListener('input', () => {
        if (status && status.textContent) say('', null);
    });
})();

/* --------------------------------------------------------------------------
   Certificates carousel
   The track is a real scroll container with CSS scroll-snap, so dragging,
   trackpad swipes, and arrow keys already work with zero JS. This adds the
   two chevrons on top of that: they page by one card and, crucially, stay
   hidden whenever the cards already fit — which is the case on desktop until
   a fourth certificate is added.
   -------------------------------------------------------------------------- */
(function () {
    const track = document.getElementById('certTrack');
    const prev = document.getElementById('certPrev');
    const next = document.getElementById('certNext');
    if (!track || !prev || !next) return;

    // 1px of slack: scrollLeft is fractional once the layout uses calc() widths,
    // so an exact === comparison never reports "at the end".
    const EPS = 1;

    function step() {
        const first = track.firstElementChild;
        if (!first) return track.clientWidth;

        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return first.getBoundingClientRect().width + gap;
    }

    function overflows() {
        return track.scrollWidth - track.clientWidth > EPS;
    }

    function sync() {
        const scrollable = overflows();

        // Hidden rather than just disabled: two permanently dead buttons
        // flanking the section would read as broken, not as "nothing to page".
        prev.hidden = !scrollable;
        next.hidden = !scrollable;
        if (!scrollable) return;

        prev.disabled = track.scrollLeft <= EPS;
        next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - EPS;
    }

    function page(direction) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const from = track.scrollLeft;
        const to = from + direction * step();

        if (reduced) {
            track.scrollTo({ left: to, behavior: 'instant' });
            return;
        }

        track.scrollTo({ left: to, behavior: 'smooth' });

        // Smooth scrolling on a scroll-snap container is silently a no-op in
        // some engines (and in headless Chrome), which would leave the arrows
        // looking dead. If nothing has moved by the time an animation would
        // clearly be under way, jump instead. Movement, not arrival, is the
        // test — a real smooth scroll is only part-way through at this point.
        window.setTimeout(() => {
            if (track.scrollLeft === from) {
                track.scrollTo({ left: to, behavior: 'instant' });
            }
        }, 250);
    }

    prev.addEventListener('click', () => page(-1));
    next.addEventListener('click', () => page(1));
    track.addEventListener('scroll', sync, { passive: true });

    // Card widths are percentages of the track, so every resize changes both
    // the step and whether anything overflows at all.
    if (window.ResizeObserver) {
        new ResizeObserver(sync).observe(track);
    } else {
        window.addEventListener('resize', sync);
    }

    sync();
    // Lazy-loaded images settle after first paint and can change scrollWidth.
    window.addEventListener('load', sync);
})();
