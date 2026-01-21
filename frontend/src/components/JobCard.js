// src/components/JobCard.js
import React from 'react';

function JobCard({ job }) {
  return (
    <div className="job-card">
      <div><strong>{job.title}</strong></div>
      <div>{job.company}</div>
      <div className="status-badge">{job.status}</div>
    </div>
  );
}
export default JobCard;
