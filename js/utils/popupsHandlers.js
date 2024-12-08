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
        const popupWidth = gridPopup.offsetWidth;

        const topPosition = rect.bottom + window.scrollY + 10;
        const leftPosition = Math.max(
            rect.left + rect.width / 2 - popupWidth / 2,
            10
        );

        const rightOverflow = leftPosition + popupWidth - window.innerWidth;
        const adjustedLeftPosition = rightOverflow > 0 ? leftPosition - rightOverflow - 10 : leftPosition;

        gridPopup.style.top = `${topPosition}px`;
        gridPopup.style.left = `${Math.max(adjustedLeftPosition, 10)}px`;
        gridPopup.classList.toggle('active');
    });

    if (closeGridPopup) {
        closeGridPopup.addEventListener('click', () => {
            gridPopup.classList.remove('active');
        });
    }

    document.addEventListener('click', (event) => {
        if (!gridPopup.contains(event.target) && !gridIcon.contains(event.target)) {
            gridPopup.classList.remove('active');
        }
    });
}