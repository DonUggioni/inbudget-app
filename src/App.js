import './App.scss';
import Header from './components/header/Header';
import Budget from './components/budget/Budget';
import Expenses from './components/expenses/Expenses';
import Remaining from './components/remaining/Remaining';
import UserInputs from './components/inputs/UserInputs';
import BarChartComponent from './components/barChart/BarChartComponent';
import ExpenseList from './components/expenseList/ExpenseList';

function App() {
  return (
    <div className="App">
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

export default App;
