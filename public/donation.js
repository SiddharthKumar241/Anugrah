$(document).ready(function () {
    $("#donationForm").submit(function (event) {
        event.preventDefault();

        var formData = new FormData(this);
        var responseMessage = $("#responseMessage");

        $.ajax({
            url: "/donor",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.success) {
                    responseMessage.css("color", "green").text(response.message);
                    $("#donationForm")[0].reset();
                } else {
                    responseMessage.css("color", "red").text(response.message);
                }
            },
            error: function () {
                responseMessage.css("color", "red").text("An unexpected error occurred.");
            }
        });
    });
});

function logout() {
    localStorage.removeItem("loggedIn");
    checkAuth();
    alert("You have been logged out.");
    window.location.href = "home.html";
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
