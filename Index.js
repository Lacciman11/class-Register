const form = document.getElementsByTagName('form')[0];
const nameInput = document.getElementById('studentName');
const regNumInput = document.getElementById('regNum');
const error = document.getElementById('error');
const submitBtn = document.getElementById('submitBtn');
const loader = document.getElementById('loader');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check for empty inputs
    if (nameInput.value.trim() === '' || regNumInput.value.trim() === '') {
        error.style.display = "block";
        error.textContent = "Please fill in all fields";

        setTimeout(() => error.style.display = "none", 3000);
        return;
    }

    // Disable the button and show loader
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled'); // Add disabled styling
    loader.style.display = "inline-block"; // Show loader

    try {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                studentName: nameInput.value,
                regNum: regNumInput.value
            })
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            alert("Student registered successfully!");
            form.reset();
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while registering the student.");
    } finally {
        // Re-enable the button and hide the loader after API response
        submitBtn.disabled = false;
        submitBtn.classList.remove('disabled'); // Remove disabled styling
        loader.style.display = "none"; // Hide loader
    }
});
