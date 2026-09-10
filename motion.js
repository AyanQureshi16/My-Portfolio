
/* ==========================================================================
   motion.js — the animation layer.

   Two rules this file is built around:

   1. Nothing is hidden in CSS. Every reveal uses gsap.from(), so if GSAP
      fails to load, or JS is off, or a crawler renders the page, the content
      is simply there at its final state. (The old build set opacity:0 in CSS
      and depended on JS to reveal it, which meant a blank page on failure.)

   2. Motion lives inside gsap.matchMedia(). The reduce branch is empty by
      design — with rule 1, "no animation" already is the final state — and
      the desktop-only pin tears itself down when the viewport shrinks.
   ========================================================================== */
'use strict';

(function () {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);
    const hasSplit = typeof window.SplitText !== 'undefined';
    if (hasSplit) gsap.registerPlugin(SplitText);

    /* ----------------------------------------------------------------------
       Always on: chrome state. These are indicators, not motion, so they run
       regardless of the reduced-motion preference.
       ---------------------------------------------------------------------- */
    (function chrome() {
        const nav = document.getElementById('nav');
        if (nav) {
            ScrollTrigger.create({
                start: 'top -100',
                end: 'max',
                toggleClass: { targets: nav, className: 'scrolled' }
            });
        }

        const bar = document.getElementById('scrollProgress');
        if (bar) {
            gsap.to(bar, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true
                }
            });
        }

        // Scroll-spy. Nav order now matches document order, so the active
        // marker walks straight down the list instead of jumping around.
        document.querySelectorAll('main section[id]').forEach((section) => {
            const links = document.querySelectorAll(`.nav-link[data-spy="${section.id}"]`);
            if (!links.length) return;

            ScrollTrigger.create({
                trigger: section,
                start: 'top 45%',
                end: 'bottom 45%',
                onToggle: (self) => {
                    links.forEach((link) => link.classList.toggle('is-active', self.isActive));
                }
            });
        });
    })();

    const mm = gsap.matchMedia();

    /* ----------------------------------------------------------------------
       Full choreography — anyone who hasn't asked for reduced motion.
       ---------------------------------------------------------------------- */
    mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cleanups = [];

        /* -- Hero entrance ------------------------------------------------ */
        const headline = document.querySelector('[data-split]');

        // Preset #9 (Stagger List / Complex). Short headline only — two words
        // here — and reverted on teardown so assistive tech sees real text.
        //
        // autoSplit is doing real work: SplitText measures glyph boxes, so
        // splitting before the webfont arrives positions every character
        // against the fallback metrics and then reflows when Plus Jakarta Sans
        // swaps in. autoSplit re-splits on font load (and on resize, since the
        // headline is clamp()-sized) and re-runs onSplit.
        let split = null;
        let charsPlayed = false;

        function animateChars(chars) {
            // Let the font-load re-split animate too, but never replay on a
            // later resize.
            if (charsPlayed) return null;
            if (!document.fonts || document.fonts.status === 'loaded') charsPlayed = true;

            return gsap.from(chars, {
                opacity: 0,
                y: 20,
                rotateX: -40,
                duration: 0.6,
                stagger: 0.015,
                delay: 0.1,
                ease: 'expo.out'
            });
        }

        if (headline && hasSplit) {
            split = SplitText.create(headline, {
                type: 'chars',
                autoSplit: true,
                onSplit: (self) => animateChars(self.chars)
            });
            cleanups.push(() => split.revert());
        } else if (headline) {
            gsap.from(headline, { opacity: 0, y: 24, duration: 0.7, delay: 0.1, ease: 'expo.out' });
        }

        const hero = gsap.timeline({ defaults: { ease: 'expo.out' } });

        hero.from('.hero-eyebrow', { opacity: 0, y: -14, duration: 0.5 }, 0)
            .from('.hero-role', { opacity: 0, y: 18, duration: 0.6 }, 0.3)
            .from('.hero-sub', { opacity: 0, y: 18, duration: 0.6 }, 0.42)
            .from('.hero-actions .btn', { opacity: 0, y: 18, duration: 0.5, stagger: 0.08 }, 0.54)
            .from('.hero-marquee', { opacity: 0, duration: 0.6 }, 0.66)
            .from('.hero-scroll-cue', { opacity: 0, y: -12, duration: 0.5 }, 0.78);

        /* -- Aurora parallax (preset #14) --------------------------------- */
        // Decorative layers only, varying speed per layer to sell the depth.
        const heroSection = document.getElementById('home');
        if (heroSection) {
            gsap.utils.toArray('.parallax-layer').forEach((layer, i) => {
                gsap.to(layer, {
                    yPercent: (i + 1) * -8,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroSection,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.5
                    }
                });
            });
        }

        /* -- Section headings (preset #5) --------------------------------- */
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
            gsap.from(el.children, {
                opacity: 0,
                y: 24,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
                // 'play none none none' — play once on the way down, never
                // reverse. Without this, scrolling back up past the trigger
                // fades the section back out, then fades it back in again on
                // the next scroll down: the "blinking" during normal up/down
                // scrolling.
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
            });
        });

        /* -- Card grids (preset #8) --------------------------------------- */
        // grid:'auto' lets GSAP infer rows/columns for a diagonal wave.
        // Every grid here is 8 children or fewer, which is the stagger ceiling.
        gsap.utils.toArray('[data-stagger]').forEach((grid) => {
            gsap.from(grid.children, {
                opacity: 0,
                scale: 0.92,
                y: 16,
                duration: 0.4,
                stagger: { each: 0.06, from: 'start', grid: 'auto' },
                ease: 'back.out(1.4)',
                // Same reasoning as the [data-reveal] block above — play once,
                // don't reverse/replay on scroll-up.
                scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' }
            });
        });

        /* -- Card hover (preset #2) --------------------------------------- */
        // quickTo instead of a fresh gsap.to per event — there are ~25 cards.
        // Note scaleX/scaleY rather than the `scale` shorthand: GSAP decomposes
        // `scale` into the two axes internally, so there is no prop tween named
        // "scale" for quickTo's resetTo() to find. It warns "scale not eligible
        // for reset", recurses inside resetTo, and never animates.
        gsap.utils.toArray('.glass-card:not(.contact-form-wrap)').forEach((card) => {
            const yTo = gsap.quickTo(card, 'y', { duration: 0.25, ease: 'power2.out' });
            const sxTo = gsap.quickTo(card, 'scaleX', { duration: 0.25, ease: 'power2.out' });
            const syTo = gsap.quickTo(card, 'scaleY', { duration: 0.25, ease: 'power2.out' });

            const onEnter = () => { yTo(-6); sxTo(1.015); syTo(1.015); };
            const onLeave = () => { yTo(0); sxTo(1); syTo(1); };

            card.addEventListener('pointerenter', onEnter);
            card.addEventListener('pointerleave', onLeave);
            cleanups.push(() => {
                card.removeEventListener('pointerenter', onEnter);
                card.removeEventListener('pointerleave', onLeave);
            });
        });

        /* -- Magnetic CTA (preset #3) ------------------------------------- */
        // Exactly one focal element, pull clamped to 0.3 so it never leaves
        // its own hit box.
        const magnet = document.querySelector('[data-magnetic]');
        if (magnet && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            const xTo = gsap.quickTo(magnet, 'x', { duration: 0.4, ease: 'elastic.out(1, 0.4)' });
            const yTo = gsap.quickTo(magnet, 'y', { duration: 0.4, ease: 'elastic.out(1, 0.4)' });

            const onMove = (e) => {
                const r = magnet.getBoundingClientRect();
                xTo((e.clientX - r.left - r.width / 2) * 0.3);
                yTo((e.clientY - r.top - r.height / 2) * 0.3);
            };
            const onLeave = () => { xTo(0); yTo(0); };

            magnet.style.willChange = 'transform';
            magnet.addEventListener('pointermove', onMove);
            magnet.addEventListener('pointerleave', onLeave);
            cleanups.push(() => {
                magnet.style.willChange = '';
                magnet.removeEventListener('pointermove', onMove);
                magnet.removeEventListener('pointerleave', onLeave);
            });
        }

        return () => cleanups.forEach((fn) => fn());
    });

    /* ----------------------------------------------------------------------
       The one pinned section (preset #6), desktop only.
       Pinning fights native scroll on touch, and the ceiling is 1-2 per page,
       so About gets it and nothing else does.
       ---------------------------------------------------------------------- */
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const section = document.getElementById('about');
        if (!section) return;

        gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=120%',
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        })
            .from('.about-media', { scale: 0.85, rotate: -5, yPercent: 10, opacity: 0.35 }, 0)
            .to('.about-media-glow', { scale: 1.3, opacity: 0.75 }, 0)
            .from('.about-text .section-kicker', { opacity: 0, y: 24 }, 0)
            .from('.about-title', { opacity: 0, y: 36 }, 0.05)
            .from('.about-para', { opacity: 0, y: 28, stagger: 0.22 }, 0.15)
            .from('.about-cta', { opacity: 0, y: 22 }, 0.85);
    });

    /* ----------------------------------------------------------------------
       Pinning needs settled layout. Recalculate once fonts and images land.
       ---------------------------------------------------------------------- */
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    window.addEventListener('load', () => ScrollTrigger.refresh());
})();
