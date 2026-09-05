/* NEW FASHION TAILOR - Main JavaScript */
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Language Toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        // Check saved language preference
        const savedLang = localStorage.getItem('language') || 'en';
        if (savedLang === 'ne') {
            document.body.classList.add('lang-ne');
        }
        
        langToggle.addEventListener('click', function() {
            document.body.classList.toggle('lang-ne');
            const isNepali = document.body.classList.contains('lang-ne');
            localStorage.setItem('language', isNepali ? 'ne' : 'en');
            
            // Update all text elements
            document.querySelectorAll('[data-en]').forEach(el => {
                const lang = isNepali ? 'ne' : 'en';
                const text = el.getAttribute(`data-${lang}`);
                if (text) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = text;
                    } else {
                        el.textContent = text;
                    }
                }
            });
        });
        
        // Apply saved language on load
        if (savedLang === 'ne') {
            document.querySelectorAll('[data-en]').forEach(el => {
                const text = el.getAttribute('data-ne');
                if (text) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = text;
                    } else {
                        el.textContent = text;
                    }
                }
            });
        }
    }
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Counter Animation
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const blogCards = document.querySelectorAll('.blog-card-large');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Filter blog cards
            blogCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'grid';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = this.querySelector('#name');
            const phone = this.querySelector('#phone');
            const message = this.querySelector('#message');
            
            if (!name.value.trim()) {
                e.preventDefault();
                name.focus();
                showNotification('Please enter your name', 'error');
                return;
            }
            
            if (!phone.value.trim()) {
                e.preventDefault();
                phone.focus();
                showNotification('Please enter your phone number', 'error');
                return;
            }
            
            if (!message.value.trim()) {
                e.preventDefault();
                message.focus();
                showNotification('Please enter your message', 'error');
                return;
            }
            
            // Phone number validation (Nepal format)
            const phoneRegex = /^(98|97)\d{8}$/;
            if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
                e.preventDefault();
                phone.focus();
                showNotification('Please enter a valid Nepal phone number', 'error');
                return;
            }
        });
    }
    
    // Booking Form Validation
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            const name = this.querySelector('#name');
            const phone = this.querySelector('#phone');
            const service = this.querySelector('#service');
            const date = this.querySelector('#date');
            
            if (!name.value.trim()) {
                e.preventDefault();
                name.focus();
                showNotification('Please enter your name', 'error');
                return;
            }
            
            if (!phone.value.trim()) {
                e.preventDefault();
                phone.focus();
                showNotification('Please enter your phone number', 'error');
                return;
            }
            
            if (!service.value) {
                e.preventDefault();
                service.focus();
                showNotification('Please select a service', 'error');
                return;
            }
            
            if (!date.value) {
                e.preventDefault();
                date.focus();
                showNotification('Please select a date', 'error');
                return;
            }
        });
    }
    
    // Set minimum date for booking
    const dateInput = document.querySelector('#date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Notification System
    function showNotification(message, type) {
        const existing = document.querySelector('.flash-messages');
        if (existing) existing.remove();
        
        const container = document.createElement('div');
        container.className = 'flash-messages';
        
        const flash = document.createElement('div');
        flash.className = `flash flash-${type}`;
        flash.innerHTML = `
            ${message}
            <button class="flash-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        container.appendChild(flash);
        document.body.appendChild(container);
        
        setTimeout(() => {
            flash.remove();
        }, 5000);
    }
    
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .value-card, .team-card, .review-card, .blog-card, .payment-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
    
    // Fallback: show all elements after 2 seconds in case observer fails
    setTimeout(function() {
        revealElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 2000);
    
    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Lazy Load Images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Particles Effect for Hero (Simple)
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: linear-gradient(135deg, rgba(139,92,246,0.3), rgba(236,72,153,0.3));
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Rating Bar Animation
    const ratingBars = document.querySelectorAll('.bar-fill');
    if (ratingBars.length > 0) {
        const ratingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                    ratingObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        ratingBars.forEach(bar => ratingObserver.observe(bar));
    }
    
    // Preloader (optional)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});
