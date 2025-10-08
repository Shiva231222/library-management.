// Old way: Data is hardcoded
// const studentsData = { "Shiva Nand Yadav": [], ... };

// New way: Fetch data from the server (e.g., using fetch API)
function loadInitialData() {
    fetch('your_backend_script.php?action=get_all_records') // Replace with your actual backend endpoint
        .then(response => response.json())
        .then(data => {
            // Populate studentsData and studentSelect from the database data
            // Then call showStudentDetails() for the selected student
            // For a complete solution, you'd integrate the fetched data here.
        })
        .catch(error => console.error('Error loading data:', error));
}

// Call this when the page loads
window.onload = loadInitialData;
