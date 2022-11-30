import React, { useContext, useEffect, useState } from 'react';
import { ListValuesContext } from '../store/AppContext';

import ExpenseListItem from '../expenseListItem/ExpenseListItem';

import './ExpenseList.scss';

function ExpenseList() {
  const context = useContext(ListValuesContext);
  const [userLanguage, setUserLanguage] = useState('');
  console.log(context.expensesList);

  useEffect(() => {
    setUserLanguage(navigator.language);
  }, []);

  function formatValueToLocale(num) {
    new Intl.NumberFormat(userLanguage, { style: 'currency' }).format(num);
  }

  return (
    <>
      {context.expensesList.length > 0 && (
        <ul className="list__container">
          {context.expensesList.map((item) => {
            return (
              <ExpenseListItem
                date={item.date}
                description={item.description}
                value={'$' + item.amount}
                key={item.id}
                classVariation={item.type === 'income' ? 'income' : 'expense'}
                onClick={() => context.deleteExpense(item.id)}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}

export default ExpenseList;
