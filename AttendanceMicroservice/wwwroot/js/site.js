document.addEventListener("DOMContentLoaded", fetchAttendance);



const addAttendance = async (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way

    const studentName = document.getElementById("studentName").value;
    const date = document.getElementById("date").value;
    const isPresent = document.getElementById("isPresent").checked;

    try {
        const response = await fetch("https://localhost:5001/api/Attendance/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: 0, studentName, date, isPresent })
        });

        if (!response.ok) {
            throw new Error("Failed to add attendance record.");
        }

        alert("Attendance record added successfully!");

        // Clear form fields after successful submission
        document.getElementById("studentName").value = "";
        document.getElementById("date").value = "";
        document.getElementById("isPresent").checked = false;

        // Fetch and refresh the attendance list
        fetchAttendance();
    } catch (error) {
        console.error(error);
        alert("An error occurred while adding the record.");
    }
};


const fetchAttendance = async () => {
    try {
        const response = await fetch("https://localhost:5001/api/Attendance/get");
        if (!response.ok) {
            throw new Error("Failed to fetch attendance records.");
        }

        const data = await response.json();
        updateAttendanceTable(data); // Update the table with fetched data
    } catch (error) {
        console.error(error);
        alert("An error occurred while fetching attendance records.");
    }
};


const updateAttendanceTable = (data) => {
    const tableBody = document.getElementById("attendanceTableBody");
    tableBody.innerHTML = ""; // Clear the existing rows

    data.forEach((record) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = record.id;

        const nameCell = document.createElement("td");
        nameCell.textContent = record.studentName;

        const dateCell = document.createElement("td");
        dateCell.textContent = record.date;

        const statusCell = document.createElement("td");
        statusCell.textContent = record.isPresent ? "Present" : "Absent";

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(dateCell);
        row.appendChild(statusCell);

        tableBody.appendChild(row);
    });
};
