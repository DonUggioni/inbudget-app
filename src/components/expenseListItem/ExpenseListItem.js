import React from 'react';

import './ExpenseListItem.scss';

function ExpenseListItem(props) {
  return (
    <li className="item">
      <div className={`item__hightlight ${props.classVariation}`} />
      <div className="item__description--wrapper">
        <span className="item__date">{props.date}</span>
        <p className="item__description">{props.description}</p>
      </div>
      <div className={`item__value--wrapper ${props.classVariation}`}>
        <span className="item__value">{props.value}</span>
      </div>
    </li>
  );
}

export default ExpenseListItem;
