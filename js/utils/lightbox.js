let currentImageIndex = 0;
let lightboxImages = [];

export function openLightbox(images, index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImages = images;
    currentImageIndex = index;

    updateLightbox();

    lightbox.style.display = 'flex';
}

function showPreviousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateLightbox();
    }
}

function showNextImage() {
    if (currentImageIndex < lightboxImages.length - 1) {
        currentImageIndex++;
        updateLightbox();
    }
}

function updateLightbox() {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    const currentImage = lightboxImages[currentImageIndex];

    lightboxImg.src = currentImage.url;
    lightboxCaption.textContent = currentImage.text;
}

export function initializeLightbox() {
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevArrow = document.getElementById('lightbox-prev');
    const nextArrow = document.getElementById('lightbox-next');

    closeLightbox.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        lightbox.style.display = 'none';
    });

    prevArrow.addEventListener('click', showPreviousImage);
    nextArrow.addEventListener('click', showNextImage);

    // ✅ Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.style.display === 'flex') {
            switch (e.key) {
                case 'Escape':
                    lightbox.style.display = 'none';
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}
