import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const stages = ['Applied', 'Interview', 'Offers', 'Rejected'];

function KanbanDemo() {
  // Demo jobs
  const [jobs, setJobs] = useState([
    { id: '1', title: 'Engineer', company: 'Acme', status: 'Applied' },
    { id: '2', title: 'PM', company: 'Beta', status: 'Interview' },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const jobId = result.draggableId;
    const newStatus = result.destination.droppableId;
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
  };

  return (
    <div style={{ display: 'flex', gap: 16, padding: 24 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {stages.map(stage => (
          <Droppable droppableId={stage} key={stage}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: snapshot.isDraggingOver ? '#e0eafd' : '#f6f8fa',
                  borderRadius: 8,
                  minWidth: 250,
                  minHeight: 400,
                  padding: 10
                }}>
                <h3>{stage}</h3>
                {jobs.filter(job => job.status === stage).map((job, idx) => (
                  <Draggable draggableId={job.id} index={idx} key={job.id}>
                    {(provided, snap) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          background: snap.isDragging ? '#4586ff' : 'white',
                          color: snap.isDragging ? 'white' : '#051428',
                          margin: '0 0 10px 0',
                          padding: 16,
                          borderRadius: 7,
                          boxShadow: '0 2px 8px #0001'
                        }}
                      >
                        <b>{job.title}</b>
                        <div>{job.company}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default KanbanDemo;
