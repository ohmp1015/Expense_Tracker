/**
 * Transaction model schema for MongoDB using Mongoose.
 * Represents an income or expense transaction with amount, description, category, date, and type.
 */

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['expense', 'income'],
    required: true,
  },
});

// Create and export the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
