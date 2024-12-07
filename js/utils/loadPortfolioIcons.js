export async function loadPortfolioIcons(containerSelector, jsonPath) {
    const iconsContainer = document.querySelector(containerSelector);

    try {
        const response = await fetch(jsonPath);
        const portfolioItems = await response.json();

        iconsContainer.innerHTML = '';

        portfolioItems.forEach(item => {
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
    } catch (error) {
        console.error("Failed to load portfolio icons:", error);
    }
}