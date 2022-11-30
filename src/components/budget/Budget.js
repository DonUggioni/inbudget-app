import React, { useState, useContext, useRef } from 'react';
import { ListValuesContext } from '../store/AppContext';

import './Budget.scss';

function Budget() {
  const context = useContext(ListValuesContext);
  const [initialBudgetInput, setInitialBudgetInput] = useState(true);
  const budgetInputRef = useRef(null);

  function initialBudgetHandler(e) {
    e.preventDefault();
    context.setInitialBudget(+budgetInputRef.current.value);
    setInitialBudgetInput(false);
  }

  function editBudgetHandler() {
    setInitialBudgetInput(true);
  }

  return (
    <div className="budget">
      {initialBudgetInput && (
        <form
          onSubmit={(e) => initialBudgetHandler(e)}
          className="budget__form"
        >
          <label className="budget__label" htmlFor="budget__input">
            Budget -{' '}
          </label>
          <input
            className="budget__input"
            id="budget__input"
            name="budget__input"
            placeholder="Add initial budget."
            ref={budgetInputRef}
          />
        </form>
      )}
      {!initialBudgetInput && (
        <>
          <span>Budget - </span>
          <h4>${context.initialBudget}</h4>
          <button onClick={editBudgetHandler} className="budget__edit--btn">
            Edit
          </button>
        </>
      )}
    </div>
  );
}

export default Budget;
