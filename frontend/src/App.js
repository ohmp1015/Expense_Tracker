import React, { useState, useEffect } from 'react';
import BalanceSummary from './components/BalanceSummary';
import AddExpenseForm from './components/AddExpenseForm';
import AddIncomeForm from './components/AddIncomeForm';
import ExpenseList from './components/ExpenseList';
import IncomeList from './components/IncomeList';
import ErrorModal from './components/ErrorModal';

/**
 * Main App component for Expense Tracker.
 * Manages state for expenses, incomes, totals, balance, and error messages.
 * Handles API calls to backend for CRUD operations.
 */
function App() {
  // State variables for transactions and UI
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);

  // Fetch all transactions from backend API
  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setExpenses(data.expenses);
      setIncomes(data.incomes);

      // Calculate totals and balance
      const expenseSum = data.expenses.reduce((sum, item) => sum + item.amount, 0);
      const incomeSum = data.incomes.reduce((sum, item) => sum + item.amount, 0);
      setTotalExpense(expenseSum);
      setTotalIncome(incomeSum);
      setBalance(incomeSum - expenseSum);
    } catch (err) {
      setError('Failed to fetch transactions');
    }
  };

  // Load transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Helper function to handle API requests with error handling
  const apiRequest = async (url, options, errorMessage) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || errorMessage);
      }
      await fetchTransactions();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handlers for CRUD operations
  const handleAddExpense = (expense) => {
    apiRequest('/api/transactions/expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    }, 'Failed to add expense');
  };

  const handleAddIncome = (income) => {
    apiRequest('/api/transactions/income', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(income),
    }, 'Failed to add income');
  };

  const handleDeleteExpense = (id) => {
    apiRequest(`/api/transactions/expense/${id}`, { method: 'DELETE' }, 'Failed to delete expense');
  };

  const handleDeleteIncome = (id) => {
    apiRequest(`/api/transactions/income/${id}`, { method: 'DELETE' }, 'Failed to delete income');
  };

  const handleUpdateExpense = (id, updatedExpense) => {
    apiRequest(`/api/transactions/expense/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExpense),
    }, 'Failed to update expense');
  };

  const handleUpdateIncome = (id, updatedIncome) => {
    apiRequest(`/api/transactions/income/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedIncome),
    }, 'Failed to update income');
  };

  // Close error modal
  const closeErrorModal = () => {
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4"><i className="ri-money-dollar-circle-line"></i> Expense Tracker</h1>
      <BalanceSummary totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
      <div className="row">
        <div className="col-md-6">
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </div>
        <div className="col-md-6">
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
            onUpdateExpense={handleUpdateExpense}
          />
        </div>
        <div className="col-md-6">
          <IncomeList
            incomes={incomes}
            onDeleteIncome={handleDeleteIncome}
            onUpdateIncome={handleUpdateIncome}
          />
        </div>
      </div>
      {error && <ErrorModal message={error} onClose={closeErrorModal} />}
    </div>
  );
}

export default App;
