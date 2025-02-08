import React, { useState } from "react";
import { addNewTask } from "../Store/ApiCalls";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import MUISelect from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTodo = ({ tasks }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [subtasks, setSubtasks] = useState([""]);
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("1");
  const [dependencies, setDependencies] = useState([]);

  const addSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = subtasks.map((subtask, i) =>
      i === index ? value : subtask
    );
    setSubtasks(updatedSubtasks);
  };

  const handleDependencyChange = (event, value) => {
    setDependencies(value); 
};


  const handleSubmit = async () => {

    console.log(dependencies)
    if (!taskName || !deadline) {
      toast.error("Task Name and Deadline are required!");
      return;
    }
    const newTask = { taskName, taskDesc, subtasks, deadline, priority, dependencies };
    console.log("Task Created:", newTask);
    await addNewTask(newTask);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer />
      <h1 className="text-xl font-bold mb-4">Schedule your Task Here</h1>

      <TextField
        type="text"
        className="w-full mb-3"
        label="Enter Task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        fullWidth
      />
      <TextField
        type="text"
        className="w-full mb-3"
        label="Enter Task Description"
        value={taskDesc}
        onChange={(e) => setTaskDesc(e.target.value)}
        fullWidth
      />
      <TextField
        type="date"
        className="w-full mb-3"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        fullWidth
      />
      <MUISelect
        className="w-full mb-3"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        fullWidth
      >
        <MenuItem value="1">HIGH</MenuItem>
        <MenuItem value="2">MEDIUM</MenuItem>
        <MenuItem value="3">LOW</MenuItem>
      </MUISelect>

      <div className="mb-3">
        <h2 className="font-medium">Subtasks</h2>
        {subtasks.map((subtask, index) => (
          <TextField
            key={index}
            type="text"
            className="w-full my-1"
            label={`Subtask ${index + 1}`}
            value={subtask}
            onChange={(e) => handleSubtaskChange(index, e.target.value)}
            fullWidth
          />
        ))}
        <button
          className="mt-2 bg-green-500 text-white rounded px-3 py-1 hover:bg-green-600"
          onClick={addSubtask}
        >
          + Add Subtask
        </button>
      </div>

      <div className="mb-3">
        <h2 className="font-medium">Dependencies</h2>
        <Autocomplete
          multiple
          options={tasks?.filter(task => task && task.taskName) || []} 
          getOptionLabel={(task) => task?.taskName || ""} 
          value={dependencies}
          onChange={handleDependencyChange}
          renderInput={(params) => <TextField {...params} label="Select Dependencies" />}
        />
      </div>

      <button
        className="w-full bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600 mt-4"
        onClick={handleSubmit}
      >
        Create Task
      </button>
    </div>
  );
};

export default AddTodo;
