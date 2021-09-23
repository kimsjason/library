function Book(title, author) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBook = readBook;
    info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readBook}`
    }
}

let myLibrary = [];

function addBookToLibrary() {
    const newBook = prompt('Add a new book to the library: ');
    myLibrary.push(newBook);
}

function displayLibrary() {
    myLibrary.forEach(book => console.log(book));
}

addBookToLibrary();
addBookToLibrary();
displayLibrary();