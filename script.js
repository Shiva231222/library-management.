let records = [];

// Handle form submission
document.getElementById("bookForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let studentName = document.getElementById("studentName").value;
  let bookName = document.getElementById("bookName").value;
  let serialNumber = document.getElementById("serialNumber").value;
  let issueDate = document.getElementById("issueDate").value;
  let returnDate = document.getElementById("returnDate").value;

  addRecord(studentName, bookName, serialNumber, issueDate, returnDate);
  this.reset();
});

// Add new record
function addRecord(student, book, serial, issue, returnDate) {
  let record = {
    student,
    book,
    serial,
    issue,
    returnDate,
    status: "Issued"
  };

  records.push(record);
  updateTable();
  updateStats();
  updateStudentList();
}

// Update main records table
function updateTable(filteredRecords = records) {
  let tbody = document.getElementById("recordsBody");
  tbody.innerHTML = "";

  filteredRecords.forEach((rec, index) => {
    let row = `
      <tr>
        <td><a href="#" onclick="showStudentDetails('${rec.student}')">${rec.student}</a></td>
        <td>${rec.book}</td>
        <td>${rec.serial}</td>
        <td>${rec.issue}</td>
        <td>${rec.returnDate}</td>
        <td>${rec.status}</td>
        <td>
          <button onclick="markReturned(${index})">Return</button>
          <button onclick="deleteRecord(${index})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Mark book returned
function markReturned(index) {
  records[index].status = "Returned";
  updateTable();
  updateStats();
}

// Delete a record
function deleteRecord(index) {
  records.splice(index, 1);
  updateTable();
  updateStats();
  updateStudentList();
}

// Search records
function searchRecords() {
  let query = document.getElementById("searchInput").value.toLowerCase();
  let filtered = records.filter(r =>
    r.student.toLowerCase().includes(query) ||
    r.book.toLowerCase().includes(query)
  );
  updateTable(filtered);
}

// Show all records
function showAllRecords() {
  updateTable();
}

// Update stats
function updateStats() {
  let total = records.length;
  let active = records.filter(r => r.status === "Issued").length;
  let returned = records.filter(r => r.status === "Returned").length;

  let today = new Date().toISOString().split("T")[0];
  let overdue = records.filter(r => r.status === "Issued" && r.returnDate < today).length;

  document.getElementById("totalBooks").innerText = total;
  document.getElementById("activeBooks").innerText = active;
  document.getElementById("returnedBooks").innerText = returned;
  document.getElementById("overdueBooks").innerText = overdue;
}

// =================== NEW FEATURE ===================
// Student details section
function updateStudentList() {
  let students = [...new Set(records.map(r => r.student))]; // unique student names
  let select = document.getElementById("studentSelect");
  select.innerHTML = `<option value="">-- Select Student --</option>`;
  students.forEach(s => {
    select.innerHTML += `<option value="${s}">${s}</option>`;
  });
}

function showStudentDetails(studentName) {
  let studentRecords = records.filter(r => r.student === studentName);
  let tbody = document.getElementById("studentRecordsBody");
  tbody.innerHTML = "";

  studentRecords.forEach(rec => {
    let row = `
      <tr>
        <td>${rec.book}</td>
        <td>${rec.serial}</td>
        <td>${rec.issue}</td>
        <td>${rec.returnDate}</td>
        <td>${rec.status}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  document.getElementById("studentDetailsSection").style.display = "block";
}
