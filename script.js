
// Library Management System JavaScript

let libraryRecords = [];
let recordIdCounter = 1;

// Load records from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadRecordsFromStorage();
    updateStats();
    displayRecords();
    
    // Set today's date as default for issue date
    document.getElementById('issueDate').valueAsDate = new Date();
    
    // Set default return date (2 weeks from today)
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14);
    document.getElementById('returnDate').valueAsDate = returnDate;
});

// Form submission handler
document.getElementById('bookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studentName = document.getElementById('studentName').value.trim();
    const bookName = document.getElementById('bookName').value.trim();
    const serialNumber = document.getElementById('serialNumber').value.trim();
    const issueDate = document.getElementById('issueDate').value;
    const returnDate = document.getElementById('returnDate').value;
    
    // Validation
    if (!studentName || !bookName || !serialNumber || !issueDate || !returnDate) {
        alert('Please fill in all fields');
        return;
    }
    
    // Check if serial number already exists for issued books
    const existingRecord = libraryRecords.find(record => 
        record.serialNumber === serialNumber && record.status === 'issued'
    );
    
    if (existingRecord) {
        alert('This book is already issued. Serial number must be unique for issued books.');
        return;
    }
    
    // Validate dates
    if (new Date(returnDate) <= new Date(issueDate)) {
        alert('Return date must be after issue date');
        return;
    }
    
    // Create new record
    const newRecord = {
        id: recordIdCounter++,
        studentName: studentName,
        bookName: bookName,
        serialNumber: serialNumber,
        issueDate: issueDate,
        returnDate: returnDate,
        status: 'issued',
        actualReturnDate: null
    };
    
    libraryRecords.push(newRecord);
    saveRecordsToStorage();
    updateStats();
    displayRecords();
    
    // Reset form
    document.getElementById('bookForm').reset();
    
    // Set default dates again
    document.getElementById('issueDate').valueAsDate = new Date();
    const newReturnDate = new Date();
    newReturnDate.setDate(newReturnDate.getDate() + 14);
    document.getElementById('returnDate').valueAsDate = newReturnDate;
    
    alert('Book issued successfully!');
});

// Display records in table
function displayRecords(recordsToShow = libraryRecords) {
    const tbody = document.getElementById('recordsBody');
    tbody.innerHTML = '';
    
    if (recordsToShow.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px; color: #666;">No records found</td></tr>';
        return;
    }
    
    recordsToShow.forEach(record => {
        const row = document.createElement('tr');
        
        // Determine status
        let status = record.status;
        let statusClass = record.status;
        
        if (record.status === 'issued') {
            const today = new Date();
            const returnDate = new Date(record.returnDate);
            if (today > returnDate) {
                status = 'overdue';
                statusClass = 'overdue';
            }
        }
        
        row.innerHTML = `
            <td>${record.studentName}</td>
            <td>${record.bookName}</td>
            <td>${record.serialNumber}</td>
            <td>${formatDate(record.issueDate)}</td>
            <td>${formatDate(record.returnDate)}</td>
            <td><span class="status ${statusClass}">${status}</span></td>
            <td>
                ${record.status === 'issued' ? 
                    `<button class="action-btn return-btn" onclick="returnBook(${record.id})">Return</button>` : 
                    `<span style="color: #28a745;">✓ Returned on ${formatDate(record.actualReturnDate)}</span>`
                }
                <button class="action-btn delete-btn" onclick="deleteRecord(${record.id})">Delete</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Return book function
function returnBook(recordId) {
    const record = libraryRecords.find(r => r.id === recordId);
    if (record) {
        const confirmReturn = confirm(`Return book "${record.bookName}" issued to ${record.studentName}?`);
        if (confirmReturn) {
            record.status = 'returned';
            record.actualReturnDate = new Date().toISOString().split('T')[0];
            saveRecordsToStorage();
            updateStats();
            displayRecords();
            alert('Book returned successfully!');
        }
    }
}

// Delete record function
function deleteRecord(recordId) {
    const record = libraryRecords.find(r => r.id === recordId);
    if (record) {
        const confirmDelete = confirm(`Delete record for "${record.bookName}" issued to ${record.studentName}?`);
        if (confirmDelete) {
            libraryRecords = libraryRecords.filter(r => r.id !== recordId);
            saveRecordsToStorage();
            updateStats();
            displayRecords();
            alert('Record deleted successfully!');
        }
    }
}

// Search functionality
function searchRecords() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayRecords();
        return;
    }
    
    const filteredRecords = libraryRecords.filter(record => 
        record.studentName.toLowerCase().includes(searchTerm) ||
        record.bookName.toLowerCase().includes(searchTerm) ||
        record.serialNumber.toLowerCase().includes(searchTerm)
    );
    
    displayRecords(filteredRecords);
}

// Show all records
function showAllRecords() {
    document.getElementById('searchInput').value = '';
    displayRecords();
}

// Update statistics
function updateStats() {
    const totalBooks = libraryRecords.length;
    const activeBooks = libraryRecords.filter(r => r.status === 'issued').length;
    const returnedBooks = libraryRecords.filter(r => r.status === 'returned').length;
    
    // Calculate overdue books
    const today = new Date();
    const overdueBooks = libraryRecords.filter(r => {
        if (r.status === 'issued') {
            const returnDate = new Date(r.returnDate);
            return today > returnDate;
        }
        return false;
    }).length;
    
    document.getElementById('totalBooks').textContent = totalBooks;
    document.getElementById('activeBooks').textContent = activeBooks;
    document.getElementById('returnedBooks').textContent = returnedBooks;
    document.getElementById('overdueBooks').textContent = overdueBooks;
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Save records to localStorage
function saveRecordsToStorage() {
    localStorage.setItem('libraryRecords', JSON.stringify(libraryRecords));
    localStorage.setItem('recordIdCounter', recordIdCounter.toString());
}

// Load records from localStorage
function loadRecordsFromStorage() {
    const savedRecords = localStorage.getItem('libraryRecords');
    const savedCounter = localStorage.getItem('recordIdCounter');
    
    if (savedRecords) {
        libraryRecords = JSON.parse(savedRecords);
    }
    
    if (savedCounter) {
        recordIdCounter = parseInt(savedCounter);
    }
}

// Add search on Enter key
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchRecords();
    }
});

// Sample data function for testing (you can remove this)
function addSampleData() {
    const sampleRecords = [
        {
            id: recordIdCounter++,
            studentName: "John Doe",
            bookName: "Data Structures and Algorithms",
            serialNumber: "CS001",
            issueDate: "2024-01-15",
            returnDate: "  ",
            status: "returned",
            actualReturnDate: "2024-01-28"
        },
        {
            id: recordIdCounter++,
            studentName: "Jane Smith",
            bookName: "Introduction to Machine Learning",
            serialNumber: "CS002",
            issueDate: "2024-01-20",
            returnDate: "  ",
            status: "issued",
            actualReturnDate: null
        }
    ];
    
    libraryRecords.push(...sampleRecords);
    saveRecordsToStorage();
    updateStats();
    displayRecords();
}

// Uncomment the line below to add sample data for testing
// addSampleData();
