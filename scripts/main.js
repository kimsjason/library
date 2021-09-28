let myLibrary = [];

function Book(title, author, pages, readBook) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBook = readBook;
    info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readBook}`
    }
}

function initializeLibrary() {
    const books = document.getElementsByClassName('books')[0];
    const bookSample = new Book('Circe', 'Madeline Miller', 393, false)
    const anotherSample = new Book ('The Girl with the Dragon Tattoo', 'Stieg Larsson', 672, true);
    addBookToLibrary(bookSample);
    addBookToLibrary(anotherSample);
    books.appendChild(createBookElement(bookSample));
    books.appendChild(createBookElement(anotherSample));
    countBooks();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createBookElement(book) {
    const card = document.createElement('div');
    card.classList.add('card');

    // Remove book
    const removeBook = document.createElement('button');
    removeBook.textContent = 'X';
    removeBook.classList.add('remove-book');
    const index = myLibrary.indexOf(book);
    removeBook.addEventListener('click', () => {
        removeBook.parentElement.remove();
        myLibrary.splice(index, 1);
    });

    // Book info
    const title = document.createElement('div');
    title.classList.add('title');
    const author = document.createElement('div');
    author.classList.add('author');
    const pages = document.createElement('div');
    pages.classList.add('pages');

    // Read book input
    const readBookContainer = document.createElement('div');
    readBookContainer.classList.add('read-book-container');
    const markedRead = document.createElement('div');
    markedRead.classList.add('marked-read');
    const readBook = document.createElement('input');
    readBookContainer.appendChild(markedRead);
    readBookContainer.appendChild(readBook);
    readBook.type = 'checkbox';
    if (book.readBook == false) {
        readBook.checked = false;
    } else {
        readBook.checked = true;
    }
    readBook.addEventListener('click', () => {
        myLibrary[index].readBook = readBook.checked;
        countBooks();
    });

    title.textContent = book.title;
    author.textContent = `By ${book.author}`;
    pages.textContent = `${book.pages} pages`;
    markedRead.textContent = 'Marked as read: '

    card.appendChild(removeBook);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readBookContainer);

    return card;
}

function countBooks() {
    const countRead = document.querySelector('.read');
    const countUnread = document.querySelector('.unread');
    const countTotal = document.querySelector('.total');

    let read = 0;
    let unread = 0;
    myLibrary.forEach(book => {
        if (book.readBook) {
            read+=1;
        } else {
            unread+=1;
        }
    });

    countRead.textContent = `READ BOOKS: ${read}`;
    countUnread.textContent = `UNREAD BOOKS: ${unread}`;
    countTotal.textContent = `TOTAL BOOKS: ${myLibrary.length}`;
}

const submitForm = document.querySelector('input[type=button]');
submitForm.addEventListener('click', () => {
    const title = document.querySelector('input[name=title]');
    const author = document.querySelector('input[name=author]');
    const pages = document.querySelector('input[name=pages]');
    const readBook = document.querySelector('input[name="read book"]');

    if ((title.value === '') || (author.value === '') || (pages.value === '')) {
        console.log('This is a required field');
    } else if (isNaN(pages.value)) {
        console.log('Please enter a number');
    } else {
        const book = new Book(title.value, author.value, pages.value, readBook.checked);
        addBookToLibrary(book);
        const books = document.getElementsByClassName('books')[0];
        books.appendChild(createBookElement(book));
        countBooks();
        const bookForm = document.querySelector('.book-form');
        bookForm.reset();
    }
});

initializeLibrary();