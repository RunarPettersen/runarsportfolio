let currentStartIndex = 0;
const itemsPerPage = 8;
let portfolioItems = [];

export async function loadPortfolioIcons(containerSelector, jsonPath) {
    const iconsContainer = document.querySelector(containerSelector);

    try {
        const response = await fetch(jsonPath);
        portfolioItems = await response.json();

        renderIcons(containerSelector);
    } catch (error) {
        console.error("Failed to load portfolio icons:", error);
    }
}

function renderIcons(containerSelector) {
    const iconsContainer = document.querySelector(containerSelector);
    iconsContainer.innerHTML = '';

    const itemsToShow = portfolioItems.slice(currentStartIndex, currentStartIndex + itemsPerPage);

    itemsToShow.forEach(item => {
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('icon-item');
        iconContainer.innerHTML = `
            <a href="portfolio-detail.html?id=${item.id}" title="${item.title}" class="icon-circle">
                <img src="${item.icon}" alt="${item.title}">
            </a>
            <p class="icon-title">${item.title}</p>
        `;
        iconsContainer.appendChild(iconContainer);
    });

    // Always show plus icon to loop, if more than 8 items exist
    if (portfolioItems.length > itemsPerPage) {
        const plusContainer = document.createElement('div');
        plusContainer.classList.add('icon-item', 'plus-button');
        plusContainer.innerHTML = `
            <div class="icon-circle plus-circle">
                <i class="fa-solid fa-circle-plus fa-2x"></i>
            </div>
            <p class="icon-title">More</p>
        `;
        plusContainer.addEventListener('click', () => {
            currentStartIndex += itemsPerPage;
            if (currentStartIndex >= portfolioItems.length) {
                currentStartIndex = 0;
            }
            renderIcons(containerSelector);
        });
        iconsContainer.appendChild(plusContainer);
    }
}