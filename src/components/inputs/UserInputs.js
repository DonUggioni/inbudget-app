import React, { useContext, useRef, useState } from "react";
import { ListValuesContext } from "../store/AppContext";

import "./UserInputs.scss";

function UserInputs() {
  const context = useContext(ListValuesContext);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);
  const [errorMsg, setErrorMsg] = useState(false);
  const descriptionRef = useRef();
  const amountRef = useRef();
  const optionRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    if (!amount || !type || !description) return;

    if (isNaN(amount)) {
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
      context.setType(type);
      context.setDescription(description);
      context.setAmount(amount);
      context.addExpense(description, type, amount);
      descriptionRef.current.value = "";
      amountRef.current.value = "";
      optionRef.current.value = "default";
    }
  }

  return (
    <form onSubmit={(e) => submitHandler(e)} className='input'>
      <div className='input__selectors-wrapper'>
        <select
          className='input__selector'
          id='selector'
          defaultValue={"default"}
          onChange={(e) => setType(e.target.value)}
          ref={optionRef}
        >
          <option value='default' disabled hidden>
            Type
          </option>
          <option value='expense'>Expense</option>
          <option value='income'>Income</option>
        </select>
      </div>
      <input
        className='input__expense-description input_field'
        placeholder='Add a description'
        ref={descriptionRef}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className='input__add-wrapper'>
        <input
          ref={amountRef}
          onChange={(e) => setAmount(e.target.value)}
          className='input__amount input_field'
          placeholder='Amount'
        />
        <button onClick={(e) => submitHandler(e)} className='input__add-btn'>
          Add
        </button>
        {errorMsg && (
          <span className='input__error_msg'>Must be a number.</span>
        )}
      </div>
    </form>
  );
}

export default UserInputs;
