import React, { useState } from "react";

// 🎯 List component for applications
function ApplicationList({ applications, onEdit, onDelete, filterCompany, setFilterCompany, filterRole, setFilterRole, filterDate, setFilterDate }) {
  // Helper: Filtered applications
  const filtered = applications.filter(app => {
    const matchesCompany = filterCompany
      ? app.company?.toLowerCase().includes(filterCompany.toLowerCase())
      : true;
    const matchesRole = filterRole
      ? app.title?.toLowerCase().includes(filterRole.toLowerCase())
      : true;
    const matchesDate = filterDate
      ? app.date_applied === filterDate
      : true;
    return matchesCompany && matchesRole && matchesDate;
  });

  return (
    <div className="list-table-container">
      <div className="list-filters-row">
        <input
          className="list-filter-input company"
          value={filterCompany}
          onChange={e => setFilterCompany(e.target.value)}
          placeholder="Filter Company..."
        />
        <input
          className="list-filter-input role"
          value={filterRole}
          onChange={e => setFilterRole(e.target.value)}
          placeholder="Filter Role..."
        />
        <input
          className="list-filter-input date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          placeholder="Filter Date yyyy-mm-dd..."
          type="date"
        />
      </div>
      <table className="list-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role / Title</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Date Applied</th>
            <th>Salary</th>
            <th>URL</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="10" style={{textAlign:'center',fontStyle:'italic'}}>No applications found 🤔</td></tr>
          ) : (
            filtered.map(app => (
              <tr key={app.id} className="list-row">
                <td className="company">{app.company}</td>
                <td className="role">{app.title}</td>
                <td className={"status status-"+app.status.toLowerCase()}>{app.status}</td>
                <td className="contact">{app.contact}</td>
                <td className="email">{app.email}</td>
                <td className="date">{app.date_applied ? new Date(app.date_applied).toLocaleDateString() : ""}</td>
                <td className="salary">{app.salary}</td>
                <td className="url">{app.source_url && (<a href={app.source_url} target="_blank" rel="noopener noreferrer">🔗</a>)}</td>
                <td className="notes">{app.notes}</td>
                <td>
                  <button className="btn-sm btn-edit" onClick={() => onEdit(app)}>Edit</button>
                  <button className="btn-sm btn-delete" onClick={() => onDelete(app)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationList;
