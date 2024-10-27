$(document).ready(function() {
    loadBooks();
    loadMembers();
    loadLoanTransactions();
});

// Load data books
function loadBooks() {
    $.get("/api/books", function(data) {
        let bookTableBody = $("#bookTable tbody");
        bookTableBody.empty();
        data.forEach(function(book) {
            bookTableBody.append(`
                <tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editBook(${book.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button>
                    </td>
                </tr>
            `);
        });
    });
}

// Add or update book
$("#bookForm").submit(function(e) {
    e.preventDefault();
    let id = $("#bookId").val();
    let url = id ? `/api/books/${id}` : "/api/books";
    let method = id ? "PUT" : "POST";

    $.ajax({
        url: url,
        method: method,
        contentType: "application/json",
        data: JSON.stringify({
            title: $("#title").val(),
            author: $("#author").val(),
            isbn: $("#isbn").val()
        }),
        success: function() {
            $("#bookForm")[0].reset();
            loadBooks();
        }
    });
});

function editBook(id) {
    $.get(`/api/books/${id}`, function(book) {
        $("#bookId").val(book.id);
        $("#title").val(book.title);
        $("#author").val(book.author);
        $("#isbn").val(book.isbn);
    });
}

function deleteBook(id) {
    $.ajax({
        url: `/api/books/${id}`,
        method: "DELETE",
        success: function() {
            loadBooks();
        }
    });
}

// Load data members
function loadMembers() {
    $.get("/api/members", function(data) {
        let memberTableBody = $("#memberTable tbody");
        memberTableBody.empty();
        data.forEach(function(member) {
            memberTableBody.append(`
                <tr>
                    <td>${member.id}</td>
                    <td>${member.name}</td>
                    <td>${member.email}</td>
                    <td>${member.membershipDate}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editMember(${member.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteMember(${member.id})">Delete</button>
                    </td>
                </tr>
            `);
        });
    });
}

// Add or update member
$("#memberForm").submit(function(e) {
    e.preventDefault();
    let id = $("#memberId").val();
    let url = id ? `/api/members/${id}` : "/api/members";
    let method = id ? "PUT" : "POST";

    $.ajax({
        url: url,
        method: method,
        contentType: "application/json",
        data: JSON.stringify({
            name: $("#name").val(),
            email: $("#email").val(),
            membershipDate: $("#membershipDate").val()
        }),
        success: function() {
            $("#memberForm")[0].reset();
            loadMembers();
        }
    });
});

function editMember(id) {
    $.get(`/api/members/${id}`, function(member) {
        $("#memberId").val(member.id);
        $("#name").val(member.name);
        $("#email").val(member.email);
        $("#membershipDate").val(member.membershipDate);
    });
}

function deleteMember(id) {
    $.ajax({
        url: `/api/members/${id}`,
        method: "DELETE",
        success: function() {
            loadMembers();
        }
    });
}

// Load data loan transactions
function loadLoanTransactions() {
    $.get("/api/loans", function(data) {
        let loanTableBody = $("#loanTable tbody");
        loanTableBody.empty();
        data.forEach(function(loan) {
            loanTableBody.append(`
                <tr>
                    <td>${loan.id}</td>
                    <td>${loan.book.title}</td>
                    <td>${loan.member.name}</td>
                    <td>${loan.borrowDate}</td>
                    <td>${loan.returnDate}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editLoan(${loan.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteLoan(${loan.id})">Delete</button>
                    </td>
                </tr>
            `);
        });
    });
}

// Add or update loan transaction
$("#loanForm").submit(function(e) {
    e.preventDefault();
    let id = $("#loanId").val();
    let url = id ? `/api/loans/${id}` : "/api/loans";
    let method = id ? "PUT" : "POST";

    $.ajax({
        url: url,
        method: method,
        contentType: "application/json",
        data: JSON.stringify({
            book: $("#book").val(),
            member: $("#member").val(),
            borrowDate: $("#borrowDate").val(),
            returnDate: $("#returnDate").val()
        }),
        success: function() {
            $("#loanForm")[0].reset();
            loadLoanTransactions();
        }
    });
});

function editLoan(id) {
    $.get(`/api/loans/${id}`, function(loan) {
        $("#loanId").val(loan.id);
        $("#book").val(loan.book.id);
        $("#member").val(loan.member.id);
        $("#borrowDate").val(loan.borrowDate);
        $("#returnDate").val(loan.returnDate);
    });
}

function deleteLoan(id) {
    $.ajax({
        url: `/api/loans/${id}`,
        method: "DELETE",
        success: function() {
            loadLoanTransactions();
        }
    });
}
