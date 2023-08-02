let transactions = [];
let balance = 0;

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (description.trim() === '' || isNaN(amount)) {
        alert('Por favor, preencha a descrição e o valor corretamente.');
        return;
    }

    transactions.push({ description, amount });
    updateTransactionList();
    updateBalance();
}

function updateTransactionList() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    for (const transaction of transactions) {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.description}: R$ ${transaction.amount.toFixed(2)}`;
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

    const data = JSON.stringify(transactions);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registros_financeiros.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

