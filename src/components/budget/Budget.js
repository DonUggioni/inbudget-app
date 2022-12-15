import React, { useState, useContext, useEffect } from "react";
import { ListValuesContext } from "../store/AppContext";

import "./Budget.scss";

function Budget() {
  const context = useContext(ListValuesContext);
  const [initialBudgetInput, setInitialBudgetInput] = useState("");
  const [initialBudgetName, setInitialBudgetName] = useState("");
  const [budgetInputEl, setBudgetInputEl] = useState(true);
  const [nameInputEl, setNameInputEl] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);

  function initialBudgetHandler(e) {
    e.preventDefault();

    if (isNaN(initialBudgetInput)) {
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
      context.addBudget(initialBudgetInput, initialBudgetName);
      context.getItemsList();
    }
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

  function createNewBudgetHandler() {
    setBudgetInputEl(false);
    setNameInputEl(false);
  }

  return (
    <div className='budget'>
      {!budgetInputEl && !nameInputEl && (
        <form className='budget__form'>
          {errorMsg && (
            <span className='budget__error_msg'>Must be a number</span>
          )}
          <div className='budget__input--wrapper'>
            <label className='budget__label' htmlFor='budget__input'>
              Budget -{" "}
            </label>
            <input
              className='budget__input'
              id='budget__input'
              name='budget__input'
              placeholder='Add initial budget.'
              onChange={(e) => setInitialBudgetInput(e.target.value)}
            />
          </div>
          <div className='budget__input--wrapper'>
            <label className='budget__label' htmlFor='budget__input'>
              Budget Name -{" "}
            </label>
            <input
              className='budget__input'
              id='budget__input'
              name='budget__input'
              placeholder='Add budget name.'
              onChange={(e) => setInitialBudgetName(e.target.value)}
            />
          </div>
          <button
            className='budget__add-btn'
            onClick={(e) => initialBudgetHandler(e)}
            type='submit'
          >
            Add
          </button>
        </form>
      )}
      {budgetInputEl && nameInputEl && (
        <>
          <span>Budget - </span>
          <h4>
            ${context.initialBudget[0]?.initialBudget} for{" "}
            {context.initialBudget[0]?.budgetName}
          </h4>
          <button
            className='budget__create_new--btn'
            onClick={createNewBudgetHandler}
          >
            Create new
          </button>
        </>
      )}
    </div>
  );
}

export default Budget;
