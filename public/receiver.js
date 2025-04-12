function setLocation(position) {
    document.getElementById('latitude').value = position.coords.latitude;
    document.getElementById('longitude').value = position.coords.longitude;
    document.getElementById('locationStatus').textContent = "Location acquired.";
    console.log('Location acquired:', position.coords);
}

function handleLocationError(error) {
    document.getElementById('locationStatus').textContent = "Error retrieving location. Please allow location access and try again.";
    console.error("Geolocation error:", error);
}

function requestLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocation, handleLocationError);
    } else {
        document.getElementById('locationStatus').textContent = "Geolocation is not supported by this browser.";
    }
}

window.addEventListener('load', requestLocation);
document.getElementById('getLocationBtn').addEventListener('click', requestLocation);

$(document).ready(function () {
    $("#receiverForm").submit(function (event) {
        event.preventDefault();

        const lat = parseFloat(document.getElementById("latitude").value);
        const lon = parseFloat(document.getElementById("longitude").value);
        if (isNaN(lat) || isNaN(lon)) {
            alert("Invalid location. Please refresh your location.");
            return;
        }

        $.post("/receiver", $(this).serialize(), function (donations) {
            let html = "";
            if (donations.length === 0) {
                html = "<p>No donations found matching your criteria.</p>";
            } else {
                donations.forEach(function (donation) {
                    const km = (donation.distance / 1000).toFixed(2);
                    html += `<div class="donation-card">
                       <h3>${donation.item}</h3>
                       <h4>${donation.username}</h4 >
                       <p>${donation.email}</p>
                       <p>${donation.description}</p>
                       ${donation.image ? `<img src="${donation.image}" alt="${donation.item}">` : ""}
                     </div>`;
                });
            }
            $("#results").html(html);
            $(".donation-card").on("click", function () {
                $("#custom-alert-message").html(
                    "Your selection is recorded and sent to the donor. Come in 5 minutes to collect your parcel."
                );
                $("#custom-alert").fadeIn();
            });

            $("#close-alert").on("click", function () {
                $("#custom-alert").fadeOut();
            });
        }).fail(function (err) {
            console.error("Error in POST /receiver:", err);
        });
    });
});
function logout() {
    fetch("/logout")
        .then(res => {
            if (res.ok) {
                localStorage.removeItem("loggedIn");
                alert("You have been logged out.");
                window.location.href = "home.html";
            } else {
                alert("Logout failed.");
            }
        })
        .catch(err => {
            console.error("Logout error:", err);
            alert("An error occurred during logout.");
        });
}


function checkAuth() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
        $(".logout-btn").show();
        $(".login-btn, .logup-btn").hide();
    } else {
        $(".logout-btn").hide();
        $(".login-btn, .logup-btn").show();
    }
}
$(document).ready(function () {
    checkAuth();

    $(".logout-btn").click(function () {
        logout();
    });
});