const myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();

  // Connect the form submit event listener
  const formElement = document.getElementById("book-form");
  if (formElement) {
    formElement.addEventListener("submit", submit);
  }  
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);
    let book2 = new Book("The Old Man and the Sea","Ernest Hemingway",127,true);
   
    myLibrary.push(book1, book2);
  }
}

const formElement = document.getElementById("book-form");
const titleElement = document.getElementById("title");
const authorElement = document.getElementById("author");
const pagesElement = document.getElementById("pages");
const checkElement = document.getElementById("check");





// Helper function to display messages to the user in the UI
function displayStatusMessage(message, isError = false) {
  const statusContainer = document.getElementById("status-message") || createStatusContainer();
  statusContainer.textContent = message;
  statusContainer.style.color = isError ? "red" : "black";
}

function createStatusContainer() {
  const container = document.createElement("div");
  container.id = "status-message";
  container.style.padding = "1rem";
  container.style.fontSize = "1.2rem";
  container.style.textAlign = "center";
  
  // Prepend to body or main container
  document.body.prepend(container);
  return container;
}


//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit(event) {
  // Prevent form submission from reloading the page
  if (event) {
    event.preventDefault();
  }
  
  const titleValue = titleElement.value.trim();
  const authorValue = authorElement.value.trim();
  const pagesValue = pagesElement.value.trim();

  displayStatusMessage("");
  
  if (
    titleValue === "" ||
    authorValue === "" ||
    pagesValue === ""
  ) {
    displayStatusMessage("Please fill all fields!", true);
    return;
  }


// Convert to Number
  const pagesNum = Number(pagesValue);

  // Check if it's a valid positive integer
  if (!Number.isInteger(pagesNum) || pagesNum <= 0) {
    displayStatusMessage("Pages must be a positive whole number!", true);
    return;
  }
  
  let book = new Book(titleValue, authorValue, pagesNum, checkElement.checked);

  myLibrary.push(book);
    // Clear inputs on successful submit
  formElement.reset();
  
  displayStatusMessage(`Added "${titleValue}" to your library!`, false);
  render();
  
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  let table = document.getElementById("display");

  let tbodyElement = document.getElementById("tableBody");

  // Clear existing rows inside tbody only
  tbodyElement.innerHTML = "";

  
  for (let i = 0; i < myLibrary.length; i++) {
    let row = tbodyElement.insertRow(-1);
  
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";


    changeBut.innerText = myLibrary[i].check ? "Yes" : "No";
    changeBut.addEventListener("click", () => {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });
    wasReadCell.appendChild(changeBut);

    //add delete button to every row and render again
    let delButton = document.createElement("button");
    delButton.className = "btn btn-warning";
    delButton.innerText = "Delete";
    delButton.addEventListener("click", () => {
      displayStatusMessage(`You've deleted title: ${myLibrary[i].title}`,false);
      myLibrary.splice(i, 1);
      render();
    });
    deleteCell.appendChild(delButton);
  }
}
