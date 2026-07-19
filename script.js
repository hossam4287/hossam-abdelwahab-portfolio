// ==========================================================================
// TYPING EFFECT
// ==========================================================================
const typingText = document.querySelector('.typing-text');
const texts = [
    'Full Stack Developer',
    'React Specialist',
    'Laravel Enthusiast',
    'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// ==========================================================================
// MOBILE NAVIGATION
// ==========================================================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ==========================================================================
// ACTIVE NAVIGATION ON SCROLL
// ==========================================================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// ==========================================================================
// STATS COUNTER ANIMATION
// ==========================================================================
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };

        updateCounter();
    });
}

// ==========================================================================
// SKILL PROGRESS ANIMATION
// ==========================================================================
const progressBars = document.querySelectorAll('.progress-fill');

function animateProgress() {
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// ==========================================================================
// 3D TILT EFFECT - يعمل على الكمبيوتر والموبايل
// ==========================================================================
function initTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        // Desktop - Mouse Events
        element.addEventListener('mousemove', handleMouseTilt);
        element.addEventListener('mouseleave', resetTilt);
        
        // Mobile - Touch Events
        element.addEventListener('touchmove', handleTouchTilt);
        element.addEventListener('touchend', resetTilt);
        
        // Mobile - Device Orientation (اختياري - للأجهزة اللي تدعم gyroscope)
        if (window.DeviceOrientationEvent) {
            element.classList.add('supports-gyro');
        }
    });
}

// معالج حركة الماوس (Desktop)
function handleMouseTilt(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // تقليل قيمة الدوران لجعله أكثر واقعية
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((centerX - x) / centerX) * 5;
    
    applyTilt(element, rotateX, rotateY);
}

// معالج اللمس (Mobile/Tablet)
function handleTouchTilt(e) {
    e.preventDefault(); // منع السكرول أثناء اللمس
    
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    
    // الحصول على أول نقطة لمس
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // حساب الدوران بناءً على موقع اللمس
    const rotateX = ((y - centerY) / centerY) * 8; // زيادة قليلة للموبايل
    const rotateY = ((centerX - x) / centerX) * 8;
    
    applyTilt(element, rotateX, rotateY);
}

// تطبيق التأثير 3D
function applyTilt(element, rotateX, rotateY) {
    element.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale3d(1.02, 1.02, 1.02)
    `;
    element.style.transition = 'transform 0.1s ease-out';
}

// إعادة تعيين التأثير
function resetTilt(e) {
    const element = e.currentTarget;
    element.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg) 
        scale3d(1, 1, 1)
    `;
    element.style.transition = 'transform 0.5s ease';
}

// ==========================================================================
// MOBILE 3D AUTO ANIMATION - تحريك تلقائي للموبايل
// ==========================================================================
function initMobile3DAnimation() {
    // التحقق من أن الجهاز موبايل
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        const animatedElements = document.querySelectorAll('[data-tilt]');
        
        animatedElements.forEach((element, index) => {
            // إضافة animation CSS مخصصة لكل عنصر
            const delay = index * 0.2;
            element.style.animation = `gentle3DFloat 4s ease-in-out ${delay}s infinite`;
        });
        
        // إضافة CSS Animation للموبايل
        addMobile3DKeyframes();
    }
}

// إضافة Keyframes للتحريك على الموبايل
function addMobile3DKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gentle3DFloat {
            0%, 100% {
                transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px);
            }
            25% {
                transform: perspective(1000px) rotateX(3deg) rotateY(3deg) translateZ(10px);
            }
            50% {
                transform: perspective(1000px) rotateX(-2deg) rotateY(-2deg) translateZ(5px);
            }
            75% {
                transform: perspective(1000px) rotateX(2deg) rotateY(-3deg) translateZ(8px);
            }
        }
        
        /* تأثير نبض خفيف للعناصر على الموبايل */
        @media (max-width: 768px) {
            [data-tilt]:hover,
            [data-tilt]:active {
                animation: mobilePulse 0.3s ease;
            }
        }
        
        @keyframes mobilePulse {
            0%, 100% {
                transform: perspective(1000px) scale3d(1, 1, 1);
            }
            50% {
                transform: perspective(1000px) scale3d(1.05, 1.05, 1.05);
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================================================
// DEVICE ORIENTATION (اختياري - للأجهزة المتقدمة)
// ==========================================================================
function initGyroscope() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && window.DeviceOrientationEvent) {
        // طلب إذن على iOS 13+
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            // يمكن إضافة زر لطلب الإذن
            // DeviceOrientationEvent.requestPermission()
        }
        
        let isGyroActive = false;
        
        window.addEventListener('deviceorientation', (e) => {
            if (!isGyroActive) return;
            
            const tiltElements = document.querySelectorAll('[data-tilt].supports-gyro');
            
            // الحصول على قيم الدوران
            const beta = e.beta;  // الميلان الأمامي/الخلفي (-180 إلى 180)
            const gamma = e.gamma; // الميلان اليسار/اليمين (-90 إلى 90)
            
            tiltElements.forEach(element => {
                // تقليل الحساسية
                const rotateX = (beta / 180) * 10;  // Max 10 degrees
                const rotateY = (gamma / 90) * 10;   // Max 10 degrees
                
                applyTilt(element, rotateX, rotateY);
            });
        });
    }
}

// ==========================================================================
// SCROLL REVEAL
// ==========================================================================
function reveal() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });

    // تفعيل عداد الإحصائيات
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const aboutTop = aboutSection.getBoundingClientRect().top;
        
        if (aboutTop < window.innerHeight - 200 && !statsAnimated) {
            animateStats();
            statsAnimated = true;
        }
    }

    // تفعيل أشرطة التقدم
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsTop = skillsSection.getBoundingClientRect().top;
        
        if (skillsTop < window.innerHeight - 200) {
            animateProgress();
        }
    }
}

window.addEventListener('scroll', reveal);
reveal();

// ==========================================================================
// CONTACT FORM
// ==========================================================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalHTML = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 2000);
    });
}

// ==========================================================================
// SMOOTH SCROLL
// ==========================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================================================
// PERFORMANCE OPTIMIZATION - تحسين الأداء
// ==========================================================================
// تأخير تحميل الصور
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ==========================================================================
// INITIALIZE - بدء التأثيرات
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // إضافة كلاس fade-in للعناصر
    const fadeElements = document.querySelectorAll(
        '.skill-card-3d, .project-card-3d, .stat-box-3d, .tool-item-3d'
    );
    fadeElements.forEach(el => el.classList.add('fade-in'));
    
    // تفعيل تأثير الميلان 3D (Desktop & Mobile)
    initTilt();
    
    // تفعيل التحريك التلقائي للموبايل
    initMobile3DAnimation();
    
    // تفعيل Gyroscope (اختياري)
    // initGyroscope();
    
    // تحسين الأداء
    lazyLoadImages();
    
    // رسائل الكونسول
    console.log('%c👋 Welcome!', 'color: #2c3e50; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 Portfolio by Hossam Abdelwahab', 'color: #3498db; font-size: 14px;');
    console.log('%c📱 Mobile 3D: Active', 'color: #27ae60; font-size: 12px;');
});

// ==========================================================================
// WINDOW RESIZE - إعادة حساب عند تغيير الحجم
// ==========================================================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // إعادة تفعيل التأثيرات بعد تغيير الحجم
        reveal();
    }, 250);
});

// ==========================================================================
// PAGE VISIBILITY - إيقاف التأثيرات عند إخفاء الصفحة
// ==========================================================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // إيقاف التأثيرات الثقيلة
        console.log('Page hidden - animations paused');
    } else {
        // إعادة تفعيل التأثيرات
        console.log('Page visible - animations resumed');
    }
});

// ==========================================================================
// TOUCH FEEDBACK - ردود فعل اللمس
// ==========================================================================
function addTouchFeedback() {
    const interactiveElements = document.querySelectorAll(
        'button, .btn, .social-link, .project-link, [data-tilt]'
    );
    
    interactiveElements.forEach(element => {
        // إضافة تأثير عند اللمس
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// تفعيل Touch Feedback
addTouchFeedback();
