import React, { createContext, useState, useEffect, useMemo } from 'react';
import { db } from '../../firestore/firestore-config';
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';
import Moment from 'moment';

export const ListValuesContext = createContext(null);

function AppContext({ children }) {
  const [expensesList, setExpensesList] = useState([]);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const listRef = useMemo(() => collection(db, 'expenses'), []);
  console.log(listRef);
  console.log(expensesList);

  useEffect(() => {
    async function getList() {
      const data = await getDocs(listRef);
      console.log(data);
      setExpensesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getList();
  }, [listRef]);

  async function addExpense(description, type, amount) {
    await addDoc(listRef, {
      description: description,
      type: type,
      amount: Number(amount),
      date: Moment().format('DD/MM/YYYY'),
    });

    onSnapshot(listRef, (snapshot) =>
      setExpensesList(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
  }
  // if (type && description && amount) {
  //   addExpense();
  // }

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
  };

  return (
    <ListValuesContext.Provider value={values}>
      {children}
    </ListValuesContext.Provider>
  );
}

export default AppContext;
