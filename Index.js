const form = document.getElementById('studentForm');

const nameInput = document.getElementById('name');
const jambInput = document.getElementById('jambRegNumber');
const matricInput = document.getElementById('matricNumber');
const sexInput = document.getElementById('sex');
const dobInput = document.getElementById('dateOfBirth');
const ageInput = document.getElementById('age');
const maritalInput = document.getElementById('maritalStatus');
const stateInput = document.getElementById('stateOfOrigin');
const modeInput = document.getElementById('modeOfEntry');
const durationInput = document.getElementById('durationOfCourse');
const phoneInput = document.getElementById('phoneNumber');

const error = document.getElementById('error');
const submitBtn = document.getElementById('submitBtn');
const loader = document.getElementById('loader');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    if (
        !nameInput.value.trim() ||
        !jambInput.value.trim() ||
        !matricInput.value.trim() ||
        !sexInput.value ||
        !dobInput.value ||
        !ageInput.value ||
        !maritalInput.value ||
        !stateInput.value.trim() ||
        !modeInput.value ||
        !durationInput.value ||
        !phoneInput.value.trim()
    ) {
        error.style.display = "block";
        error.textContent = "Please fill in all fields";

        setTimeout(() => error.style.display = "none", 3000);
        return;
    }

    // Disable button and show loader
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');
    loader.style.display = "inline-block";

    try {
        // Get token from localStorage (saved after admin login)
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameInput.value,
                jambRegNumber: jambInput.value,
                matricNumber: matricInput.value,
                sex: sexInput.value,
                dateOfBirth: dobInput.value,
                age: Number(ageInput.value),
                maritalStatus: maritalInput.value,
                stateOfOrigin: stateInput.value,
                modeOfEntry: modeInput.value,
                durationOfCourse: Number(durationInput.value),
                phoneNumber: phoneInput.value
            })
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            alert("Student registered successfully!");
            form.reset();
        } else {
            alert(result.message || "Registration failed");
        }

    } catch (err) {
        console.error(err);
        alert("Network error. Please try again.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('disabled');
        loader.style.display = "none";
    }
});
