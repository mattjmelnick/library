//Show input form when new book button is clicked then hide the button
let newBookButton = document.querySelector(".new-book-button");
let newBookForm = document.getElementById("book-form")

function showForm()
{
    newBookForm.style.display = "block";
    newBookButton.hidden = true;
}

newBookButton.addEventListener("click", showForm);

// Reference to the form
let addBookForm = document.getElementById("book-form-check");

// Initialize the library and Book object constructor
const myLibrary = [];

function Book(title, author, pages, readStatus, idNumber)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.idNumber = idNumber;
}

// Counter for unique book object IDs
let bookCardCount = -1;
function addBookCard(event)
{
    // Required form input values
    let bookTitle = document.getElementById("title");
    let bookAuthor = document.getElementById("author");
    let bookPages = document.getElementById("pages");
    let readStatusYes = document.getElementById("read-status-yes");
    let readStatusNo = document.getElementById("read-status-no");
    let cardDisplayArea = document.querySelector(".card-display-area");

    bookCardCount++;

    // Create the book object and add it to the library
    let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, readStatusYes.checked, bookCardCount);
    myLibrary.push(newBook);
    console.log(myLibrary);
    
    // Card button functionality
    function changeReadStatus()
    {
        if (bookCardReadButton.textContent === "YES")
        {
            bookCardReadButton.textContent = "NO";
            newBook.readStatus = false;
        }
        else
        {
            bookCardReadButton.textContent = "YES";
            newBook.readStatus = true;
        }
    }

    function deleteBookCard()
    {
        let idx = myLibrary.indexOf(newBook);
        myLibrary.splice(idx, 1);
        bookCard.remove();
    }

    // Prevent app from submitting HTTP request
    event.preventDefault();

    // Create the book card object to display the input values
    let bookCard = document.createElement("div");
    bookCard.classList.toggle("book-card");
    bookCard.id = bookCardCount;
    const delButton = document.createElement("button");
    delButton.textContent = "X";
    delButton.classList.toggle("delete-button");
    delButton.addEventListener("click", deleteBookCard);
    bookCard.appendChild(delButton);
    let bookCardTitle = document.createElement("span");
    bookCardTitle.textContent = bookTitle.value;
    bookCard.appendChild(bookCardTitle);
    let bookCardAuthor = document.createElement("span");
    bookCardAuthor.textContent = bookAuthor.value;
    bookCard.appendChild(bookCardAuthor);
    let bookCardPages = document.createElement("div");
    bookCardPages.innerHTML = `<span>${bookPages.value}</span>&nbsp<span>pages</span>`;
    bookCard.appendChild(bookCardPages);
    let bookReadStatus = document.createElement("div");
    bookReadStatus.innerHTML = `<span>Read?</span> &nbsp &nbsp &nbsp`;
    bookCard.appendChild(bookReadStatus);
    let bookCardReadButton = document.createElement("button");
    if (readStatusYes.checked)
    {
        bookCardReadButton.textContent = "YES";
    }
    else
    {
        bookCardReadButton.textContent = "NO";
    }

    // Reset fields after adding a new book
    bookCardReadButton.addEventListener("click", changeReadStatus);
    bookReadStatus.appendChild(bookCardReadButton);
    cardDisplayArea.appendChild(bookCard);
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    readStatusYes.checked = false;
    readStatusNo.checked = false;
}

addBookForm.addEventListener("submit", addBookCard);