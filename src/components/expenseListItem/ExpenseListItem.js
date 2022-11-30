import React from 'react';
import trashIcon from '../../assets/images/trash-can-solid.svg';

import './ExpenseListItem.scss';

function ExpenseListItem(props) {
  return (
    <li className="item">
      <div className={`item__hightlight ${props.classVariation}`} />
      <div className="item__description--wrapper">
        <span className="item__date">{props.date}</span>
        <p className="item__description">{props.description}</p>
      </div>
      <div className={`item__value--wrapper`}>
        <span className={`item__value ${props.classVariation}`}>
          {props.value}
        </span>
        <button className="item__delete-btn" onClick={props.onClick}>
          <img src={trashIcon} alt="Delete item button" />
        </button>
      </div>
    </li>
  );
}

export default ExpenseListItem;
