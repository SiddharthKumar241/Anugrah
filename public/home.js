$(document).ready(function () {
    checkAuth();
    $("#noticePopup").addClass("active");
    function closeAllPopups() {
        $(".popup").removeClass("active");
    }

    $(".logup-btn").click(function () {
        closeAllPopups();
        $("#logupPopup").addClass("active");
    });

    $(".login-btn").click(function () {
        closeAllPopups();
        $("#loginPopup").addClass("active");
    });

    $(".about-btn").click(function () {
        closeAllPopups();
        $("#aboutPopup").addClass("active");
    });

    $(".motto-btn").click(function () {
        closeAllPopups();
        $("#mottoPopup").addClass("active");
    });

    $(".close-btn").click(function () {
        closeAllPopups();
    });

    $(window).click(function (event) {
        if ($(event.target).hasClass("popup")) {
            closeAllPopups();
        }
    });

    $(".title span").each(function (index) {
        $(this).css("animation-delay", (index * 0.1) + "s");
    });

    $("#logupForm").submit(function (event) {
        event.preventDefault();

        let name = $("input[name='name']").val().trim();
        let email = $("input[name='email']").val().trim();
        let username = $("input[name='username']").val().trim();
        let password = $("input[name='password']").val().trim();

        if (!name || !email || !username || !password) {
            alert("All fields are required.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        } else {
            if (!validatePassword(password)) {
                alert("Requires 6+ characters, one uppercase, one number, and one special character");
                return;
            }
        }

        if (!validateName(name)) {
            alert("Enter a valid name(Only Strings Patterns Allowed)");
            return;
        }

        if (!validateUsername(username)) {
            alert("Username is Incorrect");
            return;
        }

        $.ajax({
            url: "/signup",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ name, email, username, password }),
            success: function (response) {
                alert(response);
                closeAllPopups();
            },
            error: function (xhr) {
                alert("Error: " + xhr.responseText);
            }
        });
    });

    $("#loginForm").submit(function (event) {
        event.preventDefault();

        let username = $("input[name='uusername']").val().trim();
        let password = $("input[name='upassword']").val().trim();

        if (!username || !password) {
            alert("Username and password are required.");
            return;
        }
        
        // else if(!validateUsername_login(username)){
        //      alert("Usrname formaat is Wrong");
        //      return;  
        //  }
        //  else if(!validatePassword_login(password)){
        //      alert("Requires 6+ characters, one uppercase, one number, and one special character");
        //      return;
        //  }
        $.ajax({
            url: "/login",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username, password }),
            success: function (response) {
                alert(response);
                localStorage.setItem("loggedIn", "true"); 
                checkAuth(); 
                closeAllPopups();
                $(".buttons").removeClass("buttons-act");
            },
            error: function (xhr) {
                alert("Error: " + xhr.responseText);
            }
        });
    });
    $(".logout-btn").click(function () {
        $.ajax({
            url: "/logout",
            method: "GET",
            success: function () {
                localStorage.removeItem("loggedIn");
                alert("You have been logged out.");
                location.reload(); // This will call checkAuth again
            },
            error: function () {
                alert("Logout failed");
            }
        });
    });
    
    
    function validateName(name) {
        let namePattern = /^[A-Za-z]+$/;
        return name.trim().length >= 3 && namePattern.test(name);
    }

    $.ajax({
        url: "/user-location",
        method: "GET",
        success: function (data) {
            // If this succeeds, session exists
            localStorage.setItem("loggedIn", "true");
            checkAuth();
        },
        error: function (err) {
            // Session doesn't exist
            localStorage.removeItem("loggedIn");
            checkAuth();
        }
    });
    
    function checkAuth() {
        fetch("/check-session")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log("Session Check Response:", data);
                if (data.loggedIn) {
                    $(".login-btn, .logup-btn").hide();
                    $(".logout-btn, .donor-btn, .receiver-btn").show();
                    $(".buttons").addClass("buttons-act").show(); // ✅ Show main Donate/Receive buttons
                } else {
                    $(".login-btn, .logup-btn").show();
                    $(".logout-btn, .donor-btn, .receiver-btn").hide();
                    $(".buttons").removeClass("buttons-act").hide(); // ✅ Hide them if not logged in
                }
            })
            .catch(err => {
                console.error("Error checking session:", err);
            });
    }

    
    function validateUsername(username) {
        let usernamePattern = /^[A-Za-z]+$/;
        return username.trim().length >= 3 && username.trim().length <= 15 && usernamePattern.test(username);
    }
    function validatePassword(password) {
        let passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordPattern.test(password);
    }
    function validateEmail(email) {
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    function validateUsername_login(username) {
        let usernamePattern = /^[A-Za-z]+$/;
        return username.trim().length >= 3 && username.trim().length <= 15 && usernamePattern.test(username);
    }

    function validatePassword_login(password) {
        let passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordPattern.test(password);
    }
});