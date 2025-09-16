app.post('/api/issue-book', async (req, res) => {
  const { studentName, serialNumber, issueDate, returnDate } = req.body;
  // insert into issued_books table
  await db.query(
    'INSERT INTO issued_books (studentName, serialNumber, issueDate, returnDate, status) VALUES (?, ?, ?, ?, "issued")',
    [studentName, serialNumber, issueDate, returnDate]
  );
  res.json({ success: true });
});