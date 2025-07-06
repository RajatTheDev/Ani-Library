const bookContainer = document.querySelector('.books-container');
const formDialog = document.querySelector('#form-dialog');
const formSubmit = document.querySelector('.form-submit-btn');
const formCancel = document.querySelector('.form-cancel-btn');
const addBook = document.querySelector('.add-book');
const deleteBtn = document.querySelector('.delete-btn'); 
const toggleReadBtn = document.querySelector('.toggle-read-btn');
const myLibrary = [];

class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    bookContainer.innerHTML = '';

    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.setAttribute('book-id', book.id);
        
        const bookTitle = document.createElement('h2');
        bookTitle.textContent = book.title;
        bookDiv.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;
        bookDiv.appendChild(bookAuthor);

        const bookPages = document.createElement('p');
        bookPages.textContent = `Pages: ${book.pages}`;
        bookDiv.appendChild(bookPages);

        const bookRead = document.createElement('button');
        if (book.read === true || book.read === 'Read') {
            bookRead.textContent = 'Read';
            bookRead.setAttribute('style', 'background-color: green; color: white');
        }
        else {
            bookRead.textContent = 'Not Read';
            bookRead.setAttribute('style', 'background-color: yellow; color: rgb(89, 46, 0)');
        }
        bookRead.classList.add('toggle-read-btn');

        bookRead.addEventListener('click', () => {
            book.read = !book.read;
            displayBooks();
        });

        bookDiv.appendChild(bookRead);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', () => {
            const bookIndex = myLibrary.findIndex(b => b.id === book.id);
            myLibrary.splice(bookIndex, 1);
            displayBooks();
        });

        bookDiv.appendChild(deleteBtn);

        bookContainer.appendChild(bookDiv);
    });
}

const defaultBooks = [
    new Book('Harry Potter', 'J.K. Rowling', 352, 'Read'),
    new Book('Atomic Habits', 'James Clear', 306, 'Read')
];

defaultBooks.forEach(book => addBookToLibrary(book));
displayBooks();

addBook.addEventListener('click', () => {
    formDialog.showModal();
});

formSubmit.addEventListener('click', (event) => {
    if (document.querySelector('#title').value === '' || document.querySelector('#author').value === '' || document.querySelector('#pages').value === ''){
        event.preventDefault();
        alert("All fields must be filled out!");
        return;
    }

    const form = document.querySelector('.form');
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const read = form.read.checked;
    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    displayBooks();
    document.querySelector('.form').reset();
    formDialog.close();
});

formCancel.addEventListener('click', () => {
    formDialog.close();
});
