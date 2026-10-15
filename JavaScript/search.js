document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("site-search");
    if (!searchInput) return;

    // Create the pop-up results container dynamically if it doesn't exist
    let resultsPopup = document.getElementById("search-results-popup");
    if (!resultsPopup) {
        resultsPopup = document.createElement("div");
        resultsPopup.id = "search-results-popup";
        resultsPopup.style.position = "absolute";
        resultsPopup.style.background = "#fff";
        resultsPopup.style.color = "#333";
        resultsPopup.style.border = "1px solid #ccc";
        resultsPopup.style.borderRadius = "4px";
        resultsPopup.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
        resultsPopup.style.maxHeight = "250px";
        resultsPopup.style.overflowY = "auto";
        resultsPopup.style.zIndex = "1000";
        resultsPopup.style.display = "none";
        
        const searchContainer = searchInput.closest(".search-container") || searchInput.parentElement;
        searchContainer.style.position = "relative";
        searchContainer.appendChild(resultsPopup);
    }

    // Master list of site pages and their searchable content/keywords
    const siteContent = [
        { title: "Home Page", url: "../index.html", text: "marine eco system conservation algoa bay gqeberha home welcome protect" },
        { title: "About Us", url: "about.html", text: "about the trust algoa bay marine conservation history mission vision team" },
        { title: "Services - Coastal & Beach Cleanups", url: "services.html", text: "coastal beach cleanups weekly cleanup drives gqeberha beaches plastic algoa bay" },
        { title: "Services - Wildlife Rehabilitation", url: "services.html", text: "wildlife rehabilitation support rescue care endangered african penguins marine fauna distress" },
        { title: "Services - Community Education", url: "services.html", text: "community education outreach educational talks interactive presentations ocean stewardship learners" },
        { title: "Enquiry - Volunteer & Tours", url: "enquiry.html", text: "enquiry volunteer sign up book guided tour donation info sign-up" },
        { title: "Contact Us", url: "contactus.html", text: "contact us phone email address marine drive summerstrand gqeberha terms conditions privacy policy callback" }
    ];

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase().trim();

        if (query === "") {
            resultsPopup.style.display = "none";
            resultsPopup.innerHTML = "";
            return;
        }

        // Filter pages that match the search query
        const matches = siteContent.filter(item => item.text.includes(query));

        // Populate and show the pop-up
        if (matches.length > 0) {
            let html = '<ul style="list-style: none; margin: 0; padding: 8px;">';
            matches.forEach(match => {
                html += `<li style="padding: 6px 8px; border-bottom: 1px solid #eee;">
                            <a href="${match.url}" style="text-decoration: none; color: #0056b3; font-size: 0.9rem; font-weight: 500; display: block;">
                                ${match.title}
                            </a>
                         </li>`;
            });
            html += '</ul>';
            resultsPopup.innerHTML = html;
            resultsPopup.style.display = "block";
        } else {
            resultsPopup.innerHTML = '<div style="padding: 10px; font-size: 0.9rem; color: #777;">No matching pages found</div>';
            resultsPopup.style.display = "block";
        }
    });

    // Hide pop-up when clicking outside
    document.addEventListener("click", function (e) {
        if (!searchInput.contains(e.target) && !resultsPopup.contains(e.target)) {
            resultsPopup.style.display = "none";
        }
    });
});