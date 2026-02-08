document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form from submitting the default way

    const password = document.getElementById("password").value;
    
    // Show error message if the password is empty
    if (!password) {
        document.getElementById("error").textContent = "Password cannot be empty";
        document.getElementById("error").style.display = "block";
        return;
    }
    
    // Hide the error message if password is filled
    document.getElementById("error").style.display = "none";

    // Send the POST request to the server
    try {
        const response = await fetch("https://classregisterserver.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Successfully logged in
            alert("Login successful!");
            console.log("Token:", data.token);

            // Save token to sessionStorage
            sessionStorage.setItem('Token', data.token);

            // Redirect to the dashboard or another page
            window.location.href = "./report.html"; // example of redirection
        } else {
            // Handle different error codes (e.g., 401 for Unauthorized)
            if (response.status === 401) {
                alert("Invalid password, please try again.");
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred. Please try again.");
    }
});
