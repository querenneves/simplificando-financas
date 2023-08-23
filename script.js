let transactions = [];
let balance = 0;

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (description.trim() === '' || isNaN(amount) || date.trim() === '' || paymentMethod.trim() === '') {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    transactions.push({ description, amount, date, paymentMethod });
    updateTransactionList();
    updateBalance();
}

function updateTransactionList() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    for (const transaction of transactions) {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.description}: R$ ${transaction.amount.toFixed(2)} - Data: ${transaction.date} - Forma de Pagamento: ${transaction.paymentMethod}`;
        transactionList.appendChild(listItem);
    }
}

function updateBalance() {
    balance = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    const balanceAmount = document.getElementById('balanceAmount');
    balanceAmount.textContent = `R$ ${balance.toFixed(2)}`;
}

function exportTransactions() {
    if (transactions.length === 0) {
        alert('Não há registros para exportar.');
        return;
    }

    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros Financeiros');

    const filename = 'registros_financeiros.xlsx';
    XLSX.writeFile(workbook, filename);
}
