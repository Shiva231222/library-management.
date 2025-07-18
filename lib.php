<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>College Library Management System</title>
  <link href="style.css" rel="stylesheet" type="text/css" />
</head>
<body>
  <div class="container">
    <h1>College Library Management System</h1>
    
    <div class="form-section">
      <h2>Issue New Book</h2>
      <form id="bookForm">
        <div class="form-group">
          <label for="studentName">Student Name:</label>
          <input type="text" id="studentName" required>
        </div>
        
        <div class="form-group">
          <label for="bookName">Book Name:</label>
          <input type="text" id="bookName" required>
        </div>
        
        <div class="form-group">
          <label for="serialNumber">Book Serial Number:</label>
          <input type="text" id="serialNumber" required>
        </div>
        
        <div class="form-group">
          <label for="issueDate">Issue Date:</label>
          <input type="date" id="issueDate" required>
        </div>
        
        <div class="form-group">
          <label for="returnDate">Expected Return Date:</label>
          <input type="date" id="returnDate" required>
        </div>
        
        <button type="submit">Issue Book</button>
      </form>
    </div>
    
    <div class="records-section">
      <h2>Library Records</h2>
      <div class="search-section">
        <input type="text" id="searchInput" placeholder="Search by student name or book name...">
        <button onclick="searchRecords()">Search</button>
        <button onclick="showAllRecords()">Show All</button>
      </div>
      
      <table id="recordsTable">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Book Name</th>
            <th>Serial Number</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="recordsBody">
          <!-- Records will be added here dynamically -->
        </tbody>
      </table>
    </div>
    
    <div class="stats-section">
      <h2>Library Statistics</h2>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-number" id="totalBooks">0</span>
          <span class="stat-label">Total Books Issued</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" id="activeBooks">0</span>
          <span class="stat-label">Currently Issued</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" id="returnedBooks">0</span>
          <span class="stat-label">Books Returned</span>
        </div>  
        <div class="stat-item">
          <span class="stat-number" id="overdueBooks">0</span>
          <span class="stat-label">Overdue Books</span>
        </div>
      </div>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>
