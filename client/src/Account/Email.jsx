import React, { useState } from "react";
import { resetPassEmail } from "../Api/LoginApi";

const Email = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitEmail = async () => {
    console.log("email", email);
    try {
      await resetPassEmail({ email });
      setMessage("Check your email for the reset link.");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage("No user is registered with this email.");
      } else {
        console.error("Error sending reset email:", error);
        setMessage("Failed to send reset email. Please try again.");
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={submitEmail}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default Email;
