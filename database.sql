-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS bca_library_db;
USE bca_library_db;

-- 2. Create the Books Table
-- Stores information about all available books in the library.
CREATE TABLE IF NOT EXISTS Books (
    book_serial_no VARCHAR(20) PRIMARY KEY, -- Corresponds to the 'serial' from JavaScript (e.g., B101)
    book_title VARCHAR(100) NOT NULL,       -- Corresponds to the 'book' name (e.g., DBMS)
    author VARCHAR(100),                    -- Added for better book cataloging
    total_copies INT DEFAULT 1,             -- Tracks total available copies 
    available_copies INT DEFAULT 1          -- Tracks how many are currently available
);

-- 3. Create the Students Table
-- Stores details of students who are members of the library.
CREATE TABLE IF NOT EXISTS Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique ID for each student
    student_name VARCHAR(100) NOT NULL UNIQUE, -- Corresponds to the names in studentsData 
    bca_department VARCHAR(50) DEFAULT 'BCA'   -- Added based on the system title
);

-- 4. Create the Book_Issues Table
-- Tracks every book borrowing and return transaction.
CREATE TABLE IF NOT EXISTS Book_Issues (
    issue_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,                  -- Foreign Key to Students table
    book_serial_no VARCHAR(20) NOT NULL,      -- Foreign Key to Books table
    issue_date DATE NOT NULL,
    return_date DATE,                         -- Expected return date
    actual_return_date DATE,                  -- The date the book was actually returned (NULL if still issued)
    issue_status ENUM('Issued', 'Returned') NOT NULL DEFAULT 'Issued', -- Corresponds to the 'status'
    
    -- Define Foreign Key Constraints
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (book_serial_no) REFERENCES Books(book_serial_no)
);
