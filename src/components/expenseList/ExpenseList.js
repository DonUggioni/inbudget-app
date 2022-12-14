import React, { useContext } from "react";
import { ListValuesContext } from "../store/AppContext";

import ExpenseListItem from "../expenseListItem/ExpenseListItem";

import "./ExpenseList.scss";

function ExpenseList() {
  const context = useContext(ListValuesContext);

  return (
    <>
      {context.expensesList.length > 0 && (
        <ul className='list__container'>
          {context.expensesList.map((item) => {
            return (
              <ExpenseListItem
                date={item.date}
                description={item.description}
                value={"$" + item.amount}
                key={item.id}
                classVariation={item.type === "income" ? "income" : "expense"}
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
