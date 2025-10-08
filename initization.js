// 📚 Master Library Records (all books in college) - KEEP THIS HARDCODED
const libraryRecords = {
    // ... (your book definitions) ...
};

// Students Data (books issued) - MODIFIED TO LOAD FROM LOCALSTORAGE
let studentsData;

// Function to load data from LocalStorage or use defaults
function initializeStudentsData() {
    const storedData = localStorage.getItem('library_students_data');
    if (storedData) {
        studentsData = JSON.parse(storedData);
    } else {
        // Use default structure if no data is found
        studentsData = {
            "Shiva Nand Yadav": [],
            "Ansh Kumar": [],
            "Neeraj Singh": [],
            "Shubham Kumar": [],
        };
    }
}
initializeStudentsData();

// Function to save data to LocalStorage
function saveStudentsData() {
    localStorage.setItem('library_students_data', JSON.stringify(studentsData));
}
