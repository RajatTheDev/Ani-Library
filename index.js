const bookContainer = document.querySelector('.books-container');
const addBook = document.querySelector('.add-book');
const deleteBtn = document.querySelector('.delete-btn'); 
const toggleReadBtn = document.querySelector('.toggle-read-btn');
const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    bookContainer.innerHTML = '';

    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <button class = "toggle-read-btn">${book.read}</button>
            <button class = "delete-btn">Delete</button>
        `;
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
    const title = prompt('Title');
    const author = prompt('Author');
    const pages = prompt('Pages');
    const read = prompt('Read');
    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    displayBooks();
});