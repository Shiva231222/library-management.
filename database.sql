-- =========================================================
-- 🏫 BCA LIBRARY MANAGEMENT SYSTEM DATABASE SCRIPT
-- Author: Shiva Nand Yadav
-- =========================================================

-- 1️⃣ Create Database
CREATE DATABASE IF NOT EXISTS bca_library_db;
USE bca_library_db;

-- =========================================================
-- 2️⃣ Create Tables
-- =========================================================

-- 📚 Books Table
CREATE TABLE IF NOT EXISTS Books (
    book_serial_no VARCHAR(20) PRIMARY KEY,
    book_title VARCHAR(100) NOT NULL,
    author VARCHAR(100),
    total_copies INT DEFAULT 1,
    available_copies INT DEFAULT 1
);

-- 👨‍🎓 Students Table
CREATE TABLE IF NOT EXISTS Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL UNIQUE,
    bca_department VARCHAR(50) DEFAULT 'BCA'
);

-- 📖 Book_Issues Table
CREATE TABLE IF NOT EXISTS Book_Issues (
    issue_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    book_serial_no VARCHAR(20) NOT NULL,
    issue_date DATE NOT NULL,
    return_date DATE,
    actual_return_date DATE,
    issue_status ENUM('Issued', 'Returned') NOT NULL DEFAULT 'Issued',

    FOREIGN KEY (student_id) REFERENCES Students(student_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (book_serial_no) REFERENCES Books(book_serial_no)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- =========================================================
-- 3️⃣ INSERT (Add Data)
-- =========================================================

-- ➕ Add Books
INSERT INTO Books (book_serial_no, book_title, author, total_copies, available_copies)
VALUES 
('B101', 'Database Management System', 'Korth', 5, 5),
('B102', 'Operating System Concepts', 'Silberschatz', 4, 4),
('B103', 'Computer Networks', 'Tanenbaum', 6, 6);

-- ➕ Add Students
INSERT INTO Students (student_name, bca_department)
VALUES 
('Ravi Kumar', 'BCA'),
('Priya Singh', 'BCA'),
('Aman Verma', 'BCA');

-- ➕ Add Book Issue Records
INSERT INTO Book_Issues (student_id, book_serial_no, issue_date, return_date)
VALUES 
(1, 'B101', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 15 DAY)),
(2, 'B102', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 10 DAY));

-- =========================================================
-- 4️⃣ SELECT (View Data)
-- =========================================================

-- View All Books
SELECT * FROM Books;

-- View All Students
SELECT * FROM Students;

-- View All Issued Books
SELECT * FROM Book_Issues;

-- =========================================================
-- 5️⃣ UPDATE (Edit Data)
-- =========================================================

-- ✏️ Update Book Details
UPDATE Books
SET book_title = 'DBMS Concepts', author = 'Elmasri', total_copies = 6
WHERE book_serial_no = 'B101';

-- ✏️ Update Student Details
UPDATE Students
SET student_name = 'Ravi K. Yadav'
WHERE student_id = 1;

-- ✏️ Update Book Issue Record (Mark as Returned)
UPDATE Book_Issues
SET actual_return_date = CURDATE(), issue_status = 'Returned'
WHERE issue_id = 1;

-- =========================================================
-- 6️⃣ DELETE (Remove Data)
-- =========================================================

-- ❌ Delete a Book
DELETE FROM Books WHERE book_serial_no = 'B103';

-- ❌ Delete a Student
DELETE FROM Students WHERE student_id = 3;

-- ❌ Delete a Book Issue Record
DELETE FROM Book_Issues WHERE issue_id = 2;

-- =========================================================
-- ✅ End of File
-- =========================================================
