// Define an array to store transactions
let transactions = [];

// Function to add a new transaction
function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    
    // Create a new transaction object
    const transaction = {
        description: description,
        amount: amount,
        date: date,
        paymentMethod: paymentMethod
    };
    
    // Add the transaction to the array
    transactions.push(transaction);
    
    // Update the transaction list and balance
    updateTransactionList();
    updateBalance();
}

// Function to update the transaction list
function updateTransactionList() {
    const transactionList = document.getElementById("transactionList");
    transactionList.innerHTML = ""; // Clear the list
    
    transactions.forEach(transaction => {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.description} - R$ ${transaction.amount.toFixed(2)} - ${transaction.date} - ${transaction.paymentMethod}`;
        transactionList.appendChild(listItem);
    });
}

// Function to update the balance
function updateBalance() {
    const balanceAmount = document.getElementById("balanceAmount");
    const totalAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    balanceAmount.textContent = `R$ ${totalAmount.toFixed(2)}`;
}

// Function to export transactions (not implemented here)
function exportTransactions() {
    // Implement your export logic here
}

// Function to handle logo upload (not implemented here)
function handleLogoUpload(event) {
    // Implement your logo upload logic here
}

// Attach click event listener to the "Adicionar Transação" button
const addTransactionButton = document.getElementById("addTransactionButton");
addTransactionButton.addEventListener("click", addTransaction);
