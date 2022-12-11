import React, { useState, useContext, useEffect } from 'react';
import { ListValuesContext } from '../store/AppContext';

import './Budget.scss';

function Budget() {
  const context = useContext(ListValuesContext);
  const [initialBudgetInput, setInitialBudgetInput] = useState('');
  const [initialBudgetName, setInitialBudgetName] = useState('');
  const [budgetInputEl, setBudgetInputEl] = useState(true);
  const [nameInputEl, setNameInputEl] = useState(true);

  function initialBudgetHandler(e) {
    e.preventDefault();
    // context.setInitialBudget(initialBudgetInput);
    context.addBudget(initialBudgetInput, initialBudgetName);
  }

  useEffect(() => {
    function budgetInput() {
      if (
        context.initialBudget.length === 0 ||
        context.budgetName.length === 0
      ) {
        setBudgetInputEl(false);
        setNameInputEl(false);
      }

      if (context.initialBudget.length > 0 && context.budgetName.length === 0) {
        setBudgetInputEl(true);
        setNameInputEl(true);
      }
    }
    budgetInput();
  }, [context.initialBudget, context.budgetName]);

  return (
    <div className="budget">
      {!budgetInputEl && !nameInputEl && (
        <form
          onSubmit={(e) => initialBudgetHandler(e)}
          className="budget__form"
        >
          <div className="budget__input--wrapper">
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
            <button className="budget__add-btn">Add</button>
          </div>
          <div className="budget__input--wrapper">
            <label className="budget__label" htmlFor="budget__input">
              Budget Name -{' '}
            </label>
            <input
              className="budget__input"
              id="budget__input"
              name="budget__input"
              placeholder="Add budget name."
              onChange={(e) => setInitialBudgetName(e.target.value)}
            />
            <button className="budget__add-btn">Add</button>
          </div>
        </form>
      )}
      {budgetInputEl && nameInputEl && (
        <>
          <span>Budget - </span>
          <h4>
            ${context.initialBudget[0]?.initialBudget} for{' '}
            {context.initialBudget[0]?.budgetName}
          </h4>
          {/* <button onClick={editBudgetHandler} className="budget__edit--btn">
            Edit
          </button> */}
        </>
      )}
    </div>
  );
}

export default Budget;
