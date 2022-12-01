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

  const listRef = useMemo(() => collection(db, 'expenses'), []);
  const budgetRef = useMemo(() => collection(db, 'budget'), []);
  const orderedList = query(
    listRef,
    orderBy('date', 'asc'),
    orderBy('time', 'desc')
  );

  const orderedBudget = query(
    budgetRef,
    orderBy('date', 'asc'),
    orderBy('time', 'desc')
  );

  // Get list from database and set the initial state
  useEffect(() => {
    async function getList() {
      const data = await getDocs(listRef);
      setExpensesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getList();
  }, [listRef]);

  useEffect(() => {
    async function getInitialBudget() {
      const data = await getDocs(budgetRef);
      setInitialBudget(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getInitialBudget();
  }, [budgetRef]);

  // Add items to the list
  async function addExpense(description, type, amount) {
    await addDoc(listRef, {
      description: description,
      type: type,
      amount: Number(amount),
      date: Moment().format('DD/MM/YYYY'),
      time: Moment().format('HH:mm:ss'),
    });

    // After adding item, gets a snapshot from current list and updates the state
    onSnapshot(orderedList, (snapshot) =>
      setExpensesList(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
  }

  // Delete items from the list
  async function deleteExpense(id) {
    await deleteDoc(doc(db, 'expenses', id));

    // After deleting item, gets a snapshot from current list and updates the state
    onSnapshot(orderedList, (snapshot) =>
      setExpensesList(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
  }

  async function addBudget(budget) {
    await addDoc(budgetRef, {
      initialBudget: budget,
      date: Moment().format('DD/MM/YYYY'),
      time: Moment().format('HH:mm:ss'),
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
  };

  return (
    <ListValuesContext.Provider value={values}>
      {children}
    </ListValuesContext.Provider>
  );
}

export default AppContext;
