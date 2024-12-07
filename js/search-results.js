import { injectPopups } from './popups.js';
import { initializePopups } from './utils/popupsHandlers.js';

injectPopups();
initializePopups();

const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('query')?.toLowerCase() || '';

async function loadSearchResults() {
    try {
        const response = await fetch('./json/portfolio.json');
        const portfolioItems = await response.json();

        const resultsContainer = document.getElementById('search-results-container');
        resultsContainer.innerHTML = '';

        const filteredProjects = portfolioItems.filter(project =>
            project.title.toLowerCase().includes(searchQuery) ||
            project.description.toLowerCase().includes(searchQuery)
        );

        if (filteredProjects.length === 0) {
            resultsContainer.innerHTML = '<p>No results found for your query.</p>';
            return;
        }

        filteredProjects.forEach(project => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result');

            resultItem.innerHTML = `
                <div class="search-result-box">
                    <img src="${project.icon}">
                    <div class="search-result-headline">
                        <a href="./portfolio-detail.html?id=${project.id}" class="result-title">${project.title}</a>
                        <p class="result-link">${project.link}</p>
                    </div>
                </div>
                <p class="result-description">${project.description}</p>
            `;

            resultsContainer.appendChild(resultItem);
        });
    } catch (error) {
        console.error('Error loading search results:', error);
    }
}

loadSearchResults();
