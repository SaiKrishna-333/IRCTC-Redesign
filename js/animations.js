document.addEventListener("DOMContentLoaded", function () {
    // Page fade-in effect
    gsap.from("body", {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });

    // Navbar animation
    gsap.from("nav", {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 0.2
    });

    // Buttons animation (All CTA buttons)
    gsap.from("button, .cta-btn", {
        scale: 0,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.2
    });

    // Headings animation
    gsap.from("h1, h2, h3", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        stagger: 0.2
    });

    // Fade-up animation for sections
    gsap.from("section", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.4,
        stagger: 0.3
    });

    // Interactive hover effect on buttons
    document.querySelectorAll("button, .cta-btn").forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            gsap.to(btn, { scale: 1.1, duration: 0.2 });
        });
        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, { scale: 1, duration: 0.2 });
        });
    });

    // Smooth page transitions
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            let href = link.getAttribute("href");
            gsap.to("body", {
                opacity: 0,
                duration: 0.5,
                onComplete: () => (window.location.href = href)
            });
        });
    });
});