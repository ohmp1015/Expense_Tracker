import React, { useState } from 'react';

function IncomeList({ incomes, onDeleteIncome, onUpdateIncome }) {
  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const startEdit = (income) => {
    setEditId(income._id);
    setEditAmount(income.amount);
    setEditDescription(income.description);
    setEditCategory(income.category);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditAmount('');
    setEditDescription('');
    setEditCategory('');
  };

  const saveEdit = () => {
    onUpdateIncome(editId, {
      amount: parseFloat(editAmount),
      description: editDescription,
      category: editCategory,
    });
    cancelEdit();
  };

  return (
    <div>
      <h3><i className="ri-arrow-left-circle-line"></i> Recent Income</h3>
      <div className="list-group">
        {incomes.map((income) => (
          <div key={income._id} className="list-group-item">
            {editId === income._id ? (
              <div>
                <input
                  type="number"
                  step="0.01"
                  className="form-control mb-2"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <select
                  className="form-control mb-2"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Investment">Investment</option>
                  <option value="Other">Other</option>
                </select>
                <button className="btn btn-primary btn-sm me-2" onClick={saveEdit}>Save</button>
                <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">₹{income.amount.toFixed(2)}</h5>
                  <p className="mb-1">{income.description}</p>
                  <small>Category: {income.category}</small><br />
                  <small>Date: {new Date(income.date).toLocaleString()}</small>
                </div>
                <div>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-warning" onClick={() => startEdit(income)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        if (window.confirm('Are you sure?')) {
                          onDeleteIncome(income._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncomeList;
