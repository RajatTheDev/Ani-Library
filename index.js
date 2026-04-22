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

formDialog.addEventListener('submit', (event) => {
    const form = document.querySelector('.form');
    const title = form.title;
    const author = form.author;
    const pages = form.pages;
    const read = form.read.checked;
    
    title.setCustomValidity("");
    author.setCustomValidity("");
    pages.setCustomValidity("");
    
    if (!title.checkValidity() || !author.checkValidity() || !pages.checkValidity()){
        event.preventDefault();
        if (title.validity.valueMissing) {
            title.setCustomValidity("Enter a valid Title!");
            form.reportValidity();
        } else if (author.validity.valueMissing) {
            author.setCustomValidity("Enter a valid Author Name!");
            form.reportValidity();
        } else {
            pages.setCustomValidity("Enter valid Page Number!");
            form.reportValidity();
        }
        return;
    }
    
    else {
        const book = new Book(title.value, author.value, pages.value, read);
        addBookToLibrary(book);
        displayBooks();
        document.querySelector('.form').reset();
        formDialog.close();
    }
});

formCancel.addEventListener('click', () => {
    formDialog.close();
});
