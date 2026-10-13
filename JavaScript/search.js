/**
 * search.js - Live search / content filtering functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if services page or searchable cards exist
    const cards = document.querySelectorAll('.card, .info-card');
    
    if (cards.length > 0) {
        // Create an optional dynamic search input bar above services if desired, 
        // or hook into an existing search bar with id="siteSearch"
        const searchInput = document.getElementById('siteSearch');
        
        if (searchInput) {
            searchInput.addEventListener('input', function (e) {
                const query = e.target.value.toLowerCase().trim();

                cards.forEach(card => {
                    const textContent = card.textContent.toLowerCase();
                    if (textContent.includes(query)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    }
});