import React, { useContext, useEffect } from 'react';
import { ListValuesContext } from '../store/AppContext';

import './Remaining.scss';

function Remaining() {
  const context = useContext(ListValuesContext);

  useEffect(() => {
    const incomeArr = [];

    context.setRemaining(
      +context.initialBudget[context.searchOptionIndex]?.initialBudget -
        +context?.expensesTotal
    );

    context.expensesList.forEach((item) => {
      if (item.type === 'income') {
        incomeArr.push(item.amount);
        context.setRemaining(
          +context.initialBudget[context.searchOptionIndex]?.initialBudget +
            incomeArr?.reduce((prev, curr) => prev + curr, 0) -
            +context?.expensesTotal
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    context.expensesList,
    context.expensesTotal,
    context.initialBudget,
    context.expensesListName,
  ]);

  return (
    <div className='remaining'>
      <span>Remaining - </span>
      <h4>{'$' + context.remaining || 0}</h4>
    </div>
  );
}

export default Remaining;
