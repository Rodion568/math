const BURGER = document.querySelector('.burger');
const NAVLINKS = document.querySelector('.nav-links');

BURGER.addEventListener('click', () => {
    NAVLINKS.classList.toggle('active');
    BURGER.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        NAVLINKS.classList.remove('active');
        BURGER.classList.remove('active');
    });
});

