# Library-Management-System
Simple library management system to manage books and borrowers

# Configuration steps
This management system is developed using nodejs and mysql so please make sure to install both.

1- Please run the sql/create_schema.sql in Mysql

2- add a .env file in the root folder of the repo that contains these attributes

HOST=your_DB_Host
PORT=your_DB_Port
USER=your_DB_Username
PASSWORD=your_DB_Password
DATABASE=libraryManagementSystemDB

3- run npm install then npm start

4- This is a postman link that contains all the API's and will add the description bellow https://www.postman.com/youssefhaitham/workspace/bosta-backend-assessment/collection/3837730-86f37a94-609c-4144-950b-7ec83b01efc6?action=share&creator=3837730&active-environment=3837730-adf5d588-4550-405e-af2c-7fb96d072e42

# Api's Description 

## Books

1- /api/getAllBooks => returns a list of all books, no params or body needed

2- /api/addBook => adds a book if not already exists. takes as a body 
{
    "title": "",
    "author": "",
    "isbn": "",
    "quantity": 0,
    "shelf_location": ""
}

3- /api/updateBook/:isbn => updates a book using it's isbn as an identifier, takes isbn as params and as a body 
{
    "title": "",
    "author": "",
    "quantity": 0,
    "shelf_location": ""
}

4- /api/deleteBook/:isbn => deletes a book using it's isbn as an identifier, takes isbn as params

5- /api/searchBook/:keyWord => searched for a book in title, author or isbn colums, takes keyWord as params and returns an array of books

## Borrowers

1- /api/getAllBorrowers => returns a list of all the borrowers, no params or body needed

2- /api/addBorrower => adds a borrower if not already exists, takes as a body
{
    "email":"",
    "name": ""
}

3- /api/updateBorrower => updates a borrower info using the email as an identifier, takes as a body
{
    "name": "",
    "email": ""
}

4- /api/deleteBorrower => deletes a borrower using the email as an identifier, takes as a body
{
    "email": ""
}

## Borrowing

1- /api/borrowBook => request to borrow a specific book for a specific user, takes as a body
{
    "email": "",
    "isbn" : ""
}

2- /api/returnBook => returns a specific book from a specific user, takes as a body
{
    "email": "",
    "isbn" : ""
}

3- /api/checkBorrowedBooks => returns an array of Books that a specific user Borrowed, takes as a body
{
    "email": ""
}

4- /api/listOverdueBooks => returns an array of books that it's time is overdue, for simplicity the overdue time is 5 minutes from the borrowing time
