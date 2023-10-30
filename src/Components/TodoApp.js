import React, { useState } from 'react';
import './Styles.css'; // Import the custom CSS file

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editedTask, setEditedTask] = useState(null);

  const addTask = () => {
    if (newTask !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setEditedTask({ index, task: taskToEdit });
  };

  const saveEditedTask = (index, editedText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedText;
    setTasks(updatedTasks);
    setEditedTask(null);
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="todo-app">
      <h1 className="heading">TO-DO LIST</h1>
      <div className="input">
        <input
          type="text"
          className="todo-input"
          placeholder="ADD A TASK...!"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="add-button" onClick={addTask}>
        <i class="fa-solid fa-circle-plus"></i>
        </button>
      </div>
      <ul>
      {tasks.length > 0 && (
        <button className="delete-all-button" onClick={deleteAllTasks}>
          <i class="fa-solid fa-trash-can-arrow-up"></i>
        </button>
      )}

        {tasks.length === 0 ? (
          <div>NOTHING TO DISPLAY.</div>
        ) : (
          tasks.map((task, index) => (
            <li key={index} className="flex justify-between task-item">
              {editedTask && editedTask.index === index ? (
                <input
                  type="text"
                  value={editedTask.task}
                  onChange={(e) => setEditedTask({ ...editedTask, task: e.target.value })}
                  onBlur={() => saveEditedTask(index, editedTask.task)}
                />
              ) : (
                <div>{task}</div>
              )}
              <div className="flex">
                <button className="edit-button" onClick={() => editTask(index)}>
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="remove-button" onClick={() => removeTask(index)}>
                <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoApp;
