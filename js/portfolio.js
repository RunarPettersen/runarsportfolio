import { injectPopups } from '../js/popups.js';
import { initializePopups } from '../js/utils/popupsHandlers.js';

async function loadPortfolioCards() {
    try {
        injectPopups();
        initializePopups();

        const response = await fetch('../json/portfolio.json');
        const portfolioItems = await response.json();

        const container = document.getElementById('portfolio-container');
        container.innerHTML = '';

        portfolioItems.forEach(item => {
            const card = document.createElement('a');
            card.href = `../portfolio-detail.html?id=${item.id}`;
            card.classList.add('portfolio-card');

            // Dynamisk oppretting av lenker basert på hva som finnes
            let linksHTML = '';
            if (item.github) {
                linksHTML += `<a href="${item.github}" target="_blank" class="button">GitHub</a>`;
            }
            if (item.link) {
                linksHTML += `<a href="${item.link}" target="_blank" class="button">Live Demo</a>`;
            }
            if (item.website) {
                linksHTML += `<a href="${item.website}" target="_blank" class="button">Website</a>`;
            }

            card.innerHTML = `
                <img src="../${item.logo}" alt="${item.title}">
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-description">${item.description}</p>
                </div>
                ${linksHTML ? `<div class="card-links">${linksHTML}</div>` : ''}
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

loadPortfolioCards();