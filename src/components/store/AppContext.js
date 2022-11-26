import React, { createContext, useState, useEffect } from 'react';
import { db } from '../../firestore/firestore-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Moment from 'moment';

export const ListValuesContext = createContext(null);

function AppContext({ children }) {
  const [expensesList, setExpensesList] = useState([]);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const listRef = collection(db, 'expenses');

  async function addExpenseHandler() {
    await addDoc(listRef, {
      date: Moment().format('DD/MM/YYYY'),
      description: description,
      amount: amount,
      type: type,
    });
  }
  console.log(addExpenseHandler());

  useEffect(() => {
    async function getList() {
      const data = await getDocs(listRef);
      setExpensesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getList();
  }, []);

  const values = {
    expensesList,
    setExpensesList,
    addExpenseHandler,
    type,
    setType,
    description,
    setDescription,
    amount,
    setAmount,
  };

  return (
    <ListValuesContext.Provider value={values}>
      {children}
    </ListValuesContext.Provider>
  );
}

export default AppContext;
