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

  function getSnapshot(ref, setData) {
    onSnapshot(ref, { includeMetadataChanges: true }, (snapshot) =>
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
      localStorage.getItem("userId") || "default",
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
        setBudgetData(dataArr);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    }
    getBudgetData();
  }, [initialBudget]);

  // Gets initial budget value if available
  async function getInitialBudget() {
    const budgetRef = collection(
      db,
      "users",
      localStorage.getItem("userId") || "default",
      "budget"
    );
    const orderedBudget = query(budgetRef, orderBy("timeStamp", "desc"));

    getSnapshot(orderedBudget, setInitialBudget);
  }

  // Add budget function
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

  // Get items list from database and set the initial state
  useEffect(() => {
    async function getItemsList() {
      const budgetItems = collection(
        db,
        "users",
        localStorage.getItem("userId") || "default",
        "budget",
        budgetData[0]?.budgetName || "default",
        "items"
      );

      const orderedItems = query(budgetItems, orderBy("timeStamp", "desc"));
      try {
        const data = await getDocs(orderedItems);
        setExpensesList(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    }
    getItemsList();
  }, [initialBudget, budgetData]);

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

  async function deleteBudget() {
    const budgetItems = collection(
      db,
      "users",
      localStorage.getItem("userId"),
      "budget"
    );
    try {
      await deleteDoc(doc(budgetItems, budgetData[0].budgetName));
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }

    // After deleting item, gets a snapshot from current list and updates the state
    getSnapshot(budgetItems, setExpensesList);
  }

  // Adds initial budget value

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
    user,
    setUser,
    getInitialBudget,
    budgetData,
    budgetName,
    setBudgetName,
    deleteBudget,
  };

  return (
    <ListValuesContext.Provider value={values}>
      {children}
    </ListValuesContext.Provider>
  );
}

export default AppContext;
