class Book {

    constructor(id, title, author, price, rating){
        this.id = id;
        this.title = title;
        this.author = author;
        this.price = price;
        this.rating = rating;
    }
}
        
let bookList = [];

addBooks();

function addBooks(){
let book_1 = new Book(1104, "The White Tiger", "Arvind Adiga", 499, 4.5);
let book_2 = new Book(1105, "Nectar In A Sieve", "Kamala Markandaya", 350, 4.0);
let book_3 = new Book(1106, "Great Indian Novel", "Shashi Tharoor", 300, 4.0);
let book_4 = new Book(1107, "Palace of Illusions", "Chitra Banerjee Divakaruni", 450, 3.5);
let book_5 = new Book(1108, "In Custody", "Anita Desai", 399, 4.0);
let book_6 = new Book(1109, "A Fine Balance", "Rohinton Mistry", 299, 5.0);
let book_7 = new Book(1110, "The Last Song of Dusk", "Siddharth Dhanvant Shanghvi", 250, 5.0);

bookList.push(book_1);
bookList.push(book_2);
bookList.push(book_3);
bookList.push(book_4);
bookList.push(book_5);
bookList.push(book_6);
bookList.push(book_7);

}
        
buildTable(bookList);

function buildTable(bookList){
    localStorage.clear();
    let tbodyr = document.querySelector('tbody');
    for(let i = 0; i < bookList.length; i++){
        let count = i + 1;
        let bookx = JSON.stringify(bookList[i]);
        localStorage.setItem("book"+(i+1), bookx);
        let row = `<tr id="tbr" class="row">
                        <td>${bookList[i].id}</td>
                        <td>${bookList[i].title}</td>
                        <td>${bookList[i].author}</td>
                        <td>${bookList[i].price}</td>
                        <td>
                            <span id="rating">${bookList[i].rating}</span> | 
                            <div class="stars-outer">
                                <div id="innerStar${count}" class="stars-inner"></div>
                            </div>
                        </td>
                        <td><img id="dbtn "src="./assets/trash1.ico" alt=""></td>
                </tr>`
        tbodyr.innerHTML += row;
        getFinalRatingPercentage(bookList[i].rating, count);
    }
}

function getFinalRatingPercentage(rating, count) {
    let percentageValue = 0;
    percentageValue = ((rating)/(5))*100;
    percentageValue = `${Math.trunc(percentageValue)}%`;
    document.getElementById(`innerStar${count}`).style.width = percentageValue;
}

function addMoreRows(bookList){
    let tbodyr = document.querySelector('tbody');
        let row = `<tr id="tbr" class="row">
                        <td>${bookList[bookList.length-1].id}</td>
                        <td>${bookList[bookList.length-1].title}</td>
                        <td>${bookList[bookList.length-1].author}</td>
                        <td>${bookList[bookList.length-1].price}</td>
                        <td>
                            <span id="rating">${bookList[bookList.length-1].rating}</span> | 
                            <div class="stars-outer">
                                <div id="innerStar${bookList.length}" class="stars-inner"></div>
                            </div>
                        </td>
                        <td><img src="./assets/trash1.ico" alt=""></td>
                </tr>`
        tbodyr.innerHTML += row;
        getFinalRatingPercentage(bookList[bookList.length-1].rating, bookList.length);
}

let selectedOption = (document.getElementById("options"));
selectedOption.addEventListener('change', getSelectValue, false);

function getSelectValue(){
    (document.getElementById("input1")).value="";
    let selectElement = (document.getElementById("options"));
    let selectedIndex = selectElement.selectedIndex;
    let option = selectElement.options[selectedIndex];
    let optionText = option.text;
    if(optionText=="Id"){
        (document.getElementById("input1")).placeholder = "Enter Book's Id";
        (document.getElementById("input1")).setAttribute("type", "number");
    }else if(optionText=="Title"){
        (document.getElementById("input1")).placeholder = "Enter Book's Title";
        (document.getElementById("input1")).setAttribute("type", "text");
    }else if(optionText=="Author"){
        (document.getElementById("input1")).placeholder = "Enter Book's Author";
        (document.getElementById("input1")).setAttribute("type", "text");
    }else if(optionText=="Min Rating"){
        (document.getElementById("input1")).placeholder = "Enter Min Rating";
        (document.getElementById("input1")).setAttribute("type", "number");
        (document.getElementById("input1")).setAttribute("step", "0.1");
    }else if(optionText=="Max Price"){
        (document.getElementById("input1")).placeholder = "Enter Max Price";
        (document.getElementById("input1")).setAttribute("type", "number");
        (document.getElementById("input1")).setAttribute("step", "0.01");
    }else{
        (document.getElementById("input1")).placeholder = "Enter Book's Detail";
        (document.getElementById("input1")).setAttribute("type", "text");
    }
}

(document.getElementById('formx')).addEventListener('submit', getFormData, false);

function getFormData(e){
    e.preventDefault();
    let selectElement = (document.getElementById("options"));
    let Indexi = selectElement.selectedIndex;
    let forms = (document.getElementById('formx'));
    let formData = new FormData(forms);
    var searchedData = formData.get('bookDetails');
    if(Indexi == 1){
        getBookById(searchedData);
    } else if(Indexi == 2){
        getBookByTitle(searchedData);
    } else if(Indexi == 3){
        getBookByAuthor(searchedData);
    } else if(Indexi == 4){
        getBooksByRating(searchedData);
    } else if(Indexi == 5){
        getBooksByPrice(searchedData);
    } else{
    }
}

function getBookById(data){
    let element = document.querySelectorAll('.row');
    for(let i=0; i<element.length; i++){
        if(element[i].cells[0].innerHTML==data){
            let header = element[0];
            let output = element[i];
            header.style.display = "block";
            output.style.display = "block";
        }else{
            let output = element[i]; 
            output.style.display = "none";
        }
    }
}

function getBookByTitle(data){
    let element = document.querySelectorAll('.row');
    for (let i = 0; i < element.length; i++) {
        if (element[i].cells[1].innerHTML === data) {
            let header = element[0];
            let output = element[i];
            header.style.display = "block";
            output.style.display = "block";
        } else {
            let output = element[i];
            output.style.display = "none";
        }
    }
}

function getBookByAuthor(data){
    let element = document.querySelectorAll('.row');
    for (let i = 0; i < element.length; i++) {
        if (element[i].cells[2].innerHTML === data) {
            let header = element[0];
            let output = element[i];
            header.style.display = "block";
            output.style.display = "block";
        } else {
            let output = element[i];
            output.style.display = "none";
        }
    }
}

function getBooksByRating(data){
    let element = document.querySelectorAll('.row');
    let allRatings = document.querySelectorAll('.row td span');
    console.log(allRatings);
    for(let i = 1; i < element.length; i++){
        if(allRatings[i-1].innerHTML >= data){
            let header = element[0];
            let output = element[i];
            header.style.display = "block";
            output.style.display = "block";
        }else{
            let output = element[i]; 
            output.style.display = "none";
        }
    }
}

function getBooksByPrice(data){
    let element = document.querySelectorAll('.row');
    for(let i=0; i<element.length; i++){
        if(element[i].cells[3].innerHTML<=data){
            let header = element[0];
            let output = element[i];
            header.style.display = "block";
            output.style.display = "block";
        }else{
            let output = element[i]; 
            output.style.display = "none";
        }
    }
}

(document.getElementById('clearBtn')).addEventListener('click', hideAllBooks, false);
        
function hideAllBooks(){
    (document.getElementById("input1")).placeholder = "Enter Book's Detail";
    let element = document.querySelectorAll('.row');
    let header = element[0];
    header.style.display = "none";
    for(let i=0; i<element.length; i++){
        let output = element[i];
        output.style.display = "none";
    }
}

let allBooks = (document.getElementById("a1"));
allBooks.addEventListener('click', displayAllBooks, false);

function displayAllBooks(){
    document.getElementById("addBooks").style.color = "white";
    document.getElementById("searchBooks").style.color = "white";
    document.getElementById("bookList").style.color = "gold";

    (document.getElementById("subHeading")).innerHTML = "Book List:";
    let formPart = (document.querySelector('.form'));
    formPart.style.display = "none";
    hideAddBookForm();
    let element = document.querySelectorAll('.row');
    let header = element[0];
    header.style.display = "block";
    for(let i=0; i<element.length; i++){
        let output = element[i];
        output.style.display = "block";
    }
}

let addBook1 = (document.getElementById("a2"));
addBook1.addEventListener('click', displayAddBookForm, false);

function displayAddBookForm(){
    document.getElementById("addBooks").style.color = "gold";
    document.getElementById("searchBooks").style.color = "white";
    document.getElementById("bookList").style.color = "white";
    
    (document.getElementById("subHeading")).innerHTML = "Add Book:";
    hideAllBooks();
    let formPart = (document.querySelector('.form'));
    formPart.style.display = "none";
    let addBookForm = (document.querySelector('.addBookForm'));
    addBookForm.style.display = "block";
}

let homePage = (document.getElementById("a3"));
homePage.addEventListener('click', displayHomePage, false);

function displayHomePage(){
    document.getElementById("addBooks").style.color = "white";
    document.getElementById("searchBooks").style.color = "gold";
    document.getElementById("bookList").style.color = "white";

    (document.getElementById("subHeading")).innerHTML = "Home Page:";
    (document.getElementById("formx")).reset();
    hideAddBookForm();
    hideAllBooks();
    let formPart = (document.querySelector('.form'));
    formPart.style.display = "block";
}

function hideAddBookForm(){
    let addBookForm = (document.querySelector('.addBookForm'));
    addBookForm.style.display = "none";
}

let addBook2 = (document.getElementById("ABF"));
addBook2.addEventListener('submit', addMoreBooks, false);

function addMoreBooks(e){
    e.preventDefault();
    let bookNo = bookList.length+1;
    console.log(bookNo);
    let idx = +(document.getElementById("i1")).value;
    let titlex = (document.getElementById("i2")).value;
    let authorx = (document.getElementById("i3")).value;
    let pricex = +(document.getElementById("i4")).value;
    let ratingx = +(document.getElementById("i5")).value;
    let bookx = {"id": idx, "title": titlex, "author": authorx, "price": pricex, "rating": ratingx};
    let book_s = JSON.stringify(bookx);
    localStorage.setItem("book"+bookNo, book_s);
    bookList.push(bookx);
    addMoreRows(bookList);
    addBook2.reset();
    displayAllBooks();
}

let deleteOption = (document.getElementById("tablex"));
deleteOption.addEventListener('mouseover', deleteSelectedRow, false);

function deleteSelectedRow(){
let index, table01 = (document.querySelector('.tbody'));
    for(let i = 0; i < table01.rows.length; i++){
        let row = table01.rows[i].cells[5];
        row.onclick = function(){
        index = table01.rows[i].rowIndex;
        console.log(index);
        let selectedBookId = +(table01.rows[i].cells[0].innerHTML);
        localStorage.removeItem("book"+index);
        console.log(selectedBookId);
        for(let book of bookList){
            if(book.id===selectedBookId){
                let indexd = bookList.indexOf(book);
                bookList.splice(indexd, 1);
                console.log("Deleted!!");
                table01.innerHTML="";
                buildTable(bookList);
                displayAllBooks();
            }
        }
    }
}
};

