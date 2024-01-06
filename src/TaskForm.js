// TaskForm.js

import React, { useState } from 'react';
import { createTask, updateTask } from './TaskServices';
import './TaskForm.css'; // Import your CSS file

const TaskForm = ({ onTaskAdded, onTaskUpdated, taskToEdit,token }) => {
    const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
    const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = { title, description };

        if (taskToEdit) {
            await updateTask(taskToEdit.id, taskData,token);
            onTaskUpdated();
        } else {
            await createTask(taskData,token);
            onTaskAdded();
        }

        setTitle('');
        setDescription('');
    };

    return (
        <div className="task-form-container">
            <h2>{taskToEdit ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <br />
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <br />
                <button type="submit" className="submit-button">
                    {taskToEdit ? 'Update Task' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
