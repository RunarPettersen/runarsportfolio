import { loadPortfolioIcons } from './utils/loadPortfolioIcons.js';
import { injectPopups } from './popups.js';
import { initializePopups } from './utils/popupsHandlers.js';

injectPopups();

initializePopups();

loadPortfolioIcons('.portfolio-icons', './json/portfolio.json');

document.querySelector('.buttons button[type="button"]').addEventListener('click', () => {
    alert("So do I! Let's be creative together! Contact me at runarpettersen77@gmail.com today!");
});