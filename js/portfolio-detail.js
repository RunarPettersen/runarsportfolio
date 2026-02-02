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

        /* ---------- META ---------- */

        document.title = `Runar Pettersen – ${project.title}`;

        const cleanDescription = project.description
            .replace(/<\/?[^>]+(>|$)/g, '')
            .slice(0, 160);

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = cleanDescription;

        /* ---------- CONTENT ---------- */

        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-description').innerHTML = project.description;

        /* ---------- IMAGES ---------- */

        const imagesContainer = document.getElementById('project-images');
        imagesContainer.innerHTML = '';

        project.image.forEach((imageObj, index) => {
            const imgWrapper = document.createElement('div');
            imgWrapper.classList.add('image-wrapper');

            const img = document.createElement('img');
            img.src = imageObj.url;
            img.alt = imageObj.text;
            img.classList.add('project-thumbnail');

            const caption = document.createElement('p');
            caption.textContent = imageObj.text;
            caption.classList.add('image-caption');

            imgWrapper.appendChild(img);
            imgWrapper.appendChild(caption);
            imagesContainer.appendChild(imgWrapper);

            img.addEventListener('click', () => {
                openLightbox(project.image, index);
            });
        });

        /* ---------- LINKS (ONLY IF PRESENT) ---------- */

        const githubBtn = document.getElementById('project-github');
        const liveBtn = document.getElementById('project-link');
        const websiteBtn = document.getElementById('project-website');

        if (project.github) {
            githubBtn.href = project.github;
            githubBtn.style.display = 'inline-block';
        } else {
            githubBtn.style.display = 'none';
        }

        if (project.link) {
            liveBtn.href = project.link;
            liveBtn.style.display = 'inline-block';
        } else {
            liveBtn.style.display = 'none';
        }

        if (project.website) {
            websiteBtn.href = project.website;
            websiteBtn.style.display = 'inline-block';
        } else {
            websiteBtn.style.display = 'none';
        }

    } catch (error) {
        console.error('Error loading portfolio data:', error);
        document.body.innerHTML = '<h1>Error loading project details</h1>';
    }
}

initializeLightbox();
loadPortfolioDetail();