class Book {
    constructor(title, author, pages, readBook) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readBook = readBook;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readBook}`;
    }
}

class Library {
    constructor(library) {
        this.library = library;
    }

    set library(value) {
        this._library = value;
    }

    get library() {
        return this._library;
    }

    set localLibrary(library) {
        localStorage.setItem('library', JSON.stringify(library));
    }

    get localLibrary() {
        return JSON.parse(localStorage.getItem('library'));
    }

    createBookElement(book) {
        const card = document.createElement('div');
        const removeBook = document.createElement('button');
        const title = document.createElement('div');
        const author = document.createElement('div');
        const pages = document.createElement('div');
        const readBookContainer = document.createElement('div');
        const markedRead = document.createElement('div');
        let readBook = document.createElement('input');
        readBook.type = 'checkbox';

        card.classList.add('card');
        removeBook.classList.add('remove-book');
        title.classList.add('title');
        author.classList.add('author');
        pages.classList.add('pages');
        readBookContainer.classList.add('read-book-container');
        markedRead.classList.add('marked-read');
        
        removeBook.textContent = 'X';
        title.textContent = book.title;
        author.textContent = `By ${book.author}`;
        pages.textContent = `${book.pages} pages`;
        markedRead.textContent = 'Marked as read: '

        removeBook.addEventListener('click', () => {
            removeBook.parentElement.remove();
            this.removeBook(book)
            this.countBooks();
            this.displayCount();
            this.localLibrary = this.library;
        });
        
        readBook.checked = book.readBook;
    
        readBook.addEventListener('click', () => {
            readBook.value = !readBook.checked;
            book.readBook = !book.readBook;
            this.countBooks();
            this.displayCount();
        });
    
        readBookContainer.appendChild(markedRead);
        readBookContainer.appendChild(readBook);
        card.appendChild(removeBook);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readBookContainer);
    
        return card;
    }

    makeBookObjects(localLibrary) {
        let library = []
        localLibrary.forEach(book => {
            const newBook = new Book(book.title, book.author, book.pages, book.readBook);
            library.push(newBook);
        })
        return library;
    }

    initializeLibrary() {
        const bookSample = new Book('Circe', 'Madeline Miller', '393', false)
        const anotherSample = new Book ('The Girl with the Dragon Tattoo', 'Stieg Larsson', '672', true);
        this.addBookToLibrary(bookSample);
        this.addBookToLibrary(anotherSample);
        this.countBooks();
        this.displayCount();
    }

    addBookToLibrary(book) {
        this.library.push(book);
    }

    removeBook(book) {
        const index = this.library.indexOf(book);
        this.library.splice(index, 1);
    }

    countBooks() {
        let read = 0;
        let unread = 0;
        this.library.forEach(book => {
            if (book.readBook) {
                read+=1;
            } else {
                unread+=1;
            }
        });
        
        return [read, unread];
    }

    displayCount() {
        const count = this.countBooks();
        const countRead = document.querySelector('.read');
        const countUnread = document.querySelector('.unread');
        const countTotal = document.querySelector('.total');

        countRead.textContent = `READ BOOKS: ${count[0]}`;
        countUnread.textContent = `UNREAD BOOKS: ${count[1]}`;
        countTotal.textContent = `TOTAL BOOKS: ${this.library.length}`;
    }

    displayBooks() {
        this.library.forEach(book => {
            books.appendChild(this.createBookElement(book));
        })
    }
}

let myLibrary = new Library();
const storedLibrary = myLibrary.localLibrary;
if (storedLibrary === null) {
    myLibrary.library = [];
    myLibrary.initializeLibrary();
} else {
    myLibrary.library = myLibrary.makeBookObjects(storedLibrary);
}

const books = document.getElementsByClassName('books')[0];
myLibrary.displayBooks();
myLibrary.displayCount();


const submitForm = document.querySelector('input[type=button]');
submitForm.addEventListener('click', () => {
    const title = document.querySelector('input[name=title]');
    const author = document.querySelector('input[name=author]');
    const pages = document.querySelector('input[name=pages]');
    const readBook = document.querySelector('input[name="read book"]');

    const alertMessage = document.querySelector('.alert-message');
    if ((title.value === '') || (author.value === '') || (pages.value === '')) {
        alertMessage.textContent = 'Please fill in all the required fields.'
    } else if (isNaN(pages.value)) {
        alertMessage.textContent = 'Please enter a number';
    } else {
        alertMessage.textContent = '';
        const book = new Book(title.value, author.value, pages.value, readBook.checked);
        myLibrary.addBookToLibrary(book);
        myLibrary.localLibrary = myLibrary.library;
        books.appendChild(myLibrary.createBookElement(book));
        myLibrary.countBooks()
        myLibrary.displayCount();
        const bookForm = document.querySelector('.book-form');
        bookForm.reset();
    }
});