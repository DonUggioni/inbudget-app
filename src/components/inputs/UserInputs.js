import React, { useContext, useRef, useState } from 'react';
import { ListValuesContext } from '../store/AppContext';

import './UserInputs.scss';

function UserInputs() {
  const context = useContext(ListValuesContext);
  const [type, setType] = useState('');
  const descriptionRef = useRef();
  const amountRef = useRef();

  function submitHandler(e) {
    context.setDescription(descriptionRef.current.value);
    context.setAmount(Number(amountRef.current.value));
    context.setType(type);
    context.addExpenseHandler();
    e.preventDefault();
  }

  return (
    <form onSubmit={() => submitHandler} className="input">
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
        ref={descriptionRef}
      />
      <div className="input__add-wrapper">
        <input
          ref={amountRef}
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
