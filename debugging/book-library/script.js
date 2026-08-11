let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);
    let book2 = new Book("The Old Man and the Sea","Ernest Hemingway",127,true);


// Date : 9/8/2026
// Purpose : Fix the problem "2. Error in console when you try to add a book"
// Change : replace Librarty with the correct variable myLibrary    
    myLibrary.push(book1, book2);
  }
}

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
function submit() {

  // Date : 9/8/2026
  // Purpose : Fix the problem "3. It uses the title name as the author name"
  // Change : replace the second title with author.value to fix the bug 
  let titleValue = titleElement.value.trim();
  let authorValue = authorElement.value.trim();
  let pagesValue = pagesElement.value.trim();
 
  if (
    titleValue === "" ||
    authorValue === "" ||
    pagesValue === ""
  ) {
    displayStatusMessage("Please fill all fields!", true);
    return;
  }

  let book = new Book(titleValue, authorValue, pagesValue, checkElement.checked);

  myLibrary.push(book);
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

  //delete old table
  table.innerHTML = "";

  let thead = document.createElement("thead");
  thead.className = "thead-dark";
  thead.innerHTML = `
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Number of Pages</th>
      <th>Read</th>
      <th></th>
    </tr>
  `;
  table.appendChild(thead);

  // Date : 9/8/2026
  // Purpose : Fix the problem "1. Website loads but doesn't show any books"
  // Change : Missing ) → script stops executing → nothing renders and add back the closing ) to fix it    
  for (let i = 0; i < myLibrary.length; i++) {
    let row = table.insertRow(-1);
  
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    
    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";

    // Date : 9/8/2026
    // Purpose : Fix the problem "5. When I add a book that I say I've read - it saves the wrong answer"
    // Change : Correct the logic - if check == true, that means the book was read, so it should show Yes.
    changeBut.innerText = myLibrary[i].check ? "Yes" : "No";
    changeBut.addEventListener("click", () => {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });
    wasReadCell.appendChild(changeBut);

    //add delete button to every row and render again
    let delButton = document.createElement("button");
    // Date : 9/8/2026
    // Purpose : Fix the problem "4. Delete button is broken"
    // Change : Fix the incorrect nanmes "delBut" button and "clicks" event to the correct one "delButton" and "click" respectively     
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
