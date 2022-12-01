import React, { useContext, useEffect } from 'react';
import { ListValuesContext } from '../store/AppContext';

import './Remaining.scss';

function Remaining() {
  const context = useContext(ListValuesContext);

  useEffect(() => {
    const incomeArr = [];

    context.expensesList.forEach((item) => {
      if (item.type === 'income') {
        incomeArr.push(item.amount);
        context.setRemaining(
          +context.initialBudget[0]?.initialBudget +
            incomeArr?.reduce((prev, curr) => prev + curr, 0) -
            +context.expensesTotal
        );
      }
    });
  }, [context.expensesList, context.expensesTotal, context.initialBudget]);

  return (
    <div className="remaining">
      <span>Remaining - </span>
      <h4>{'$' + context.remaining || 0}</h4>
    </div>
  );
}

export default Remaining;
