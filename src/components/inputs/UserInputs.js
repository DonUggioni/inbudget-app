import React from 'react';

import './UserInputs.scss';

function UserInputs() {
  return (
    <form className="input">
      <div className="input__selectors-wrapper">
        <select
          className="input__selector"
          id="selector"
          defaultValue={'default'}
        >
          <option value="default" disabled hidden>
            Type
          </option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <input
        className="input__expense-description input_field"
        placeholder="Add a description"
      />
      <div className="input__add-wrapper">
        <input className="input__amount input_field" placeholder="Amount" />
        <button className="input__add-btn">Add</button>
      </div>
    </form>
  );
}

export default UserInputs;
