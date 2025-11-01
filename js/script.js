// Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 6) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Header scroll effect
        function handleScroll() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Animate elements on scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.animate-on-scroll');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(element => {
                observer.observe(element);
            });
        }

        // Smooth scrolling for anchor links
        function smoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
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
        }

        // Set default dates for search form
        function setDefaultDates() {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const checkInInput = document.querySelector('input[type="date"]:first-of-type');
            const checkOutInput = document.querySelector('input[type="date"]:last-of-type');
            
            if (checkInInput && checkOutInput) {
                checkInInput.value = today.toISOString().split('T')[0];
                checkOutInput.value = tomorrow.toISOString().split('T')[0];
                checkInInput.min = today.toISOString().split('T')[0];
                checkOutInput.min = tomorrow.toISOString().split('T')[0];
            }
        }

        // Counter animation for stats
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.textContent.replace(/[^0-9.]/g, ''));
                        const duration = 2000;
                        const step = target / (duration / 16);
                        let current = 0;
                        
                        const updateCounter = () => {
                            current += step;
                            if (current < target) {
                                if (counter.textContent.includes('.')) {
                                    counter.textContent = current.toFixed(1) + (counter.textContent.includes('/5') ? '/5' : '');
                                } else if (counter.textContent.includes('M+')) {
                                    counter.textContent = (current / 1000000).toFixed(1) + 'M+';
                                } else if (counter.textContent.includes('K+')) {
                                    counter.textContent = (current / 1000).toFixed(0) + 'K+';
                                } else if (counter.textContent.includes('+')) {
                                    counter.textContent = Math.floor(current).toLocaleString() + '+';
                                } else {
                                    counter.textContent = Math.floor(current).toLocaleString();
                                }
                                requestAnimationFrame(updateCounter);
                            } else {
                                // Final value
                                counter.textContent = counter.textContent;
                            }
                        };
                        updateCounter();
                        observer.unobserve(counter);
                    }
                });
            });

            counters.forEach(counter => observer.observe(counter));
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            animateOnScroll();
            smoothScroll();
            setDefaultDates();
            animateCounters();
            
            // Add scroll event listener
            window.addEventListener('scroll', handleScroll);
            
            // Preload some images for better performance
            const imageUrls = [
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMF8xKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzBfMSIgeDE9IjAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMjAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM2NjdFRUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzY0QkEyIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+'
            ];
            
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        });

        // Add some interactive effects
        document.addEventListener('mousemove', function(e) {
            const particles = document.querySelectorAll('.particle');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            particles.forEach((particle, index) => {
                if (index % 5 === 0) { // Only affect every 5th particle for performance
                    const speed = 0.5;
                    const x = (mouseX - 0.5) * speed;
                    const y = (mouseY - 0.5) * speed;
                    particle.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
                }
            });
        });