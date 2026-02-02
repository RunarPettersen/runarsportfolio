import { loadPortfolioIcons } from './utils/loadPortfolioIcons.js';
import { injectPopups } from './popups.js';
import { initializePopups } from './utils/popupsHandlers.js';

injectPopups();

initializePopups();

loadPortfolioIcons('.portfolio-icons', './json/portfolio.json');

document.querySelector('.buttons button[type="button"]').addEventListener('click', () => {
    document.getElementById('creative-popup').classList.remove('hidden');
});

document.getElementById('close-creative-popup').addEventListener('click', () => {
    document.getElementById('creative-popup').classList.add('hidden');
});

window.addEventListener('click', (e) => {
    const popup = document.getElementById('creative-popup');
    if (e.target === popup) {
        popup.classList.add('hidden');
    }
});