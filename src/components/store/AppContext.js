import React, { createContext, useState, useEffect } from "react";
import { db } from "../../firestore/firestore-config";
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
  setDoc,
} from "firebase/firestore";
import Moment from "moment";

export const ListValuesContext = createContext(null);

function AppContext({ children }) {
  const [expensesList, setExpensesList] = useState([]);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [initialBudget, setInitialBudget] = useState("");
  const [expensesTotal, setExpensesTotal] = useState("");
  const [remaining, setRemaining] = useState("");
  const [user, setUser] = useState({});
  const [budgetData, setBudgetData] = useState([]);
  const [budgetName, setBudgetName] = useState([]);
  console.log(budgetData);
  console.log(expensesList);

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

  useEffect(() => {
    const budgetRef = collection(
      db,
      "users",
      localStorage.getItem("userId"),
      "budget"
    );

    const orderedBudget = query(budgetRef, orderBy("timeStamp", "desc"));
    const dataArr = [];
    async function getBudgetData() {
      try {
        const snapShot = await getDocs(orderedBudget);
        snapShot.forEach((item) => {
          dataArr.push({ ...item.data() });
        });
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    }
    getBudgetData();
    setBudgetData(dataArr);
  }, []);

  // Gets initial budget value if available
  async function getInitialBudget() {
    const budgetRef = collection(
      db,
      "users",
      localStorage.getItem("userId"),
      "budget"
    );
    const orderedBudget = query(budgetRef, orderBy("timeStamp", "desc"));

    getSnapshot(orderedBudget, setInitialBudget);
  }

  // Add items to the list
  async function addExpense(description, type, amount) {
    const budgetItems = collection(
      db,
      "users",
      localStorage.getItem("userId"),
      "budget",
      budgetData[0]?.budgetName,
      "items"
    );

    const orderedItems = query(budgetItems, orderBy("timeStamp", "desc"));

    try {
      await addDoc(budgetItems, {
        description: description,
        type: type,
        amount: Number(amount),
        date: Moment().format("DD/MM/YYYY"),
        timeStamp: serverTimestamp(),
      });

      getSnapshot(orderedItems, setExpensesList);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  // Get list from database and set the initial state

  async function getItemsList() {
    const budgetItems = collection(
      db,
      "users",
      localStorage.getItem("userId"),
      "budget",
      budgetData[0]?.budgetName,
      "items"
    );

    const orderedItems = query(budgetItems, orderBy("timeStamp", "desc"));
    try {
      const data = await getDocs(orderedItems);
      setExpensesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  // Delete items from the list
  async function deleteExpense(id) {
    const budgetItems = collection(
      db,
      "users",
      localStorage.getItem("userId"),
      "budget",
      budgetData[0]?.budgetName,
      "items"
    );
    try {
      await deleteDoc(doc(budgetItems, id));
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }

    // After deleting item, gets a snapshot from current list and updates the state
    getSnapshot(budgetItems, setExpensesList);
  }

  // Adds initial budget value
  async function addBudget(budget, name) {
    const budgetRef = collection(
      db,
      "users",
      localStorage.getItem("userId"),
      "budget"
    );

    if (!budget || !name) return;
    try {
      await setDoc(doc(budgetRef, name), {
        initialBudget: budget,
        budgetName: name,
        date: Moment().format("DD/MM/YYYY"),
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error.message);
    }
    // After adding item, gets a snapshot from current list and updates the state
    getSnapshot(budgetRef, setInitialBudget);
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
    getItemsList,
    user,
    setUser,
    getInitialBudget,
    budgetData,
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
