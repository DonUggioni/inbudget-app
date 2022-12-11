import React, { useState, useContext, useEffect } from 'react';
import { ListValuesContext } from '../store/AppContext';

import './Budget.scss';

function Budget() {
  const context = useContext(ListValuesContext);
  const [initialBudgetInput, setInitialBudgetInput] = useState('');
  const [budgetInputEl, setBudgetInputEl] = useState(false);

  function initialBudgetHandler(e) {
    e.preventDefault();
    // context.setInitialBudget(initialBudgetInput);
    context.addBudget(initialBudgetInput);
  }

  useEffect(() => {
    function budgetInput() {
      if (context.initialBudget.length === 0) {
        setBudgetInputEl(true);
      }

      if (context.initialBudget.length > 0) {
        setBudgetInputEl(false);
      }
    }
    budgetInput();
  }, [context.initialBudget]);

  return (
    <div className="budget">
      {budgetInputEl && (
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
            onChange={(e) => setInitialBudgetInput(e.target.value)}
          />
        </form>
      )}
      {!budgetInputEl && (
        <>
          <span>Budget - </span>
          <h4>${context.initialBudget[0]?.initialBudget}</h4>
          {/* <button onClick={editBudgetHandler} className="budget__edit--btn">
            Edit
          </button> */}
        </>
      )}
    </div>
  );
}

export default Budget;
