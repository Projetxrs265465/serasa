// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
});

// Back to Top Button
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Newsletter Form
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        // Simula envio do email
        alert('✅ Obrigado por se inscrever! Você receberá nossas dicas financeiras em breve.');
        this.querySelector('input[type="email"]').value = '';
    }
});

// Interest Calculator
function calculateInterest() {
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;
    const time = parseFloat(document.getElementById('time').value) || 0;
    
    if (principal <= 0 || rate <= 0 || time <= 0) {
        document.getElementById('result').innerHTML = 
            '<p style="color: #dc2626;">⚠️ Preencha todos os campos com valores válidos</p>';
        return;
    }
    
    // Cálculo de juros compostos
    const monthlyRate = rate / 100 / 12;
    const finalAmount = principal * Math.pow(1 + monthlyRate, time);
    const totalInterest = finalAmount - principal;
    
    document.getElementById('result').innerHTML = `
        <div>
            <p><strong>Valor Final:</strong> R$ ${finalAmount.toFixed(2).replace('.', ',')}</p>
            <p><strong>Juros Acumulados:</strong> R$ ${totalInterest.toFixed(2).replace('.', ',')}</p>
        </div>
    `;
}

// Social Share Functions
function shareOn(platform) {
    const title = document.title;
    const url = window.location.href;
    const text = "Aprenda como cuidar das suas finanças e evitar score negativo";
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Smooth Scrolling for Internal Links
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

// Reading Progress Bar
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #059669, #10b981);
        transition: width 0.1s ease;
        z-index: 1000;
        width: 0%;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const article = document.querySelector('.article-content');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        const progress = Math.min(
            Math.max((scrollTop - articleTop + windowHeight * 0.2) / articleHeight, 0),
            1
        );
        
        progressBar.style.width = (progress * 100) + '%';
    });
}

// Initialize progress bar
createProgressBar();

// Image Lazy Loading Enhancement
function enhanceImages() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize image enhancements
enhanceImages();

// Cookie Notice (Required for AdSense compliance)
function showCookieNotice() {
    const cookieNotice = document.createElement('div');
    cookieNotice.id = 'cookie-notice';
    cookieNotice.innerHTML = `
        <div style="background: #111827; color: white; padding: 1rem; position: fixed; bottom: 0; left: 0; right: 0; z-index: 1000; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <p style="margin: 0; font-size: 0.875rem;">Este site usa cookies para melhorar sua experiência. <a href="/politica-privacidade" style="color: #3b82f6;">Saiba mais</a></p>
            <button onclick="acceptCookies()" style="background: #059669; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.875rem;">Aceitar</button>
        </div>
    `;
    
    if (!localStorage.getItem('cookiesAccepted')) {
        document.body.appendChild(cookieNotice);
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    const notice = document.getElementById('cookie-notice');
    if (notice) {
        notice.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => notice.remove(), 300);
    }
}

// Show cookie notice on page load
showCookieNotice();

// Add slide down animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);