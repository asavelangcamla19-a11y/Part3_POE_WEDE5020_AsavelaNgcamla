/**
 * lightbox.js - Image popup modal for Home Page images
 */

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('main img, .lightbox-img');

    if (images.length > 0) {
        // Create Lightbox Container Overlay Dynamically
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.id = 'lightbox-overlay';
        lightboxOverlay.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            z-index: 9999;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        `;

        const lightboxImg = document.createElement('img');
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 85vh;
            border-radius: 8px;
            box-shadow: 0 5px 25px rgba(0,0,0,0.5);
            cursor: default;
        `;

        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 40px;
            color: #fff;
            cursor: pointer;
            font-weight: bold;
        `;

        lightboxOverlay.appendChild(lightboxImg);
        lightboxOverlay.appendChild(closeBtn);
        document.body.appendChild(lightboxOverlay);

        // Open Lightbox on image click
        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxOverlay.style.display = 'flex';
            });
        });

        // Close functions
        const closeLightbox = () => {
            lightboxOverlay.style.display = 'none';
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });

        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }
});