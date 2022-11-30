import React, { createContext, useState, useEffect, useMemo } from 'react';
import { db } from '../../firestore/firestore-config';
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
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
  const [initialBudget, setInitialBudget] = useState(0);

  const listRef = useMemo(() => collection(db, 'expenses'), []);
  const orderedList = query(
    listRef,
    orderBy('date', 'desc'),
    orderBy('time', 'desc')
  );

  // Get list from database and set the initial state
  useEffect(() => {
    async function getList() {
      const data = await getDocs(orderedList);
      console.log(data);
      setExpensesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getList();
  }, [listRef]);

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
  };

  return (
    <ListValuesContext.Provider value={values}>
      {children}
    </ListValuesContext.Provider>
  );
}

export default AppContext;
