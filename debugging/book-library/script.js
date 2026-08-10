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

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  if (
    title.value.trim() === "" ||
    pages.value.trim() === "" ||
    author.value.trim() === ""
  ) {
    alert("Please fill all fields!");
    return;
  } 


  // Date : 9/8/2026
  // Purpose : Fix the problem "3. It uses the title name as the author name"
  // Change : replace the second title with author.value to fix the bug 
  let book = new Book(title.value, author.value, pages.value, check.checked);
  mylibrary.push(book);
  render();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;
  //delete old table
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

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
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
    deleteCell.appendChild(delButton);
  }
}
