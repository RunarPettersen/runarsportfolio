export function initializePopups() {
    const userAvatar = document.querySelector('.user-icon img');
    const userPopup = document.getElementById('user-popup');
    const closePopupIcon = document.getElementById('close-popup-icon');
    const closePopup = document.getElementById('close-popup');

    userAvatar.addEventListener('click', () => {
        const rect = userAvatar.getBoundingClientRect();
        const offset = 10;
        userPopup.style.top = `${rect.bottom + window.scrollY + offset}px`;
        userPopup.style.left = `${rect.left + rect.width / 2}px`;
        userPopup.classList.add('active');
    });

    closePopupIcon.addEventListener('click', () => {
        userPopup.classList.remove('active');
    });

    closePopup.addEventListener('click', () => {
        userPopup.classList.remove('active');
    });

    document.addEventListener('click', (event) => {
        if (!userPopup.contains(event.target) && event.target !== userAvatar) {
            userPopup.classList.remove('active');
        }
    });

    const gridIcon = document.querySelector('.grid-icon');
    const gridPopup = document.getElementById('grid-popup');
    const closeGridPopup = document.getElementById('close-grid-popup');

    gridIcon.addEventListener('click', () => {
        const rect = gridIcon.getBoundingClientRect();
        gridPopup.style.top = `${rect.bottom + window.scrollY + 10}px`;
        gridPopup.style.left = `${rect.left + rect.width / 2 - gridPopup.offsetWidth / 2}px`;
        gridPopup.classList.add('active');
    });

    closeGridPopup.addEventListener('click', () => {
        gridPopup.classList.remove('active');
    });

    document.addEventListener('click', (event) => {
        if (!gridPopup.contains(event.target) && event.target !== gridIcon) {
            gridPopup.classList.remove('active');
        }
    });
}