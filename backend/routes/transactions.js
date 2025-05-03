/**
 * Express router for handling transaction-related API endpoints.
 * Supports CRUD operations for expenses and incomes.
 */

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

/**
 * GET /api/transactions
 * Fetch all expenses and incomes, sorted by date descending.
 */
router.get('/', async (req, res) => {
  try {
    const expenses = await Transaction.find({ type: 'expense' }).sort({ date: -1 });
    const incomes = await Transaction.find({ type: 'income' }).sort({ date: -1 });
    res.json({ expenses, incomes });
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/**
 * POST /api/transactions/expense
 * Add a new expense after checking available balance.
 */
router.post('/expense', async (req, res) => {
  const { amount, description, category } = req.body;

  try {
    // Calculate current balance
    const incomes = await Transaction.find({ type: 'income' });
    const expenses = await Transaction.find({ type: 'expense' });

    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
    const availableBalance = totalIncome - totalExpense;

    if (availableBalance < amount) {
      return res.status(400).json({ success: false, message: 'Not enough balance! Please add income first.' });
    }

    // Create and save new expense
    const newExpense = new Transaction({
      amount,
      description,
      category,
      type: 'expense',
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * POST /api/transactions/income
 * Add a new income.
 */
router.post('/income', async (req, res) => {
  const { amount, description, category } = req.body;

  const newIncome = new Transaction({
    amount,
    description,
    category,
    type: 'income',
  });

  try {
    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /api/transactions/expense/:id
 * Delete an expense by ID.
 */
router.delete('/expense/:id', async (req, res) => {
  try {
    const deletedExpense = await Transaction.findOneAndDelete({ _id: req.params.id, type: 'expense' });
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * DELETE /api/transactions/income/:id
 * Delete an income by ID.
 */
router.delete('/income/:id', async (req, res) => {
  try {
    const deletedIncome = await Transaction.findOneAndDelete({ _id: req.params.id, type: 'income' });
    if (!deletedIncome) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json({ message: 'Income deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * PUT /api/transactions/expense/:id
 * Update an expense by ID.
 */
router.put('/expense/:id', async (req, res) => {
  try {
    const expense = await Transaction.findOne({ _id: req.params.id, type: 'expense' });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { amount, description, category } = req.body;
    expense.amount = amount;
    expense.description = description;
    expense.category = category;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * PUT /api/transactions/income/:id
 * Update an income by ID.
 */
router.put('/income/:id', async (req, res) => {
  try {
    const income = await Transaction.findOne({ _id: req.params.id, type: 'income' });
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    const { amount, description, category } = req.body;
    income.amount = amount;
    income.description = description;
    income.category = category;

    const updatedIncome = await income.save();
    res.json(updatedIncome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
