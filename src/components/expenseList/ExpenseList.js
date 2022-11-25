import React from 'react';

import ExpenseListItem from '../expenseListItem/ExpenseListItem';

import './ExpenseList.scss';

const DUMMY_DATA = [
  {
    id: 1,
    date: '23/7/2022',
    description: 'This is a very expensive stuff.',
    value: '$400',
    type: 'expense',
  },
  {
    id: 2,
    date: '23/7/2022',
    description: 'Made some money.',
    value: '$100',
    type: 'income',
  },
  {
    id: 3,
    date: '23/7/2022',
    description: 'Video game.',
    value: '$70',
    type: 'expense',
  },
];

function ExpenseList() {
  return (
    <ul className="list__container">
      {DUMMY_DATA.map((item) => {
        return (
          <ExpenseListItem
            date={item.date}
            description={item.description}
            value={item.value}
            key={item.id}
            classVariation={item.type === 'income' ? 'income' : 'expense'}
          />
        );
      })}
    </ul>
  );
}

export default ExpenseList;
