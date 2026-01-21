// src/components/JobForm.js
import React, { useState, useEffect } from 'react';

const defaultState = {
  title: '',
  company: '',
  status: 'Applied', // Default
};

function JobForm({ onSubmit, editingJob, onCancel }) {
  const [form, setForm] = useState(defaultState);

  useEffect(() => {
    if (editingJob) setForm(editingJob);
    else setForm(defaultState);
  }, [editingJob]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.company) {
      alert('Job title and company are required!');
      return;
    }
    onSubmit(form);
    setForm(defaultState);
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <button type="submit">{editingJob ? 'Update' : 'Add'} Job</button>
      {editingJob && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
export default JobForm;
