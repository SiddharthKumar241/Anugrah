function injectStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
        /* Style for the selected category popup */
        .selected-category {
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    max-width: 350px;
    margin: auto;
    margin-bottom: 20px;
    position: relative;
    display: none; /* Initially hidden */
}

.selected-category.selected {
    display: block; /* Show the category when 'selected' class is added */
}

.selected-category::before {
    content: "Selected Category";
    display: block;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 15px;
    position: absolute;
    top: -25px; /* Moves the text above the box */
    left: 50%;
    transform: translateX(-50%); /* Centers it */
}

.selected-category h3 {
    color: #e74c3c;
    font-weight: bold;
    font-size: 1.4em;
}

.selected-category img {
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
}

/* Flexbox layout for available options */
#donation-results {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 20px;
    justify-content: center;
    position: relative;
}

#donation-results::before {
    content: "List of Options";
    display: block;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 15px;
    position: absolute;
    top: -30px; /* Moves the text above the donation cards */
    left: 50%;
    transform: translateX(-50%); /* Centers it */
}

/* Donation card styling */
.donation-card {
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
    width: 250px;
    text-align: center;
}

.donation-card img {
    width: 100%;
    border-radius: 8px;
    margin-top: 10px;
}
    `;
    document.head.appendChild(style);
}

function fetchDonations() {
    console.log("Fetching all donations...");
    injectStyles(); // Apply styles dynamically

    $.ajax({
        url: "/all-donations",
        type: "GET",
        dataType: "json",
        success: function (donations) {
            console.log("Received donations:", donations);
            let selectedHtml = "";
            let availableHtml = "";

            if (!Array.isArray(donations) || donations.length === 0) {
                availableHtml = "<p>No donations available.</p>";
            } else {
                donations.forEach(function (donation, index) {
                    let cardHtml = `
                        <div class="donation-card">
                            <h3>${donation.item}</h3>
                            <h4><strong>${donation.username}</strong></h4>
                            <p>${donation.email}</p>
                            <p>${donation.description}</p>
                            ${donation.image ? `<img src="${donation.image}" alt="${donation.item}">` : ""}
                        </div>`;

                    // First donation appears as a popup, others are flexbox
                    if (index === 0) {
                        selectedHtml = `<div class="selected-category">${cardHtml}</div>`;
                    } else {
                        availableHtml += cardHtml;
                    }
                });
            }

            // Update the page without modifying HTML structure
            $("#donation-results").html(selectedHtml + availableHtml);
        },
        error: function (err) {
            console.error("Error fetching donations:", err);
            $("#donation-results").html("<p>Error fetching donations. Try again later.</p>");
        }
    });
}

window.addEventListener("load", fetchDonations);
