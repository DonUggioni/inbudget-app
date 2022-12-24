import React, { useState, useContext, useEffect } from 'react';
import AppContext, { ListValuesContext } from '../store/AppContext';

import './Budget.scss';

function Budget() {
  const context = useContext(ListValuesContext);
  const [initialBudgetInput, setInitialBudgetInput] = useState('');
  const [initialBudgetName, setInitialBudgetName] = useState('');
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
    }
  }

  function budgetSearchHandler(e) {
    console.log(e.target.value);
  }

  function deleteBudgetHandler() {
    context.deleteBudget();
  }

  useEffect(() => {
    function budgetInput() {
      if (context.budgetData.length === 0) {
        setBudgetInputEl(false);
        setNameInputEl(false);
      }

      if (context.budgetData.length > 0) {
        setBudgetInputEl(true);
        setNameInputEl(true);
      }
    }
    budgetInput();
  }, [context.budgetData]);

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
              Budget -{' '}
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
              Budget Name -{' '}
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
        <div className='budget__display--wrapper'>
          <div className='budget__btn-wrapper'>
            <button
              className='budget__create_new--btn'
              onClick={createNewBudgetHandler}
            >
              Create new
            </button>
            <button
              className='budget__create_new--btn'
              onClick={deleteBudgetHandler}
            >
              Delete
            </button>
            <select
              name='search'
              id='search'
              className='budget__search'
              onChange={(e) => budgetSearchHandler(e)}
            >
              <option value='default' disabled hidden>
                Search
              </option>
              {context.budgetData.map((item) => (
                <option value={item.budgetName} key={item.timeStamp}>
                  {item.budgetName}
                </option>
              ))}
            </select>
          </div>
          <div className='budget__info_display'>
            <span>Budget - </span>
            <h4>
              ${context.initialBudget[0]?.initialBudget} for{' '}
              {context.initialBudget[0]?.budgetName}
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default Budget;
