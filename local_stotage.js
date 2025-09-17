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
  saveRecords(); // ✅ Save after adding
  updateTable();
  updateStats();
  updateStudentList();
}

function markReturned(index) {
  records[index].status = "Returned";
  saveRecords(); // ✅ Save after status change
  updateTable();
  updateStats();
}

function deleteRecord(index) {
  records.splice(index, 1);
  saveRecords(); // ✅ Save after delete
  updateTable();
  updateStats();
  updateStudentList();
}
