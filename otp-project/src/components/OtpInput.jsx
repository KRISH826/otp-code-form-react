/** @format */

import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setotp] = useState(new Array(length).fill(""));
  const inputref = useRef([]);
  console.log(inputref);
  useEffect(() => {
    if (inputref.current[0]) {
      inputref.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setotp(newOtp);

    const combinedOtp = newOtp.join("");
    console.log(combinedOtp);
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }
    //   move to next input automatically
    if (value && index < length - 1 && inputref.current[index + 1]) {
      inputref.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputref.current[index].setSelectionRange(1, 1);
  };
  const handlekeydown = (index, e) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !otp[index] &&
      inputref.current[index - 1]
    ) {
      inputref.current[index - 1].focus();
    }
  };
  return (
    <div>
      {otp.map((value, index) => (
        <input
          ref={(input) => (inputref.current[index] = input)}
          key={index}
          type='text'
          className='otp_input'
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handlekeydown(index, e)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
