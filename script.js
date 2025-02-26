document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Hero parallax
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
        
        // Add animation classes when elements come into view
        const elements = document.querySelectorAll('.flavor-card, .extreme-card, .stat');
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // If element is in viewport
            if (position.top < window.innerHeight && position.bottom >= 0) {
                element.classList.add('animated');
            }
        });
    });
    
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the email input
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // Simulate form submission
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'SENDING...';
                
                // Mock API call
                setTimeout(() => {
                    submitButton.textContent = 'THANKS!';
                    emailInput.value = '';
                    
                    // Reset after delay
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    }, 2000);
                }, 1000);
            }
        });
    });
    
    // Location search
    const searchForm = document.querySelector('.location-search');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('input');
            const button = this.querySelector('button');
            
            if (input && input.value) {
                button.textContent = 'SEARCHING...';
                
                // Mock search
                setTimeout(() => {
                    button.textContent = 'SEARCH';
                    alert(`Found 12 retailers near ${input.value}! Check out our store locator for details.`);
                }, 1500);
            }
        });
    }
    
    // Dynamic bottle tilt effect
    const bottle = document.querySelector('.hero-image img');
    if (bottle) {
        document.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            bottle.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Reset transform when mouse leaves
        document.addEventListener('mouseleave', function() {
            bottle.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
});

// Add animation class to elements when scrolling into view
document.addEventListener('scroll', function() {
    const animateElements = document.querySelectorAll('.flavor-card, .stat, .extreme-card');
    
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (elementPosition.top < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
});

// Add lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without intersection observer
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// Add some excitement for the Summit Splash experience
console.log('%c SUMMIT SPLASH - EXTREME REFRESHMENT! ', 'background: #5cdb5c; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');