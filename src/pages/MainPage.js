import React from 'react';
import BarChartComponent from '../components/barChart/BarChartComponent';
import Budget from '../components/budget/Budget';
import ExpenseList from '../components/expenseList/ExpenseList';
import Expenses from '../components/expenses/Expenses';
import Header from '../components/header/Header';
import UserInputs from '../components/inputs/UserInputs';
import Remaining from '../components/remaining/Remaining';

import './MainPage.scss';

function MainPage() {
  return (
    <div>
      <Header />
      <main className="main">
        <div className="user_interactions_wrapper">
          <div className="user_interactions_wrapper--inner_wrapper">
            <div className="balance_values">
              <Budget />
              <Expenses />
              <Remaining />
            </div>
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
