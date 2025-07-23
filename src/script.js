document.addEventListener('DOMContentLoaded', () => {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let incomes = JSON.parse(localStorage.getItem('incomes')) || [];

    const expenseForm = document.getElementById('expenseForm');
    const expenseForm2 = document.getElementById('expenseForm2');
    const expenseForm3 = document.getElementById('expenseForm3');

    const incomeForm = document.getElementById('incomeForm');
    const incomeForm2 = document.getElementById('incomeForm2');
    const incomeForm3 = document.getElementById('incomeForm3');

    const expenseList = document.getElementById('expenseList');
    const incomeList = document.getElementById('incomeList');
    const totalExpensesElem = document.getElementById('totalExpenses');
    const totalIncomesElem = document.getElementById('totalIncomes');
    const weeklyTotalElem = document.getElementById('weeklyTotal');

    // Load existing data into UI on page load
    updateExpenses();
    updateIncomes();

    // Attach all expense forms
    [expenseForm, expenseForm2, expenseForm3].forEach((form, index) => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const amountField = form.querySelector('input[type="number"]');
            const nameField = form.querySelector('input[type="text"]');
            const amount = parseFloat(amountField.value);
            const name = nameField.value;

            if (amount && name) {
                expenses.push({ amount, name });
                saveData();
                updateExpenses();
                form.reset();
            }
        });
    });

    // Attach all income forms
    [incomeForm, incomeForm2, incomeForm3].forEach((form, index) => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const amountField = form.querySelector('input[type="number"]');
            const nameField = form.querySelector('input[type="text"]');
            const amount = parseFloat(amountField.value);
            const name = nameField.value;

            if (amount && name) {
                incomes.push({ amount, name });
                saveData();
                updateIncomes();
                form.reset();
            }
        });
    });

    function updateExpenses() {
        expenseList.innerHTML = '';
        let totalExpenses = 0;
        expenses.forEach(expense => {
            totalExpenses += expense.amount;
            const li = document.createElement('li');
            li.textContent = `$${expense.amount}, ${expense.name}`;
            expenseList.appendChild(li);
        });
        totalExpensesElem.textContent = totalExpenses.toFixed(2);
        updateWeeklyTotal();
    }

    function updateIncomes() {
        incomeList.innerHTML = '';
        let totalIncomes = 0;
        incomes.forEach(income => {
            totalIncomes += income.amount;
            const li = document.createElement('li');
            li.textContent = `$${income.amount}, ${income.name}`;
            incomeList.appendChild(li);
        });
        totalIncomesElem.textContent = totalIncomes.toFixed(2);
        updateWeeklyTotal();
    }

    function updateWeeklyTotal() {
        const totalExpenses = parseFloat(totalExpensesElem.textContent);
        const totalIncomes = parseFloat(totalIncomesElem.textContent);
        const weeklyTotal = totalIncomes - totalExpenses;
        weeklyTotalElem.textContent = weeklyTotal.toFixed(2);
    }

    function saveData() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
        localStorage.setItem('incomes', JSON.stringify(incomes));
    }
});
