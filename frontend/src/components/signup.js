import React, { useState } from "react";
import { registerUser } from "../utils/auth";

function Signup({ onSignupSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    const res = registerUser(form);
    if (!res.success) {
      alert(res.message);
      return;
    }

    alert("Signup successful");
    onSignupSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
