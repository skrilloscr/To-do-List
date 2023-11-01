import React, { useState, useEffect } from 'react';
import './Styles.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    if (newTask !== '') {
      fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: newTask }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTasks([...tasks, data]);
          setNewTask('');
        });
    }
  };

  const removeTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    });
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditedTask({ id, task: taskToEdit.task });
  };

  const saveEditedTask = (id, editedText) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: editedText }),
    }).then(() => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, task: editedText } : task
      );
      setTasks(updatedTasks);
      setEditedTask(null);
    });
  };

  const deleteAllTasks = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    });
  };
          
  return (
    <div className="todo-app">
      <h1 className="heading">TO-DO LIST</h1>
      <div className="input">
        <input
          type="text"
          className="todo-input"
          placeholder="Add a task...!"
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
        <i class="fa-solid fa-trash"></i>
        </button>
      )}

        {tasks.length === 0 ? (
          <div>NO TASKS TO DISPLAY.</div>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="flex justify-between task-item">
              {editedTask && editedTask.id === task.id ? (
                <input
                  type="text"
                  value={editedTask.task}
                  onChange={(e) => setEditedTask({ ...editedTask, task: e.target.value })}
                  onBlur={() => saveEditedTask(task.id, editedTask.task)}
                />
              ) : (
                <div>{task.task}</div>
              )}
              <div className="flex">
                <button className="edit-button" onClick={() => editTask(task.id)}>
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="remove-button" onClick={() => removeTask(task.id)}>
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
