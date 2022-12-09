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
  const [expensesTotal, setExpensesTotal] = useState('');
  const [remaining, setRemaining] = useState('');
  const [user, setUser] = useState({});

  const userRef = useMemo(
    () => collection(db, 'users', localStorage.getItem('userId'), 'expenses'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );
  const orderedExpenses = useMemo(
    () => query(userRef, orderBy('timeStamp', 'desc')),
    [userRef]
  );

  const budgetRef = useMemo(
    () => collection(db, 'users', localStorage.getItem('userId'), 'budget'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );
  const orderedBudget = useMemo(
    () => query(budgetRef, orderBy('timeStamp', 'desc')),
    [budgetRef]
  );

  // Get list from database and set the initial state
  async function getList() {
    onSnapshot(orderedExpenses, (snapshot) =>
      setExpensesList(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    );
  }

  // Gets initial budget value if available
  async function getInitialBudget() {
    const data = await getDocs(orderedBudget);
    if (data) {
      setInitialBudget(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  }
  useEffect(() => {
    getInitialBudget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add items to the list
  async function addExpense(description, type, amount) {
    await addDoc(userRef, {
      description: description,
      type: type,
      amount: Number(amount),
      date: Moment().format('DD/MM/YYYY'),
      time: Moment().format('HH:mm:ss'),
      timeStamp: serverTimestamp(),
    });

    // After adding item, gets a snapshot from current list and updates the state
    onSnapshot(orderedExpenses, (snapshot) =>
      setExpensesList(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
  }

  // Delete items from the list
  async function deleteExpense(id) {
    await deleteDoc(
      doc(db, 'users', localStorage.getItem('userId'), 'expenses', id)
    );

    // After deleting item, gets a snapshot from current list and updates the state
    onSnapshot(orderedExpenses, (snapshot) =>
      setExpensesList(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
  }

  // Adds initial budget value
  async function addBudget(budget) {
    await addDoc(budgetRef, {
      initialBudget: budget,
      date: Moment().format('DD/MM/YYYY'),
      time: Moment().format('HH:mm:ss'),
      timeStamp: serverTimestamp(),
    });

    // After adding item, gets a snapshot from current list and updates the state
    onSnapshot(orderedBudget, (snapshot) =>
      setInitialBudget(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
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
  };

  return (
    <ListValuesContext.Provider value={values}>
      {children}
    </ListValuesContext.Provider>
  );
}

export default AppContext;
