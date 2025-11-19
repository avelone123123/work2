// TalentSphere - Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
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

    // Add hover effects to cards
    const cards = document.querySelectorAll('.glass-card, .marketplace-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate stats on scroll
    const animateStats = () => {
        const statValues = document.querySelectorAll('.stat-value, .stat-value-profile');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    
                    // Simple animation for demonstration
                    target.style.opacity = '0';
                    setTimeout(() => {
                        target.style.transition = 'opacity 0.5s ease';
                        target.style.opacity = '1';
                    }, 100);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statValues.forEach(stat => observer.observe(stat));
    };

    animateStats();

    // 3D Sphere rotation animation
    const sphere = document.querySelector('.sphere-3d');
    if (sphere) {
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            sphere.style.transform = `rotate(${rotation}deg)`;
        }, 50);
    }

    // Progress bars animation
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-fill, .skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1s ease';
                        bar.style.width = width;
                    }, 200);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
    };

    animateProgressBars();

    // Tab functionality
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Add smooth transition effect
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.filter-option input');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('.filter-option');
            if (this.checked) {
                label.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            } else {
                label.style.backgroundColor = 'transparent';
            }
        });
    });

    // Chat functionality
    const messageInput = document.querySelector('.message-input');
    const sendBtn = document.querySelector('.send-btn');
    const messagesArea = document.querySelector('.messages-area');

    if (sendBtn && messageInput) {
        const sendMessage = () => {
            const message = messageInput.value.trim();
            if (message) {
                // Create new message element
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message outgoing';
                messageDiv.innerHTML = `
                    <div class="message-content">
                        <div class="message-bubble glass-card">
                            <p>${message}</p>
                        </div>
                        <span class="message-time">${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                `;
                
                // Remove typing indicator if exists
                const typingIndicator = document.querySelector('.typing-indicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
                
                // Add message to chat
                if (messagesArea) {
                    messagesArea.appendChild(messageDiv);
                    messagesArea.scrollTop = messagesArea.scrollHeight;
                }
                
                // Clear input
                messageInput.value = '';
                
                // Simulate typing indicator after 2 seconds
                setTimeout(() => {
                    const typingDiv = document.createElement('div');
                    typingDiv.className = 'typing-indicator';
                    typingDiv.innerHTML = `
                        <div class="typing-avatar neon-glow-blue"></div>
                        <div class="typing-bubble glass-card">
                            <div class="typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    `;
                    if (messagesArea) {
                        messagesArea.appendChild(typingDiv);
                        messagesArea.scrollTop = messagesArea.scrollHeight;
                    }
                }, 2000);
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Chat list item click
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            chatItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Remove unread badge
            const badge = this.querySelector('.unread-badge');
            if (badge) {
                badge.style.opacity = '0';
                setTimeout(() => badge.remove(), 300);
            }
        });
    });

    // Apply button hover effects
    const applyButtons = document.querySelectorAll('.apply-btn, .neon-button');
    applyButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Portfolio item hover
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.thumbnail-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.thumbnail-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });

    // Search functionality
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Поиск"]');
    searchInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.borderColor = 'rgba(176, 0, 255, 0.5)';
            this.parentElement.style.boxShadow = '0 0 20px rgba(176, 0, 255, 0.2)';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            this.parentElement.style.boxShadow = 'none';
        });
    });

    // Notification animations
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        setInterval(() => {
            badge.style.transform = 'scale(1.1)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .marketplace-card, .stat-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    };

    animateOnScroll();

    // Loading animation for page transitions
    window.addEventListener('beforeunload', () => {
        document.body.style.opacity = '0.7';
    });

    // Console welcome message
    console.log('%c🚀 TalentSphere Platform', 'color: #b000ff; font-size: 24px; font-weight: bold;');
    console.log('%cНео-Brutalism + Glassmorphism + Cyber Neon Design', 'color: #00d4ff; font-size: 14px;');
    console.log('%cФриланс платформа будущего', 'color: #ff0080; font-size: 12px;');
});

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add glow effect on hover for neon elements
document.addEventListener('mousemove', (e) => {
    const neonElements = document.querySelectorAll('[class*="neon-glow"]');
    neonElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const intensity = 1 - (Math.abs(x - rect.width / 2) / rect.width + Math.abs(y - rect.height / 2) / rect.height) / 2;
            el.style.filter = `brightness(${1 + intensity * 0.3})`;
        } else {
            el.style.filter = 'brightness(1)';
        }
    });
});
