import { openLightbox, initializeLightbox } from './utils/lightbox.js';
import { injectPopups } from './popups.js';
import { initializePopups } from './utils/popupsHandlers.js';

injectPopups();
initializePopups();

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

async function loadPortfolioDetail() {
    try {
        const response = await fetch('./json/portfolio.json');
        const portfolioItems = await response.json();

        const project = portfolioItems.find(item => item.id == projectId);

        if (!project) {
            document.body.innerHTML = '<h1>Project not found</h1>';
            return;
        }

        document.title = `Runar Pettersen's Portfolio - ${project.title}`;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute(
                'content',
                project.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 150)
            );
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = project.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 150);
            document.head.appendChild(meta);
        }

        document.getElementById('project-title').textContent = project.title;

        const imagesContainer = document.getElementById('project-images');
        project.image.forEach((imageObj, index) => {
            const imgWrapper = document.createElement('div');
            imgWrapper.classList.add('image-wrapper');

            const img = document.createElement('img');
            img.src = imageObj.url;
            img.alt = imageObj.text;
            img.classList.add('project-thumbnail');
            imgWrapper.appendChild(img);

            const caption = document.createElement('p');
            caption.textContent = imageObj.text;
            caption.classList.add('image-caption');
            imgWrapper.appendChild(caption);

            imagesContainer.appendChild(imgWrapper);

            img.addEventListener('click', () => {
                openLightbox(project.image, index);
            });
        });

        document.getElementById('project-description').innerHTML = project.description;
        document.getElementById('project-github').href = project.github;
        document.getElementById('project-link').href = project.link;
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        document.body.innerHTML = '<h1>Error loading project details</h1>';
    }
}

initializeLightbox();

loadPortfolioDetail();