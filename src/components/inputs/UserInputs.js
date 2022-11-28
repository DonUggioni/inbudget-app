import React, { useContext, useEffect, useRef, useState } from 'react';
import { ListValuesContext } from '../store/AppContext';

import './UserInputs.scss';

function UserInputs() {
  const context = useContext(ListValuesContext);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);

  function submitHandler(e) {
    context.setType(type);
    context.setDescription(description);
    context.setAmount(amount);
    context.addExpense(description, type, amount);
    e.preventDefault();
  }

  return (
    <form onSubmit={(e) => submitHandler(e)} className="input">
      <div className="input__selectors-wrapper">
        <select
          className="input__selector"
          id="selector"
          defaultValue={'default'}
          onChange={(e) => setType(e.target.value)}
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
        // ref={descriptionRef}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="input__add-wrapper">
        <input
          // ref={amountRef}
          onChange={(e) => setAmount(e.target.value)}
          className="input__amount input_field"
          placeholder="Amount"
        />
        <button onClick={submitHandler} className="input__add-btn">
          Add
        </button>
      </div>
    </form>
  );
}

export default UserInputs;
