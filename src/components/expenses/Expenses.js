import React, { useContext, useEffect } from 'react';
import { ListValuesContext } from '../store/AppContext';

import './Expenses.scss';

function Expenses() {
  const context = useContext(ListValuesContext);

  useEffect(() => {
    const expensesArr = [];
    context.expensesList.forEach((item) => {
      if (item.type === 'expense') {
        expensesArr.push(item.amount);
      }
    });

    context.setExpensesTotal(
      expensesArr.reduce((prev, curr) => prev + curr, 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.expensesList]);

  return (
    <div className="expenses">
      <span>Expenses - </span>
      <h4>{'$' + context.expensesTotal || 0}</h4>
    </div>
  );
}

export default Expenses;
