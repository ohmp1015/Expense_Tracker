import React, { useState } from 'react';

function AddIncomeForm({ onAddIncome }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Salary');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddIncome({
      amount: parseFloat(amount),
      description,
      category,
    });
    setAmount('');
    setDescription('');
    setCategory('Salary');
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4>Add Income</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-control"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Investment">Investment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success">Add Income</button>
        </form>
      </div>
    </div>
  );
}

export default AddIncomeForm;
