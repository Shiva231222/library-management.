function issueBook() {
    // ... (Existing validation code remains) ...

    const newRecord = {
      studentName: studentName,
      serial: serial,
      bookName: bookName,
      issueDate: issueDate,
      returnDate: returnDate,
      status: status
    };

    // Send data to the backend for permanent storage
    fetch('your_backend_script.php?action=issue_book', { // Replace with your actual backend endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert("Book Issued Successfully!");
            // After successful save, refresh the displayed records
            showStudentDetails(studentName); 
            // ... (Clear form) ...
        } else {
            alert("Failed to issue book: " + result.message);
        }
    })
    .catch(error => console.error('Error saving record:', error));
}
