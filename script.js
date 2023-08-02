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

    const doc = new pdfkit();
    const filename = 'registros_financeiros.pdf';

    doc.pipe(fs.createWriteStream(filename));

    // Conteúdo do PDF
    doc.fontSize(20).text('Registros Financeiros', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12);

    for (const transaction of transactions) {
        doc.text(`Descrição: ${transaction.description}`);
        doc.text(`Valor: R$ ${transaction.amount.toFixed(2)}`);
        doc.text(`Data: ${transaction.date}`);
        doc.text(`Forma de Pagamento: ${transaction.paymentMethod}`);
        doc.moveDown();
    }

    doc.end();

    const url = URL.createObjectURL(new Blob([doc], { type: 'application/pdf' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
