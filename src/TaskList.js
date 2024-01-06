// TaskList.js

import React, { useEffect, useState } from 'react';
import { getAllTasks, deleteTask, updateTask } from './TaskServices';
import TaskForm from './TaskForm';
import './TaskList.css'; // Import your CSS file

const TaskList = ({token}) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    console.log(token)
    useEffect(() => {
        loadTask();
    }, []);
    

    const loadTask = async () => {
        const taskData = await getAllTasks(token);
        setTasks(taskData);
    };

    const handleDelete = async (id) => {
        await deleteTask(id,token);
        loadTask();
    };

    const handleUpdate = (task) => {
        setSelectedTask(task);
    };

    const handleMarkComplete = async (id,title,description, completed) => {
        try {

           
            await updateTask(id, {title,description, completed },token);
            loadTask();
            console.log(tasks);
        } catch (error) {
            console.error('Error marking task as complete:', error);
        }
    };

    return (
        <div className="task-list-container">
            <h2 style={{ textAlign: "center" }}>Task List</h2>
            <TaskForm
                onTaskAdded={loadTask}
                onTaskUpdated={() => {
                    loadTask();
                    setSelectedTask(null);
                }}
                taskToEdit={selectedTask}
                token={token}
            />
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <div className="task-info">
                            <span>{task.title}</span> - <span>{task.description}</span>
                        </div>
                        <div className="task-buttons">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleMarkComplete(task.id,task.title,task.description, !task.completed)}
                            />
                            <button onClick={() => handleDelete(task.id)}>DELETE</button>
                            <button onClick={() => handleUpdate(task)}>Update</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
