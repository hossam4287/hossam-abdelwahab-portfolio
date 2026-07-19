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
// 3D TILT EFFECT - تأثير الميلان 3D
// ==========================================================================
function initTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    
    // حساب موقع الماوس بالنسبة للعنصر
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // حساب مركز العنصر
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // حساب الميلان (تقليل القيمة لجعله أكثر واقعية)
    const rotateX = ((y - centerY) / centerY) * 5; // من 10 إلى 5
    const rotateY = ((centerX - x) / centerX) * 5; // من 10 إلى 5
    
    // تطبيق التأثير
    element.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale3d(1.02, 1.02, 1.02)
    `;
}

function resetTilt(e) {
    const element = e.currentTarget;
    element.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg) 
        scale3d(1, 1, 1)
    `;
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
    const aboutTop = aboutSection.getBoundingClientRect().top;
    
    if (aboutTop < window.innerHeight - 200 && !statsAnimated) {
        animateStats();
        statsAnimated = true;
    }

    // تفعيل أشرطة التقدم
    const skillsSection = document.querySelector('.skills');
    const skillsTop = skillsSection.getBoundingClientRect().top;
    
    if (skillsTop < window.innerHeight - 200) {
        animateProgress();
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
// INITIALIZE - بدء التأثيرات
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // إضافة كلاس fade-in للعناصر
    const fadeElements = document.querySelectorAll(
        '.skill-card-3d, .project-card-3d, .stat-box-3d, .tool-item-3d'
    );
    fadeElements.forEach(el => el.classList.add('fade-in'));
    
    // تفعيل تأثير الميلان 3D
    initTilt();
    
    // رسالة ترحيب
    console.log('%c👋 Welcome!', 'color: #2c3e50; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 Portfolio by Hossam Abdelwahab', 'color: #3498db; font-size: 14px;');
});
