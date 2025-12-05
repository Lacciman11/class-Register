// Function to fetch students from the API and render them in the table
async function fetchStudents() {
    try {
        // Retrieve the token from sessionStorage
        const token = sessionStorage.getItem('Token');
        
        // Check if token is present
        if (!token) {
            alert("You need to be authorized to open this page.");
            window.location.href = "./login.html"; // Redirect to login page
        }

        // Make a GET request to your server to fetch the students with the Authorization header
        const response = await fetch('http://localhost:5000/students', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include token in the Authorization header
            }
        });
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Failed to fetch students');
        }

        // Parse the JSON response
        const students = await response.json();

        // Get the table body element
        const tableBody = document.getElementById('studentTableBody');

        // Clear the table body before adding new rows
        tableBody.innerHTML = '';

        // Loop through the students and create table rows
        students.forEach(student => {
            const row = document.createElement('tr');

            // Create a cell for the student's name
            const nameCell = document.createElement('td');
            nameCell.textContent = student.studentName;
            row.appendChild(nameCell);

            // Create a cell for the student's registration number
            const regNumCell = document.createElement('td');
            regNumCell.textContent = student.regNum;
            row.appendChild(regNumCell);

            // Loop to create cells for Attendance/Assignment 1 to 10
            for (let i = 1; i <= 10; i++) {
                const attendanceCell = document.createElement('td');
                attendanceCell.textContent = '';  // Placeholder for attendance/assignment data
                row.appendChild(attendanceCell);
            }

            // Create a cell for the total attendance/assignment (Placeholder)
            const totalAttendanceCell = document.createElement('td');
            totalAttendanceCell.textContent = '';  // Placeholder for total attendance/assignment
            row.appendChild(totalAttendanceCell);

            // Create a cell for the test score (Placeholder)
            const testCell = document.createElement('td');
            testCell.textContent = '';  // Placeholder for test score
            row.appendChild(testCell);

            // Create a cell for the exam score (Placeholder)
            const examCell = document.createElement('td');
            examCell.textContent = '';  // Placeholder for exam score
            row.appendChild(examCell);

            // Create a cell for the grade (Placeholder)
            const gradeCell = document.createElement('td');
            gradeCell.textContent = '';  // Placeholder for grade
            row.appendChild(gradeCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching the students. Please try again.');
    }
}

// Call the function to fetch students when the page loads
window.onload = fetchStudents;

// Function to download the table as PDF in Landscape
function downloadTable() {
    // Get the table element
    const table = document.querySelector('table');
    
    // Set up the options for html2pdf
    const options = {
        filename: 'student_report.pdf',      // Set the filename of the generated PDF
        image: { type: 'jpeg', quality: 0.98 },  // Image quality for export
        html2canvas: { scale: 2 },           // Increase the scale for high resolution
        jsPDF: { orientation: 'landscape' },  // Set the orientation to landscape
        margin: [10, 10],                    // Set margins for the PDF content
        pagebreak: { mode: ['css', 'legacy'] }, // Handle page breaks
    };

    // Use html2pdf to convert the table to PDF
    html2pdf().from(table).set(options).save();
}

