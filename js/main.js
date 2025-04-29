import { addExpensesFn, deleteExpensesFn, expenses } from './expenses.js';


document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('button');

    submitBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value.trim();
        const amount = parseFloat(document.getElementById('amount').value);
        let type;
        if (document.getElementById('itemType').value === "1") {
          type = "Income";
        } else {
          type = "Expense";
        }

        try {
            addExpensesFn(name, amount, type);
            updateDOM();
            recalculateTotals();
            resetInputs();
        } catch (err) {
            alert(err.message);
        }
    });
});

function updateDOM() {
    const table = document.getElementById('table');
    const lastItem = expenses[expenses.length - 1];

    const row = table.insertRow(-1);
    row.setAttribute('data-id', lastItem.id);

    row.innerHTML = `
        <td>${lastItem.id}</td>
        <td>${lastItem.name}</td>
        <td>${lastItem.amount}</td>
        <td>${lastItem.type}</td>
        <td><button class="delete-btn" data-id="${lastItem.id}"><i class="bi bi-trash3"></i></button></td>
    `;

    deleteHandlers();
}

function deleteHandlers() {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.onclick = function () {
            const id = parseInt(this.getAttribute('data-id'));
            deleteExpensesFn(id);
            refreshTable();
            recalculateTotals();
        };
    });
}

function resetInputs() {
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('itemType').value = '0';
}

function refreshTable() {
    const table = document.getElementById('table');

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    expenses.forEach(item => {
        const row = table.insertRow(-1);
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.amount}</td>
            <td>${item.type}</td>
            <td><button class="delete-btn" data-id="${item.id}"><i class="bi bi-trash3"></button></td>
        `;
    });

    deleteHandlers();
}

function recalculateTotals() {
    const incomeTotal = expenses
        .filter(e => e.type === "Income")
        .reduce((sum, item) => sum + item.amount, 0);

    const expenseTotal = expenses
        .filter(e => e.type === "Expense")
        .reduce((sum, item) => sum + item.amount, 0);

    const balance = incomeTotal - expenseTotal;

    document.getElementById('updatedIncome').textContent = incomeTotal;
    document.getElementById('updatedExp').textContent = expenseTotal;
    document.getElementById('updatedBalance').textContent = balance;
}
