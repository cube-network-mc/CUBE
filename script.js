// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles-container');
        this.particleTypes = ['sword', 'diamond', 'block'];
        this.maxParticles = 15;
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        const type = this.particleTypes[Math.floor(Math.random() * this.particleTypes.length)];
        
        particle.className = `particle ${type}`;
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        this.container.appendChild(particle);
        this.particles.push(particle);
        
        // Remove particle after animation and create new one
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                const index = this.particles.indexOf(particle);
                if (index > -1) {
                    this.particles.splice(index, 1);
                }
                this.createParticle();
            }
        }, 8000);
    }

    animate() {
        this.particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
                particle.style.top = '-20px';
                particle.style.left = Math.random() * window.innerWidth + 'px';
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Cursor Effects
class CursorEffects {
    constructor() {
        this.cursor = null;
        this.trail = [];
        this.init();
    }

    init() {
        this.createCursor();
        this.bindEvents();
    }

    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.innerHTML = '⚔️';
        document.body.appendChild(this.cursor);
        
        // Add cursor styles
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                width: 30px;
                height: 30px;
                pointer-events: none;
                z-index: 9999;
                font-size: 20px;
                transform: translate(-50%, -50%);
                transition: all 0.1s ease;
                mix-blend-mode: difference;
            }
            
            body {
                cursor: none;
            }
            
            .cursor-trail {
                position: fixed;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #00ffff, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                animation: trailFade 0.5s ease-out forwards;
            }
            
            @keyframes trailFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0); }
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            // Create trail effect
            if (Math.random() > 0.7) {
                this.createTrail(e.clientX, e.clientY);
            }
        });

        // Change cursor on hover
        document.querySelectorAll('button, a, .btn').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.innerHTML = '💎';
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.innerHTML = '⚔️';
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 500);
    }
}

// Music System
class MusicSystem {
    constructor() {
        this.isPlaying = false;
        this.audio = null;
        this.button = document.getElementById('music-btn');
        this.init();
    }

    init() {
        // Create audio element with Minecraft-style music (using a placeholder)
        this.audio = new Audio();
        this.audio.loop = true;
        this.audio.volume = 0.3;
        
        // Bind events
        this.button.addEventListener('click', () => this.toggle());
        
        // Update button state
        this.updateButton();
    }

    toggle() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.play();
        }
    }

    play() {
        // In a real implementation, you would load actual Minecraft music
        // For now, we'll just simulate the music state
        this.isPlaying = true;
        this.updateButton();
        
        // Show notification
        this.showNotification('🎵 Background music enabled');
    }

    stop() {
        this.isPlaying = false;
        this.updateButton();
        
        // Show notification
        this.showNotification('🔇 Background music disabled');
    }

    updateButton() {
        const icon = this.button.querySelector('.music-icon');
        if (this.isPlaying) {
            icon.textContent = '🔊';
            this.button.style.background = 'linear-gradient(45deg, #00ff88, #008844)';
        } else {
            icon.textContent = '🔇';
            this.button.style.background = 'linear-gradient(45deg, #8b00ff, #4b0082)';
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: #00ffff;
            padding: 1rem 2rem;
            border-radius: 8px;
            border: 2px solid #00ffff;
            z-index: 10000;
            font-family: 'Orbitron', monospace;
            font-weight: 600;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Bind navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Interactive Elements
class InteractiveElements {
    constructor() {
        this.init();
    }

    init() {
        this.setupPlayButton();
        this.setupHoverEffects();
        this.setupScrollAnimations();
        this.setupCopyFunction();
    }

    setupPlayButton() {
        const playBtn = document.getElementById('play-btn');
        const serverIP = document.getElementById('server-ip');
        
        if (playBtn && serverIP) {
            playBtn.addEventListener('click', () => {
                serverIP.classList.toggle('hidden');
                
                if (!serverIP.classList.contains('hidden')) {
                    // Add glowing effect
                    serverIP.style.animation = 'glow 1s ease-in-out';
                    
                    // Show notification
                    this.showNotification('📋 Server IP revealed! Click "Copy IP" to copy to clipboard.');
                }
            });
        }
    }

    setupHoverEffects() {
        // Add hover sound effect simulation
        document.querySelectorAll('.btn, .vote-btn, .rank-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                // Simulate hover sound with visual feedback
                element.style.filter = 'brightness(1.2)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.filter = 'brightness(1)';
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            observer.observe(section);
        });
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupCopyFunction() {
        window.copyIP = () => {
            const ipText = 'play.cubenetwork.fun';
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(ipText).then(() => {
                    this.showNotification('✅ Server IP copied to clipboard!');
                }).catch(() => {
                    this.fallbackCopy(ipText);
                });
            } else {
                this.fallbackCopy(ipText);
            }
        };
    }

    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification('✅ Server IP copied to clipboard!');
        } catch (err) {
            this.showNotification('❌ Failed to copy IP. Please copy manually.');
        }
        
        document.body.removeChild(textArea);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: #00ffff;
            padding: 1rem 2rem;
            border-radius: 8px;
            border: 2px solid #00ffff;
            z-index: 10000;
            font-family: 'Orbitron', monospace;
            font-weight: 600;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.createMobileMenu();
        this.bindEvents();
    }

    createMobileMenu() {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Add hamburger styles
        const style = document.createElement('style');
        style.textContent = `
            .hamburger {
                display: none;
                flex-direction: column;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
            }
            
            .hamburger span {
                width: 25px;
                height: 3px;
                background: #00ffff;
                margin: 3px 0;
                transition: 0.3s;
                border-radius: 2px;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
            
            @media (max-width: 768px) {
                .hamburger {
                    display: flex;
                }
                
                .nav-menu {
                    position: fixed;
                    left: -100%;
                    top: 70px;
                    flex-direction: column;
                    background-color: rgba(10, 10, 10, 0.95);
                    width: 100%;
                    text-align: center;
                    transition: 0.3s;
                    backdrop-filter: blur(10px);
                    border-bottom: 2px solid #00ffff;
                    padding: 2rem 0;
                }
                
                .nav-menu.active {
                    left: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Insert hamburger before music toggle
        const musicToggle = document.querySelector('.music-toggle');
        navbar.querySelector('.nav-container').insertBefore(hamburger, musicToggle);
        
        this.hamburger = hamburger;
        this.navMenu = navMenu;
    }

    bindEvents() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeAnimations();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeAnimations() {
        // Reduce animations on low-performance devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add('reduced-motion');
            
            const style = document.createElement('style');
            style.textContent = `
                .reduced-motion * {
                    animation-duration: 0.1s !important;
                    transition-duration: 0.1s !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all systems
    new ParticleSystem();
    new CursorEffects();
    new MusicSystem();
    new SmoothScroll();
    new InteractiveElements();
    new MobileNavigation();
    new PerformanceOptimizer();
    
    // Add loading animation
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="
            font-family: 'Press Start 2P', monospace;
            color: #00ffff;
            font-size: 2rem;
            text-align: center;
            animation: glow 1s ease-in-out infinite alternate;
        ">
            <div style="margin-bottom: 1rem;">⚡ CUBE NETWORK ⚡</div>
            <div style="font-size: 1rem; color: #cccccc;">Loading your adventure...</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 1000);
    });
    
    // Show welcome message
    setTimeout(() => {
        const welcome = document.createElement('div');
        welcome.textContent = '🎮 Welcome to Cube Network! Scroll down to explore.';
        welcome.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: #00ffff;
            padding: 1rem 2rem;
            border-radius: 8px;
            border: 2px solid #00ffff;
            z-index: 10000;
            font-family: 'Orbitron', monospace;
            font-weight: 600;
            animation: slideIn 0.5s ease-out;
            text-align: center;
        `;
        
        document.body.appendChild(welcome);
        
        setTimeout(() => {
            welcome.style.animation = 'fadeOut 0.5s ease-in forwards';
            setTimeout(() => {
                if (welcome.parentNode) {
                    welcome.parentNode.removeChild(welcome);
                }
            }, 500);
        }, 5000);
    }, 2000);
});

// Add fade out animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);