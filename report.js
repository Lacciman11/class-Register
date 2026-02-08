// Fetch students and render in table
async function fetchStudents() {
    try {
        const token = sessionStorage.getItem('Token');
        if (!token) {
            alert("You need to be authorized to open this page.");
            window.location.href = "./login.html";
            return;
        }

        const response = await fetch('https://classregisterserver.onrender.com/students', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch students');

        const students = await response.json();
        const tableBody = document.getElementById('studentTableBody');
        tableBody.innerHTML = '';

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.jambRegNumber}</td>
                <td>${student.matricNumber}</td>
                <td>${student.sex}</td>
                <td>${new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td>${student.age}</td>
                <td>${student.maritalStatus}</td>
                <td>${student.stateOfOrigin}</td>
                <td>${student.modeOfEntry}</td>
                <td>${student.durationOfCourse} yrs</td>
                <td>${student.phoneNumber}</td>
            `;
            tableBody.appendChild(row);
        });

        // Save students globally so Excel export can use them
        window.allStudents = students;

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching the students. Please try again.');
    }
}

window.onload = fetchStudents;



// Download Excel with headings + table (PROPER METHOD)
function downloadWord() {

    if (typeof XLSX === "undefined") {
        alert("Excel library not loaded!");
        return;
    }

    if (!window.allStudents || window.allStudents.length === 0) {
        alert("No student data available.");
        return;
    }

    // HEADINGS
    const headings = [
        ["Michael Okpara University Of Agriculture"],
        ["College of Engineering and Engineering Technology"],
        ["Department of Computer Engineering"],
        ["2025/2026 Admission List"],
        ["Matriculation Registrar"],
        []
    ];

    // TABLE HEADER
    const tableHeader = [[
        "Name",
        "JAMB Reg No",
        "Matric No",
        "Sex",
        "Date of Birth",
        "Age",
        "Marital Status",
        "State of Origin",
        "Mode of Entry",
        "Course Duration",
        "Phone Number"
    ]];

    // STUDENT DATA
    const studentRows = window.allStudents.map(student => [
        student.name,
        student.jambRegNumber,
        student.matricNumber,
        student.sex,
        new Date(student.dateOfBirth).toLocaleDateString(),
        student.age,
        student.maritalStatus,
        student.stateOfOrigin,
        student.modeOfEntry,
        `${student.durationOfCourse} yrs`,
        student.phoneNumber
    ]);

    // COMBINE ALL DATA
    const worksheetData = [
        ...headings,
        ...tableHeader,
        ...studentRows
    ];

    // CREATE WORKSHEET
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);

    // CREATE WORKBOOK
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admission List");

    // DOWNLOAD EXCEL
    XLSX.writeFile(wb, "MOUAU_Admission_List.xlsx");
}
