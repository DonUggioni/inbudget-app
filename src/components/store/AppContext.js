import React, { createContext, useState, useEffect, useMemo } from 'react';
import { db } from '../../firestore/firestore-config';
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  query,
  orderBy,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import Moment from 'moment';

export const ListValuesContext = createContext(null);

function AppContext({ children }) {
  const [expensesList, setExpensesList] = useState([]);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [initialBudget, setInitialBudget] = useState('');
  const [budgetName, setBudgetName] = useState('');
  const [expensesTotal, setExpensesTotal] = useState('');
  const [remaining, setRemaining] = useState('');
  const [user, setUser] = useState({});
  const [expenseListName, setExpenseListName] = useState(null);

  useEffect(() => {
    const listData =
      JSON.parse(localStorage.getItem('budgetData')) !== null
        ? JSON.parse(localStorage.getItem('budgetData'))[0].name
        : 'default';
    setExpenseListName(listData);
  }, [initialBudget]);

  const userRef = useMemo(
    () =>
      collection(
        db,
        'users',
        localStorage.getItem('userId'),
        expenseListName || 'default'
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, initialBudget]
  );
  const orderedExpenses = useMemo(
    () => query(userRef, orderBy('timeStamp', 'desc')),
    [userRef]
  );

  const budgetRef = useMemo(
    () => collection(db, 'users', localStorage.getItem('userId'), 'budget'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, expenseListName]
  );
  const orderedBudget = useMemo(
    () => query(budgetRef, orderBy('timeStamp', 'desc')),
    [budgetRef]
  );

  function getSnapshot(ref, setData) {
    onSnapshot(ref, (snapshot) =>
      setData(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    );
  }

  // Get list from database and set the initial state
  async function getList() {
    getSnapshot(orderedExpenses, setExpensesList);
  }

  // Gets initial budget value if available
  async function getInitialBudget() {
    getSnapshot(orderedBudget, setInitialBudget);
  }
  useEffect(() => {
    getInitialBudget();
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add items to the list
  async function addExpense(description, type, amount) {
    await addDoc(userRef, {
      description: description,
      type: type,
      amount: Number(amount),
      date: Moment().format('DD/MM/YYYY'),
      timeStamp: serverTimestamp(),
    });

    // After adding item, gets a snapshot from current list and updates the state
    getSnapshot(orderedExpenses, setExpensesList);
  }

  // Delete items from the list
  async function deleteExpense(id) {
    await deleteDoc(
      doc(db, 'users', localStorage.getItem('userId'), expenseListName, id)
    );

    // After deleting item, gets a snapshot from current list and updates the state
    getSnapshot(orderedExpenses, setExpensesList);
  }

  // Adds initial budget value
  async function addBudget(budget, name) {
    if (!budget || !name) return;
    await addDoc(budgetRef, {
      initialBudget: budget,
      budgetName: name,
      date: Moment().format('DD/MM/YYYY'),
      timeStamp: serverTimestamp(),
    });
    const localStorageArr =
      JSON.parse(localStorage.getItem('budgetData')) || [];
    const newData = [{ budget: budget, name: name }, localStorageArr] || [];
    localStorage.setItem('budgetData', JSON.stringify(newData));

    // After adding item, gets a snapshot from current list and updates the state
    getSnapshot(orderedBudget, setInitialBudget);
    getSnapshot(orderedExpenses, setExpensesList);
  }

  const values = {
    expensesList,
    setExpensesList,
    type,
    setType,
    description,
    setDescription,
    amount,
    setAmount,
    addExpense,
    deleteExpense,
    initialBudget,
    setInitialBudget,
    addBudget,
    expensesTotal,
    setExpensesTotal,
    remaining,
    setRemaining,
    getList,
    user,
    setUser,
    getInitialBudget,
    budgetName,
    setBudgetName,
  };

  return (
    <ListValuesContext.Provider value={values}>
      {children}
    </ListValuesContext.Provider>
  );
}

export default AppContext;
