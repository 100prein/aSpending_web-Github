document.addEventListener('DOMContentLoaded', async () => {
  let expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
  let incomes = JSON.parse(localStorage.getItem("incomes") || "[]");
  let notes = JSON.parse(localStorage.getItem("notes") || "[]");

  let currentUser = null;

  const expenseList = document.getElementById('expenseList');
  const incomeList = document.getElementById('incomeList');
  const totalExpensesElem = document.getElementById('totalExpenses');
  const totalIncomesElem = document.getElementById('totalIncomes');
  const weeklyTotalElem = document.getElementById('weeklyTotal');

  // ✅ Local helper: Save to LocalStorage
  function saveLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("incomes", JSON.stringify(incomes));
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // ✅ Sync with Supabase if logged in
  async function syncWithSupabase() {
    if (!currentUser) return;

    await supabase.from("user_data")
      .upsert({
        user_id: currentUser.id,
        expenses,
        incomes,
        notes,
        updated_at: new Date()
      }, { onConflict: "user_id" });

    console.log("✅ Synced with Supabase!");
  }

  // ✅ Load from Supabase if logged in
  async function loadFromSupabase() {
    if (!currentUser) return;

    const { data, error } = await supabase
      .from("user_data")
      .select("*")
      .eq("user_id", currentUser.id)
      .single();

    if (data) {
      console.log("✅ Loaded from Supabase");
      expenses = data.expenses || [];
      incomes = data.incomes || [];
      notes = data.notes || [];
      saveLocal(); // update local too
      updateUI();
    }
  }

  // ✅ Update UI after changes
  function updateUI() {
    // Update Expenses
    expenseList.innerHTML = '';
    let totalExpenses = 0;
    expenses.forEach(expense => {
      totalExpenses += expense.amount;
      const li = document.createElement('li');
      li.textContent = `$${expense.amount}, ${expense.name}`;
      expenseList.appendChild(li);
    });
    totalExpensesElem.textContent = totalExpenses.toFixed(2);

    // Update Incomes
    incomeList.innerHTML = '';
    let totalIncomes = 0;
    incomes.forEach(income => {
      totalIncomes += income.amount;
      const li = document.createElement('li');
      li.textContent = `$${income.amount}, ${income.name}`;
      incomeList.appendChild(li);
    });
    totalIncomesElem.textContent = totalIncomes.toFixed(2);

    // Weekly total
    weeklyTotalElem.textContent = (totalIncomes - totalExpenses).toFixed(2);
  }

  // ✅ Auth setup
  const emailInput = document.getElementById('email');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const authStatus = document.getElementById('authStatus');

  loginBtn.addEventListener('click', async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: emailInput.value,
    });

    if (error) {
      authStatus.textContent = `Error: ${error.message}`;
    } else {
      authStatus.textContent = "Check your email for a login link!";
    }
  });

  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    currentUser = null;
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline";
    authStatus.textContent = "Logged out";
  });

  // ✅ Check for session
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    currentUser = session.user;
    authStatus.textContent = `Logged in as ${currentUser.email}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
    await loadFromSupabase();
  }

  // ✅ Listen for login events
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      currentUser = session.user;
      authStatus.textContent = `Logged in as ${currentUser.email}`;
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline";
      await loadFromSupabase();
    }
  });

  // ✅ Hook into your expense/income form submissions
  function addExpense(amount, name) {
    expenses.push({ amount, name });
    saveLocal();
    updateUI();
    syncWithSupabase();
  }

  function addIncome(amount, name) {
    incomes.push({ amount, name });
    saveLocal();
    updateUI();
    syncWithSupabase();
  }

  // Example usage: hook into your form submission
  document.getElementById('expenseForm').addEventListener('submit', e => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const name = document.getElementById('expenseName').value;
    if (amount && name) addExpense(amount, name);
  });

  document.getElementById('incomeForm').addEventListener('submit', e => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('incomeAmount').value);
    const name = document.getElementById('incomeName').value;
    if (amount && name) addIncome(amount, name);
  });

  // ✅ Load initial local data
  updateUI();
});
