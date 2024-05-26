document.addEventListener('DOMContentLoaded', () => {
    let expenses = [];
    let incomes = [];

    const expenseForm = document.getElementById('expenseForm');
    const incomeForm = document.getElementById('incomeForm');
    const expenseList = document.getElementById('expenseList');
    const incomeList = document.getElementById('incomeList');
    const totalExpensesElem = document.getElementById('totalExpenses');
    const totalIncomesElem = document.getElementById('totalIncomes');
    const weeklyTotalElem = document.getElementById('weeklyTotal');

    expenseForm.addEventListener('submit', event => {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const name = document.getElementById('expenseName').value;
        if (amount && name) {
            expenses.push({ amount, name });
            updateExpenses();
            expenseForm.reset();
        }
    });

    incomeForm.addEventListener('submit', event => {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('incomeAmount').value);
        const name = document.getElementById('incomeName').value;
        if (amount && name) {
            incomes.push({ amount, name });
            updateIncomes();
            incomeForm.reset();
        }
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
});
