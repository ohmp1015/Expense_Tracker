import React from 'react';

function BalanceSummary({ totalIncome, totalExpense, balance }) {
  return (
    <div className="row mb-5">
      <div className="col-md-4">
        <div className="card bg-success text-white">
          <div className="card-body text-center">
            <i className="ri-wallet-3-line ri-3x mb-3"></i>
            <h5 className="card-title">Total Income</h5>
            <h3 className="amount-display">₹{totalIncome.toFixed(2)}</h3>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card bg-danger text-white">
          <div className="card-body text-center">
            <i className="ri-shopping-cart-2-line ri-3x mb-3"></i>
            <h5 className="card-title">Total Expenses</h5>
            <h3 className="amount-display">₹{totalExpense.toFixed(2)}</h3>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card bg-info text-white">
          <div className="card-body text-center">
            <i className="ri-scales-3-line ri-3x mb-3"></i>
            <h5 className="card-title">Balance</h5>
            <h3 className="amount-display">₹{balance.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceSummary;
