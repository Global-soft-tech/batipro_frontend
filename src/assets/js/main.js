// 1. Gestion du Scroll Navbar
const navbar = document.getElementById('navbar-fixed');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// 2. Gestion Menu Mobile
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');

menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('translate-x-0');
    
    if (isOpen) {
        mobileMenu.classList.replace('translate-x-0', 'translate-x-full');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Réactive le scroll
    } else {
        mobileMenu.classList.replace('translate-x-full', 'translate-x-0');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Désactive le scroll quand menu ouvert
    }
});

// Fermer le menu si on clique sur un lien
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.replace('translate-x-0', 'translate-x-full');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
});

// FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // 1. On ferme tous les autres items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = null;
        });

        // 2. Si l'item n'était pas actif, on l'ouvre
        if (!isActive) {
            item.classList.add('active');
            // On définit la hauteur max sur la hauteur réelle du contenu
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// Newsletter Submission
const newsletterForm = document.querySelector('footer form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = newsletterForm.querySelector('button');
        button.innerHTML = '✓';
        button.classList.replace('bg-brand-orange', 'bg-green-600');
        alert('Merci pour votre inscription !');
    });
}