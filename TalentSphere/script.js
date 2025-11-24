// TalentSphere - Interactive JavaScript

// Skeleton Loading Helper
function showSkeletonLoader(container, count = 3) {
    const skeletonHTML = `
        <div class="skeleton-card skeleton" style="margin-bottom: 16px;">
            <div class="skeleton-title skeleton"></div>
            <div class="skeleton-text skeleton"></div>
            <div class="skeleton-text skeleton" style="width: 80%;"></div>
        </div>
    `;
    if (container) {
        container.innerHTML = skeletonHTML.repeat(count);
    }
}

function hideSkeletonLoader(container, content) {
    if (container) {
        setTimeout(() => {
            container.innerHTML = content;
            container.classList.add('fade-in');
        }, 500);
    }
}

// Enhanced Micro-interactions
function addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

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
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', function () {
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
        tab.addEventListener('click', function () {
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
        checkbox.addEventListener('change', function () {
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
        item.addEventListener('click', function () {
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
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Portfolio item hover
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const overlay = this.querySelector('.thumbnail-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        item.addEventListener('mouseleave', function () {
            const overlay = this.querySelector('.thumbnail-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });

    // Search functionality
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Поиск"]');
    searchInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.borderColor = 'rgba(176, 0, 255, 0.5)';
            this.parentElement.style.boxShadow = '0 0 20px rgba(176, 0, 255, 0.2)';
        });
        input.addEventListener('blur', function () {
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

    // Mobile Messages - Contact List / Chat Toggle
    const mobileChatItems = document.querySelectorAll('.chat-item');
    const chatWindow = document.querySelector('.chat-window');
    const messagesContainer = document.querySelector('.messages-container');
    const backToContactsBtn = document.getElementById('backToContacts');

    if (mobileChatItems.length > 0 && chatWindow && window.innerWidth <= 768) {
        // При клике на контакт - открываем чат
        mobileChatItems.forEach(item => {
            item.addEventListener('click', () => {
                chatWindow.classList.add('active');
                if (messagesContainer) {
                    messagesContainer.classList.add('chat-active');
                }
            });
        });

        // Кнопка "Назад" - возвращаемся к списку
        if (backToContactsBtn) {
            backToContactsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                chatWindow.classList.remove('active');
                if (messagesContainer) {
                    messagesContainer.classList.remove('chat-active');
                }
            });
        }
    }

    // Dashboard/Pages Mobile Sidebar Toggle
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    const dashboardSidebar = document.getElementById('dashboardSidebar');
    const dashboardOverlay = document.getElementById('sidebarOverlay');

    if (mobileSidebarToggle && dashboardSidebar && dashboardOverlay) {
        mobileSidebarToggle.addEventListener('click', () => {
            dashboardSidebar.classList.toggle('active');
            dashboardOverlay.classList.toggle('active');
        });

        dashboardOverlay.addEventListener('click', () => {
            dashboardSidebar.classList.remove('active');
            dashboardOverlay.classList.remove('active');
        });

        // Close on nav item click
        dashboardSidebar.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                dashboardSidebar.classList.remove('active');
                dashboardOverlay.classList.remove('active');
            });
        });
    }

    // Sidebar toggle for messages page (separate from main mobile menu)
    const sidebarToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebarToggle && sidebar && sidebarOverlay) {
        // Toggle sidebar
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        });

        // Close sidebar when clicking overlay
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });

        // Close sidebar when clicking nav item
        const navItems = sidebar.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            });
        });
    }

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

// Interactive Video Gallery Logic
document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.getElementById('closeModal');
    const videoPlayer = videoModal ? videoModal.querySelector('video') : null;

    // Main Preview Elements
    const mainPreview = document.querySelector('.video-placeholder');
    const mainImage = document.querySelector('.main-thumb');
    const mainTitle = document.querySelector('.video-title');
    const mainAuthor = document.querySelector('.video-author');

    // Thumbnails
    const thumbnails = document.querySelectorAll('.video-thumbnail-item');

    // 1. Hover Interaction (Switch Main Video)
    if (thumbnails.length > 0 && mainPreview) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('mouseenter', () => {
                // Update active state
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');

                // Get data from hovered thumbnail
                const videoSrc = thumb.getAttribute('data-video-src');
                const imageSrc = thumb.getAttribute('data-image');
                const title = thumb.getAttribute('data-title');
                const author = thumb.getAttribute('data-author');

                // Update Main Preview
                if (mainPreview) mainPreview.setAttribute('data-video-src', videoSrc);
                if (mainImage) mainImage.src = imageSrc;
                if (mainTitle) mainTitle.textContent = title;
                if (mainAuthor) mainAuthor.textContent = author;
            });
        });
    }

    // 2. Modal Logic (Click Main Video)
    if (videoModal && videoPlayer && mainPreview) {
        // Open Modal
        mainPreview.addEventListener('click', () => {
            const videoSrc = mainPreview.getAttribute('data-video-src');
            if (videoSrc) {
                videoPlayer.src = videoSrc;
                videoModal.classList.add('active');
                videoPlayer.play();
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });

        // Close Modal Function
        const closeVideoModal = () => {
            videoModal.classList.remove('active');
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
            videoPlayer.src = ''; // Clear source
            document.body.style.overflow = ''; // Restore scrolling
        };

        // Close on button click
        if (closeModal) closeModal.addEventListener('click', closeVideoModal);

        // Close on click outside
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
    }
});

// Mobile Course Navigation Logic
document.addEventListener('DOMContentLoaded', () => {
    const courseNavToggle = document.getElementById('courseNavToggle');
    const courseNav = document.getElementById('courseNav');
    const courseNavOverlay = document.getElementById('courseNavOverlay');
    const courseNavClose = document.getElementById('courseNavClose');

    if (courseNavToggle && courseNav && courseNavOverlay) {
        const openNav = () => {
            courseNav.classList.add('active');
            courseNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeNav = () => {
            courseNav.classList.remove('active');
            courseNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        courseNavToggle.addEventListener('click', openNav);
        if (courseNavClose) courseNavClose.addEventListener('click', closeNav);
        courseNavOverlay.addEventListener('click', closeNav);
    }
});
