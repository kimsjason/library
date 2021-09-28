function Book(title, author, pages, readBook) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBook = readBook;
    info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readBook}`
    }
}

let myLibrary = [];

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createBookElement(book) {
    const card = document.createElement('div');
    card.classList.add('card');

    const removeBook = document.createElement('button');
    const index = myLibrary.indexOf(book);
    removeBook.classList.add('remove-book');
    removeBook.addEventListener('click', () => {
        removeBook.parentElement.remove();
        myLibrary.splice(index, 1);
    });

    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const readBook = document.createElement('input');
    readBook.type = 'checkbox';
    if (book.readBook == null) {
        readBook.checked = false;
    } else {
        readBook.checked = true;
    }
    readBook.addEventListener('click', () => {
        myLibrary[index].readBook = readBook.checked;
    });

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    readBook.textContent = book.readBook;

    card.appendChild(removeBook);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readBook);

    return card;
}




// function displayLibrary() {
//     myLibrary.forEach(book => {
//         document.body.appendChild(createBookElement(book));
//     });
// }


const newBook = document.querySelector('.new-book');
newBook.addEventListener('click', () => {
    const bookForm = document.querySelector('.book-form');
    bookForm.classList.toggle('popup');
    
    const submitForm = document.querySelector('input[type=button]');
    submitForm.addEventListener('click', () => {
        const title = document.querySelector('input[name=title]');
        const author = document.querySelector('input[name=author]');
        const pages = document.querySelector('input[name=pages]');
        const readBook = document.querySelector('input[name="read book"]');
        const book = new Book(title.value, author.value, pages.value, readBook.checked);

        addBookToLibrary(book);
        document.body.appendChild(createBookElement(book));
        bookForm.reset();
    });
});

