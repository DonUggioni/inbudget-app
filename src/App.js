import './App.scss';
import Header from './components/header/Header';
import Budget from './components/budget/Budget';
import Expenses from './components/expenses/Expenses';
import Remaining from './components/remaining/Remaining';
import UserInputs from './components/inputs/UserInputs';
import UserLogin from './components/userLogin/UserLogin';
import BarChartComponent from './components/barChart/BarChartComponent';
import ExpenseList from './components/expenseList/ExpenseList';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      {isLoggedIn && (
        <>
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
        </>
      )}
      {!isLoggedIn && <UserLogin />}
    </div>
  );
}

export default App;
