import React, { useContext, useEffect } from 'react';
import { ListValuesContext } from '../components/store/AppContext';
import BarChartComponent from '../components/barChart/BarChartComponent';
import Budget from '../components/budget/Budget';
import ExpenseList from '../components/expenseList/ExpenseList';
import Expenses from '../components/expenses/Expenses';
import Header from '../components/header/Header';
import UserInputs from '../components/inputs/UserInputs';
import Remaining from '../components/remaining/Remaining';

import './MainPage.scss';

function MainPage() {
  const appContext = useContext(ListValuesContext);

  function displayValues() {
    if (
      appContext.initialBudget.length > 0 &&
      appContext.budgetName.length > 0
    ) {
      return (
        <>
          <Budget />
          <Expenses />
          <Remaining />
        </>
      );
    } else {
      return (
        <>
          <Budget />
        </>
      );
    }
  }
  return (
    <div className="main__wrapper">
      <Header />
      <main className="main">
        <div className="user_interactions_wrapper">
          <div className="user_interactions_wrapper--inner_wrapper">
            <div className="balance_values">{displayValues()}</div>
            <UserInputs />
          </div>
          <BarChartComponent />
        </div>
        <ExpenseList />
      </main>
    </div>
  );
}

export default MainPage;
