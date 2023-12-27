import React from 'react';
import Task from './Task'; // Import the Task component

const TodoList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggleComplete={onToggleComplete} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TodoList;
