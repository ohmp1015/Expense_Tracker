import React, { useState } from 'react';

function ExpenseList({ expenses, onDeleteExpense, onUpdateExpense }) {
  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const startEdit = (expense) => {
    setEditId(expense._id);
    setEditAmount(expense.amount);
    setEditDescription(expense.description);
    setEditCategory(expense.category);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditAmount('');
    setEditDescription('');
    setEditCategory('');
  };

  const saveEdit = () => {
    onUpdateExpense(editId, {
      amount: parseFloat(editAmount),
      description: editDescription,
      category: editCategory,
    });
    cancelEdit();
  };

  return (
    <div>
      <h3><i className="ri-arrow-right-circle-line"></i> Recent Expenses</h3>
      <div className="list-group">
        {expenses.map((expense) => (
          <div key={expense._id} className="list-group-item">
            {editId === expense._id ? (
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
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>
                <button className="btn btn-primary btn-sm me-2" onClick={saveEdit}>Save</button>
                <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">₹{expense.amount.toFixed(2)}</h5>
                  <p className="mb-1">{expense.description}</p>
                  <small>Category: {expense.category}</small><br />
                  <small>Date: {new Date(expense.date).toLocaleString()}</small>
                </div>
                <div>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-warning" onClick={() => startEdit(expense)}>
                      <i className="ri-edit-line"></i> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        if (window.confirm('Are you sure?')) {
                          onDeleteExpense(expense._id);
                        }
                      }}
                    >
                      <i className="ri-delete-bin-line"></i> Delete
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

export default ExpenseList;
