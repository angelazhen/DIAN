// DIAN Landing Page - JavaScript Functionality
// Sticky Navigation, Mobile Menu, Exit-Intent Popup, FAQ Accordion, Form Handling

(function() {
    'use strict';

    // ============================================
    // Sticky Navigation
    // ============================================
    const navbar = document.getElementById('navbar');
    const topBanner = document.querySelector('.top-banner');
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Hide/show top banner based on scroll position
        if (currentScroll > 20) {
            if (topBanner) {
                topBanner.classList.add('hidden');
            }
            navbar.classList.add('scrolled');
        } else {
            if (topBanner) {
                topBanner.classList.remove('hidden');
            }
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hash
            if (href === '#') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                // Dynamic offset based on banner visibility
                const bannerHeight = topBanner && !topBanner.classList.contains('hidden') ? 40 : 0;
                const navbarHeight = 80;
                const offsetTop = target.offsetTop - bannerHeight - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // ============================================
    // Floating Reward Widget
    // ============================================
    const rewardWidgetButton = document.getElementById('rewardWidgetButton');
    const rewardWidget = document.getElementById('rewardWidget');
    const rewardWidgetClose = document.getElementById('rewardWidgetClose');

    function toggleRewardWidget() {
        if (rewardWidget) {
            rewardWidget.classList.toggle('active');
        }
    }

    function closeRewardWidget() {
        if (rewardWidget) {
            rewardWidget.classList.remove('active');
        }
    }

    // Open widget when button is clicked
    if (rewardWidgetButton) {
        rewardWidgetButton.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleRewardWidget();
        });
    }

    // Close widget when close button is clicked
    if (rewardWidgetClose) {
        rewardWidgetClose.addEventListener('click', closeRewardWidget);
    }

    // Close widget when clicking outside
    document.addEventListener('click', function(e) {
        if (rewardWidget && rewardWidget.classList.contains('active')) {
            if (!rewardWidget.contains(e.target) && !rewardWidgetButton.contains(e.target)) {
                closeRewardWidget();
            }
        }
    });

    // Close widget on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && rewardWidget && rewardWidget.classList.contains('active')) {
            closeRewardWidget();
        }
    });

    // Copy email functionality
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const rewardEmail = document.getElementById('rewardEmail');

    if (copyEmailBtn && rewardEmail) {
        copyEmailBtn.addEventListener('click', function() {
            const email = rewardEmail.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(email).then(function() {
                // Show success feedback
                copyEmailBtn.classList.add('copied');
                
                // Reset after 3 seconds
                setTimeout(function() {
                    copyEmailBtn.classList.remove('copied');
                }, 3000);
            }).catch(function(err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    copyEmailBtn.classList.add('copied');
                    setTimeout(function() {
                        copyEmailBtn.classList.remove('copied');
                    }, 3000);
                } catch (err) {
                    console.error('Failed to copy email:', err);
                    alert('Failed to copy email. Please copy manually: ' + email);
                }
                
                document.body.removeChild(textArea);
            });
        });
    }

    // ============================================
    // FAQ Accordion
    // ============================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            } else {
                faqItem.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ============================================
    // Animation on Scroll (Optional Enhancement)
    // ============================================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.testimonial-card');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1
            });

            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    };

    // Initialize animations when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animateOnScroll);
    } else {
        animateOnScroll();
    }

    // ============================================
    // Product Gallery Thumbnail Navigation
    // ============================================
    const galleryMainImg = document.getElementById('galleryMainImg');
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    const galleryNavLeft = document.getElementById('galleryNavLeft');
    const galleryNavRight = document.getElementById('galleryNavRight');
    const galleryOverlay = document.getElementById('galleryOverlay');
    
    if (galleryMainImg && galleryThumbnails) {
        const thumbnailButtons = galleryThumbnails.querySelectorAll('.thumbnail-btn');
        const images = Array.from(thumbnailButtons).map(btn => btn.getAttribute('data-image'));
        let currentImageIndex = 0;
        
        // Function to update main image
        function updateMainImage(index) {
            // Handle circular navigation - wrap around
            if (index < 0) {
                index = images.length - 1;
            } else if (index >= images.length) {
                index = 0;
            }
            
            currentImageIndex = index;
            galleryMainImg.src = images[index];
            
            // Update active thumbnail
            thumbnailButtons.forEach((btn, i) => {
                if (i === index) {
                    btn.classList.add('active');
                    // Scroll thumbnail into view if needed
                    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    
                    // Update overlay description
                    if (galleryOverlay) {
                        const flavorName = btn.getAttribute('data-name');
                        const nameElement = galleryOverlay.querySelector('.gallery-overlay-name');
                        
                        if (nameElement && flavorName) {
                            nameElement.textContent = flavorName;
                        }
                    }
                } else {
                    btn.classList.remove('active');
                }
            });
        }
        
        // Initialize
        updateMainImage(0);
        
        // Left arrow - previous image (loops to last if at first)
        if (galleryNavLeft) {
            galleryNavLeft.addEventListener('click', function() {
                updateMainImage(currentImageIndex - 1);
            });
        }
        
        // Right arrow - next image (loops to first if at last)
        if (galleryNavRight) {
            galleryNavRight.addEventListener('click', function() {
                updateMainImage(currentImageIndex + 1);
            });
        }
        
        // Thumbnail click handler
        thumbnailButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                updateMainImage(index);
            });
        });
        
        // Keyboard navigation for main image (with looping)
        if (galleryMainImg) {
            galleryMainImg.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    updateMainImage(currentImageIndex - 1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    updateMainImage(currentImageIndex + 1);
                }
            });
        }
        
        // Make main image focusable for keyboard navigation
        if (galleryMainImg) {
            galleryMainImg.setAttribute('tabindex', '0');
        }
    }

    // ============================================
    // Testimonials Carousel
    // ============================================
    const testimonialsCarousel = document.getElementById('testimonialsCarousel');
    const testimonialCarouselPrev = document.getElementById('testimonialCarouselPrev');
    const testimonialCarouselNext = document.getElementById('testimonialCarouselNext');
    
    if (testimonialsCarousel) {
        function getScrollAmount() {
            // Calculate width of 3 cards + gaps
            const testimonialCards = testimonialsCarousel.querySelectorAll('.testimonial-card');
            if (testimonialCards.length === 0) return 0;
            
            const gap = parseInt(getComputedStyle(testimonialsCarousel).gap) || 0;
            const cardWidth = testimonialCards[0].offsetWidth;
            // Scroll by 3 cards at a time
            return (cardWidth * 3) + (gap * 2);
        }
        
        function updateCarouselButtons() {
            const scrollLeft = testimonialsCarousel.scrollLeft;
            const maxScroll = testimonialsCarousel.scrollWidth - testimonialsCarousel.clientWidth;
            const threshold = 1; // Small threshold for floating point comparison
            
            if (testimonialCarouselPrev) {
                testimonialCarouselPrev.disabled = scrollLeft <= threshold;
            }
            if (testimonialCarouselNext) {
                testimonialCarouselNext.disabled = scrollLeft >= maxScroll - threshold;
            }
        }
        
        function scrollCarousel(direction) {
            const scrollAmount = getScrollAmount();
            if (scrollAmount === 0) return;
            
            const currentScroll = testimonialsCarousel.scrollLeft;
            const newScroll = currentScroll + (direction * scrollAmount);
            
            testimonialsCarousel.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });
        }
        
        if (testimonialCarouselPrev) {
            testimonialCarouselPrev.addEventListener('click', () => {
                scrollCarousel(-1);
            });
        }
        
        if (testimonialCarouselNext) {
            testimonialCarouselNext.addEventListener('click', () => {
                scrollCarousel(1);
            });
        }
        
        // Update button states on scroll
        testimonialsCarousel.addEventListener('scroll', updateCarouselButtons);
        
        // Initial button state (wait for layout)
        setTimeout(updateCarouselButtons, 100);
        
        // Update on resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCarouselButtons();
            }, 250);
        });
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialsCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialsCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleCarouselSwipe();
        });
        
        function handleCarouselSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next
                    scrollCarousel(1);
                } else {
                    // Swipe right - previous
                    scrollCarousel(-1);
                }
            }
        }
    }

    // ============================================
    // Review Gallery Lightbox
    // ============================================
    const reviewLightboxOverlay = document.getElementById('reviewLightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    // Collect all review images - all images that can be viewed in lightbox
    const reviewImages = [
        'images/review-gallery-1.jpg',
        'images/review-gallery-2.jpg',
        'images/review-gallery-3.jpg',
        'images/review-gallery-4.jpg'
    ];
    
    let currentLightboxIndex = 0;
    
    function openLightbox(index) {
        if (index < 0 || index >= reviewImages.length) return;
        
        currentLightboxIndex = index;
        lightboxImg.src = reviewImages[index];
        lightboxImg.alt = `Customer review photo ${index + 1}`;
        if (lightboxCounter) {
            lightboxCounter.textContent = `${index + 1} / ${reviewImages.length}`;
        }
        if (reviewLightboxOverlay) {
            reviewLightboxOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeLightbox() {
        if (reviewLightboxOverlay) {
            reviewLightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function showNextImage() {
        currentLightboxIndex = (currentLightboxIndex + 1) % reviewImages.length;
        openLightbox(currentLightboxIndex);
    }
    
    function showPrevImage() {
        currentLightboxIndex = (currentLightboxIndex - 1 + reviewImages.length) % reviewImages.length;
        openLightbox(currentLightboxIndex);
    }
    
    // Open lightbox when clicking testimonial images
    const testimonialImages = document.querySelectorAll('.testimonial-review-img');
    testimonialImages.forEach((img) => {
        img.addEventListener('click', function() {
            const galleryIndex = parseInt(this.getAttribute('data-gallery-index')) || 0;
            openLightbox(galleryIndex);
        });
    });
    
    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (reviewLightboxOverlay) {
        reviewLightboxOverlay.addEventListener('click', function(e) {
            if (e.target === reviewLightboxOverlay) {
                closeLightbox();
            }
        });
    }
    
    // Navigation buttons
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            showNextImage();
        });
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            showPrevImage();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (reviewLightboxOverlay && reviewLightboxOverlay.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                showPrevImage();
            }
        }
    });

})();
