CREATE SCHEMA `libraryManagementSystemDB`;

use libraryManagementSystemDB;
CREATE TABLE Borrowers (
	id INT AUTO_INCREMENT NOT NULL,
    name NVARCHAR(50) NOT NULL,
    email NVARCHAR(75) NOT NULL UNIQUE,
	registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE Books (
	id INT AUTO_INCREMENT NOT NULL,
    title NVARCHAR(100) NOT NULL,
    author NVARCHAR(50) NOT NULL,
    isbn NVARCHAR(25) UNIQUE NOT NULL,
    quantity INT UNSIGNED,
    shelf_location NVARCHAR(25),
    PRIMARY KEY (id)
);

CREATE TABLE Borrowed (
	borrower_id INT NOT NULL,
    book_id INT NOT NULL,
    booked_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (borrower_id,book_id),
    FOREIGN KEY (borrower_id) REFERENCES Borrowers(id),
    FOREIGN KEY (book_id) REFERENCES Books(id)
);

