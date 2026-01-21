// src/components/ApplicationForm.js
import React, { useState, useEffect } from "react";

export default function ApplicationForm({ onSubmit, editingApp }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    contact: "",
    email: "",
    source_url: "",
    notes: "",
  });

  useEffect(() => {
    if (editingApp) {
      setForm(editingApp);
    }
  }, [editingApp]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.company) {
      alert("Title and Company are required!");
      return;
    }
    onSubmit(form);
    setForm({
      title: "",
      company: "",
      contact: "",
      email: "",
      source_url: "",
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem 0" }}>
      <input
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        required
      />
      <input
        name="contact"
        placeholder="Contact Person"
        value={form.contact}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="source_url"
        placeholder="Application URL"
        value={form.source_url}
        onChange={handleChange}
      />
      <input
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />
      <button type="submit">
        {editingApp ? "Update Application" : "Add Application"}
      </button>
    </form>
  );
}
