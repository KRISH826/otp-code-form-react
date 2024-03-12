/** @format */

import React, { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneNumberForm = () => {
  const [number, setnumber] = useState("");
  const [inputplatfrom, setinputplatfrom] = useState(false);
  const formHandler = (e) => {
    e.preventDefault();
    console.log(number);
    //   phone validation
    if (number.length < 10) {
      alert("Invalid number");
      return;
    }
    setinputplatfrom(true);
  };
  const onOtpSubmit = (otp) => {
    console.log("login success", otp);
  };
  return (
    <div>
      {inputplatfrom ? (
        <>
          <h4>Enter Otp sent to {number}</h4>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </>
      ) : (
        <>
          <h3>The Value is {number}</h3>
          <form onSubmit={formHandler}>
            <input
              type='number'
              value={number}
              onChange={(e) => setnumber(e.target.value)}
            />
            <button type='submit'>submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default PhoneNumberForm;
