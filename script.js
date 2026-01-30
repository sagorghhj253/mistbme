// Course data for CT-Mid Routine
const courseData = {
    'BME409': {
        code: 'BME 409',
        ct1: '08-12-2025',
        mid: '29-12-2025',
        ct2: '26-01-2026',
        ct3: '16-02-2026'
    },
    'BME407': {
        code: 'BME 407',
        ct1: '10-12-2025',
        mid: '31-12-2025',
        ct2: '28-01-2026',
        ct3: '18-02-2026'
    },
    'GEEM451': {
        code: 'GEEM 451',
        ct1: '15-12-2025',
        mid: '05-01-2026',
        ct2: '02-02-2026',
        ct3: '23-02-2026'
    },
    'BME441': {
        code: 'BME 441',
        ct1: '17-12-2025',
        mid: '07-01-2026',
        ct2: '04-02-2026',
        ct3: '25-02-2026'
    },
    'BME421': {
        code: 'BME 421',
        ct1: '22-12-2025',
        mid: '19-01-2026',
        ct2: '09-02-2026',
        ct3: '02-03-2026'
    },
    'GESL421': {
        code: 'GESL 421',
        ct1: '24-12-2025',
        mid: '21-01-2026',
        ct2: '11-02-2026',
        ct3: '04-03-2026'
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initRoutineControls();
    initCourseSelector();
    initHamburgerMenu();
    animateOnScroll();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');

            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show target page
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                    // Scroll to top smoothly
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Handle hash navigation
    if (window.location.hash) {
        const targetLink = document.querySelector(`[data-page="${window.location.hash.substring(1)}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
}

// Routine view controls
function initRoutineControls() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const allRoutine = document.getElementById('all-routine');
    const subjectRoutine = document.getElementById('subject-routine');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');

            // Update button states
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle views with animation
            if (view === 'all') {
                subjectRoutine.classList.remove('active');
                setTimeout(() => {
                    allRoutine.classList.add('active');
                }, 100);
            } else {
                allRoutine.classList.remove('active');
                setTimeout(() => {
                    subjectRoutine.classList.add('active');
                }, 100);
            }
        });
    });
}

// Course selector functionality
function initCourseSelector() {
    const courseSelect = document.getElementById('course-select');
    const courseDetails = document.getElementById('course-details');

    courseSelect.addEventListener('change', (e) => {
        const selectedCourse = e.target.value;

        if (selectedCourse === '') {
            courseDetails.innerHTML = '<p class="select-prompt">Please select a course to view its examination schedule</p>';
            return;
        }

        const course = courseData[selectedCourse];
        
        // Create animated schedule display
        courseDetails.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h3 style="font-size: 2.5rem; color: var(--accent); margin-bottom: 0.5rem; font-family: 'Cormorant Garamond', serif;">
                    ${course.code}
                </h3>
                <p style="color: var(--text-light);">Examination Schedule</p>
            </div>
            <div class="course-schedule">
                <div class="schedule-item" style="animation: fadeIn 0.5s ease 0.1s both;">
                    <div class="exam-type">CT-1</div>
                    <div class="exam-date">${course.ct1}</div>
                </div>
                <div class="schedule-item" style="animation: fadeIn 0.5s ease 0.2s both;">
                    <div class="exam-type">Mid Term</div>
                    <div class="exam-date">${course.mid}</div>
                </div>
                <div class="schedule-item" style="animation: fadeIn 0.5s ease 0.3s both;">
                    <div class="exam-type">CT-2</div>
                    <div class="exam-date">${course.ct2}</div>
                </div>
                <div class="schedule-item" style="animation: fadeIn 0.5s ease 0.4s both;">
                    <div class="exam-type">CT-3</div>
                    <div class="exam-date">${course.ct3}</div>
                </div>
            </div>
            <div style="margin-top: 3rem; text-align: center; padding: 2rem; background: rgba(193, 124, 74, 0.05); border-radius: 12px; animation: fadeIn 0.5s ease 0.5s both;">
                <p style="color: var(--text-light); margin-bottom: 1rem; font-size: 0.95rem;">📚 Access course materials and resources</p>
                <a href="https://drive.google.com/drive/folders/1BwB6LH9x4-Ymq3TPD23Juo9u8T9jkInd" target="_blank" 
                   style="display: inline-flex; align-items: center; gap: 0.75rem; padding: 0.9rem 2rem; background: var(--accent); color: white; text-decoration: none; border-radius: 50px; font-weight: 600; transition: all 0.3s ease; border: 2px solid var(--accent);"
                   onmouseover="this.style.background='transparent'; this.style.color='var(--accent)';"
                   onmouseout="this.style.background='var(--accent)'; this.style.color='white';">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 12L3 7L4.4 5.6L7 8.2V0H9V8.2L11.6 5.6L13 7L8 12Z"/>
                        <path d="M0 14H16V16H0V14Z"/>
                    </svg>
                    <span>Download Materials</span>
                </a>
            </div>
        `;
    });
}

// Hamburger menu
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Scroll animations
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and elements
    const animateElements = document.querySelectorAll('.welcome-card, .software-card, .cr-card, .gallery-item');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add smooth table row hover effect
document.addEventListener('DOMContentLoaded', () => {
    const tableRows = document.querySelectorAll('.routine-table tbody tr, .class-routine-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Gallery item click handler (placeholder for future modal implementation)
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = item.getAttribute('data-index');
            console.log(`Gallery item ${index} clicked`);
            // You can add modal functionality here in the future
        });
    });
});

// Add loading animation for page transitions
function showLoadingState() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.classList.contains('active')) {
            page.style.opacity = '0';
            setTimeout(() => {
                page.style.opacity = '1';
            }, 100);
        }
    });
}

// Enhanced navigation with history API
function updateURL(page) {
    history.pushState({ page: page }, '', `#${page}`);
}

window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        const targetLink = document.querySelector(`[data-page="${e.state.page}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !this.classList.contains('nav-link')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add print functionality for tables
function printTable(tableId) {
    const table = document.getElementById(tableId);
    if (table) {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Table</title>');
        printWindow.document.write('<style>table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(table.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
}

// Add copy functionality for contact details
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary success message
        const message = document.createElement('div');
        message.textContent = 'Copied to clipboard!';
        message.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--accent);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(message);
        setTimeout(() => {
            message.remove();
        }, 2000);
    });
}

// Add click handlers for contact details
document.addEventListener('DOMContentLoaded', () => {
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const text = item.querySelector('span').textContent;
            copyToClipboard(text);
        });
    });
});

// Performance optimization: Lazy load images when gallery is visible
function lazyLoadGalleryImages() {
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const galleryItems = entry.target.querySelectorAll('.gallery-item');
                galleryItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 100);
                });
                galleryObserver.unobserve(entry.target);
            }
        });
    });

    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        galleryObserver.observe(gallerySection);
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadGalleryImages);

// Add search functionality for tables (future enhancement)
function searchTable(inputId, tableId) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    
    if (input && table) {
        input.addEventListener('keyup', function() {
            const filter = this.value.toUpperCase();
            const rows = table.getElementsByTagName('tr');
            
            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName('td');
                let found = false;
                
                for (let j = 0; j < cells.length; j++) {
                    const cell = cells[j];
                    if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
                        found = true;
                        break;
                    }
                }
                
                rows[i].style.display = found ? '' : 'none';
            }
        });
    }
}

// Add theme preference (light/dark mode toggle - for future enhancement)
function initThemeToggle() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
}

// Export functions for potential external use
window.BMEWebsite = {
    printTable,
    copyToClipboard,
    searchTable,
    courseData
};

console.log('BME Department Website Loaded Successfully! 🎓');
