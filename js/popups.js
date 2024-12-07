export function injectPopups() {
    const basePath = window.location.pathname.includes('/portfolio/') ? '../' : './';

    const popupsHTML = `
        <div class="grid-popup" id="grid-popup">
            <div class="popup-content">
                <i class="fas fa-times close-icon" id="close-grid-popup"></i>
                <div class="grid-icons">
                    <a href="mailto:runarpettersen77@gmail.com" target="_blank" title="Email"><i class="fas fa-envelope"></i></a>
                    <a href="tel:004741191047" target="_blank" title="Phone"><i class="fa-solid fa-phone"></i></a>
                    <a href="https://github.com/yourusername" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
                    <a href="https://facebook.com/yourprofile" target="_blank" title="Facebook"><i class="fab fa-facebook"></i></a>
                    <a href="https://instagram.com/yourprofile" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="https://linkedin.com/in/yourprofile" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>

        <div class="user-popup" id="user-popup">
            <div class="popup-content">
                <i class="fas fa-times close-icon" id="close-popup-icon"></i>
                <div class="user-icon-big">
                    <img src="${basePath}images/runar.png" alt="User Avatar" />
                </div>
                <h2>Runar Pettersen</h2>
                <p>Frontend Developer</p>
                <p>Passionate about creating intuitive, fun and cool web applications.</p>
                <p>Also do logo design, graphic design and illustrations</p>
                <p><strong>Skills:</strong> HTML, CSS, JavaScript, Figma, and more!</p>
                <p><strong>Tools:</strong> Figma, Visual Studio Code, Adobe Illustrator, Adobe Photoshop, Adobe InDesign, and Adobe Premier Pro!</p>
                <p><strong>Email:</strong> runarpettersen77@gmail.com</p>
                <button id="close-popup">Close</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupsHTML);
}