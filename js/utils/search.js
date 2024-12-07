async function fetchPortfolioData(jsonPath) {
    const response = await fetch(jsonPath);
    return await response.json();
}

function displayProjects(containerSelector, projects) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = '';

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('portfolio-card');

        projectCard.innerHTML = `
            <a href="./portfolio/portfolio-detail.html?id=${project.id}">
                <img src="${project.image[0]}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div>
                    <a href="${project.github}" target="_blank">GitHub</a> | 
                    <a href="${project.link}" target="_blank">Live Demo</a>
                </div>
            </a>
        `;

        container.appendChild(projectCard);
    });
}

export async function initializeSearch(searchFormSelector, containerSelector, jsonPath) {
    const searchForm = document.querySelector(searchFormSelector);
    const allProjects = await fetchPortfolioData(jsonPath);

    displayProjects(containerSelector, allProjects);

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const searchInput = searchForm.querySelector('input').value.toLowerCase();
        const filteredProjects = allProjects.filter(project =>
            project.title.toLowerCase().includes(searchInput) ||
            project.description.toLowerCase().includes(searchInput)
        );

        displayProjects(containerSelector, filteredProjects);
    });
}
