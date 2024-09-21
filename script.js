document.getElementById('expense-form').addEventListener('submit', addExpense);
document.getElementById('filter-category').addEventListener('change', filterExpenses);

let expenses = [];

function addExpense(event) {
    event.preventDefault();

    const expenseName = document.getElementById('expense').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    const expense = { expenseName, amount, category, date, id: Date.now() };
    expenses.push(expense);
    updateExpenseList();
    updateTotalExpense();

    // Reset the form
    document.getElementById('expense-form').reset();
}

function updateExpenseList(filteredExpenses = expenses) {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    filteredExpenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <p>${expense.expenseName} - $${expense.amount} (${expense.category}) on ${expense.date}</p>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
    });
}

function updateTotalExpense() {
    const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('total-expense').textContent = totalExpense.toFixed(2);
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateExpenseList();
    updateTotalExpense();
}

function filterExpenses() {
    const selectedCategory = document.getElementById('filter-category').value;
    const filteredExpenses = selectedCategory === 'All'
        ? expenses
        : expenses.filter(expense => expense.category === selectedCategory);
    
    updateExpenseList(filteredExpenses);
}