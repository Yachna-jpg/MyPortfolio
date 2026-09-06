document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle ---
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if(themeToggleBtn) themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i data-lucide="moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
            }
            if(window.lucide) {
                window.lucide.createIcons({ attrs: { class: "lucide lucide-icon" } });
            }
        });
    }

    // --- Navbar Blur on Scroll ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Active Link Highlighting ---
    const sections = document.querySelectorAll('section');
    const allLinks = document.querySelectorAll('.nav-link, .mobile-link');

    window.addEventListener('scroll', () => {
        let current = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - window.innerHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        allLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // --- Stats Counter Animation ---
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false;

    function countUp() {
        statNumbers.forEach(number => {
            const target = +number.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    number.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    number.innerText = target + (target > 500 ? '+' : '');
                }
            };
            updateCounter();
        });
    }

    if(statsSection) {
        window.addEventListener('scroll', () => {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && !started) {
                started = true;
                countUp();
            }
        });
    }

    // --- Mouse Glow Effect on Skills Cards ---
    document.getElementById("skills").onmousemove = e => {
        for(const card of document.getElementsByClassName("skill-category-card")) {
            const rect = card.getBoundingClientRect(),
                  x = e.clientX - rect.left,
                  y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    }

    // --- Magnetic Buttons Effect ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseout', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // --- Certifications Scroll Animation ---
    const certSection = document.getElementById('certifications');
    if (certSection) {
        const certObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    certObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        certObserver.observe(certSection);
    }

    // --- Resume Modal Logic ---
    const resumeModal = document.getElementById('resumeModal');
    const openResumeModalBtn = document.getElementById('openResumeModal');
    const closeResumeModalBtn = document.getElementById('closeResumeModal');

    if (openResumeModalBtn && resumeModal && closeResumeModalBtn) {
        openResumeModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Render Lucide icons in case the modal icon needs rendering
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });

        closeResumeModalBtn.addEventListener('click', () => {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on clicking outside the modal content
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    /* ==========================================================================
       GET IN TOUCH - CONTACT SECTION LOGIC
       ========================================================================== */
       
    // 1. EmailJS Configuration
    const EMAIL_CONFIG = {
        publicKey: "Ts153Lp7EkjbyTjEz", // Replace with your actual EmailJS Public Key
        serviceId: "service_6ic72qc", // Replace with your actual EmailJS Service ID
        templateId: "template_2skmrrz" // Replace with your actual EmailJS Template ID
    };

    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAIL_CONFIG.publicKey });
    }

    // Form Submission Logic
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate simple
            const name = document.getElementById('from_name').value.trim();
            const email = document.getElementById('from_email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                return;
            }

            // Loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
            submitBtn.disabled = true;
            formStatus.innerHTML = '';
            formStatus.className = 'form-status';

            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };

            emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, templateParams)
                .then(() => {
                    // Success state
                    submitBtn.innerHTML = '<span class="btn-text">Message Sent ✓</span>';
                    formStatus.innerHTML = 'Thanks! Your message has been sent successfully.';
                    formStatus.className = 'form-status status-success';
                    
                    // Smooth GSAP reveal for success
                    if(typeof gsap !== 'undefined') {
                        gsap.fromTo(formStatus, {opacity: 0, y: 10}, {opacity: 1, y: 0, duration: 0.5});
                    }
                    
                    contactForm.reset();

                    // Reset button after a few seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, (error) => {
                    // Error state
                    console.error('EmailJS Error:', error);
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    formStatus.innerHTML = 'Something went wrong. Please try again.';
                    formStatus.className = 'form-status status-error';
                    
                    if(typeof gsap !== 'undefined') {
                        gsap.fromTo(formStatus, {opacity: 0, x: -10}, {opacity: 1, x: 0, duration: 0.3, ease: "bounce.out"});
                    }
                });
        });
    }

    // 2. GSAP Animations & ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            // Floating profile image
            gsap.to('.floating-image', {
                y: -8,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // ScrollTrigger reveal animations
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#contact",
                    start: "top 80%",
                    once: true
                }
            });

            tl.fromTo('.contact-nav', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
              .fromTo('.hero-pill', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.4")
              .fromTo('.contact-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }, "-=0.3")
              .fromTo('.contact-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
              .fromTo('.profile-card', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
              .fromTo('.form-card', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
              .fromTo('.contact-row', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.4")
              .fromTo('.social-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.4")
              .fromTo('.input-group', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.6");
             // 3D Tilt Effect
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            if (!isTouchDevice) {
                const tiltCards = document.querySelectorAll('.tilt-card');
                tiltCards.forEach(card => {
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        
                        const rotateX = ((y - centerY) / centerY) * -3;
                        const rotateY = ((x - centerX) / centerX) * 3;
                        
                        gsap.to(card, {
                            rotateX: rotateX,
                            rotateY: rotateY,
                            transformPerspective: 1000,
                            ease: "power1.out",
                            duration: 0.5
                        });
                    });
                    
                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            rotateX: 0,
                            rotateY: 0,
                            ease: "power3.out",
                            duration: 0.8
                        });
                    });
                });
            }
        }
    }

    // 3. Canvas Particles
    const canvas = document.getElementById('contact-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 40 : 80;
        
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                // Randomly assign pink or cyan/blue
                this.color = Math.random() > 0.5 ? 'rgba(255, 20, 147, 0.4)' : 'rgba(0, 255, 255, 0.3)';
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        const animateParticles = () => {
            if (!prefersReducedMotion) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                requestAnimationFrame(animateParticles);
            }
        };
        
        animateParticles();
    }

    // 4. Copy to Clipboard
    const copyableRows = document.querySelectorAll('.copyable');
    copyableRows.forEach(row => {
        row.addEventListener('click', () => {
            const textToCopy = row.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const icon = row.querySelector('.copy-icon');
                    if (icon && window.lucide) {
                        const originalIcon = icon.getAttribute('data-lucide');
                        icon.setAttribute('data-lucide', 'check');
                        window.lucide.createIcons();
                        icon.style.color = '#00ff88';
                        
                        setTimeout(() => {
                            icon.setAttribute('data-lucide', originalIcon);
                            window.lucide.createIcons();
                            icon.style.color = '';
                        }, 1300);
                    }
                });
            }
        });
    });

    // 5. Custom Cursor Glow
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);
        
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }


});
