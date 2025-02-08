const mainUrl = "http://localhost:8000";


const getAllTasks = async () => {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    };
    const url = `${mainUrl}/tasks`;
    const response = await fetch(url, options);
    const { data, message } = await response.json();
    console.log(message);
    if (message === "Graph has a cycle, topological sort not possible.") alert(message);
    return data;
};


const fetchTaskPriority = async (taskName, taskDesc, deadline) => {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskName, taskDesc, deadline })
    };
    const url = `${mainUrl}/suggest-priority`;
    try {
        const response = await fetch(url, options);
        const { priority } = await response.json();
        return priority; // "1" (High), "2" (Medium), "3" (Low)
    } catch (error) {
        console.error("Error fetching task priority:", error.message);
        return "2"; // Default to Medium
    }
};


const addNewTask = async (task) => {
    try {
        const priority = await fetchTaskPriority(task.taskName, task.taskDesc, task.deadline);
        task.priority = priority; // Assign AI-predicted priority

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task })
        };
        const url = `${mainUrl}/tasks`;
        const response = await fetch(url, options);
        const { message } = await response.json();
        alert(message);
    } catch (error) {
        alert(error.message);
    }
};


const editTask = async (task) => {
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    };
    const url = `${mainUrl}/tasks`;
    try {
        const response = await fetch(url, options);
        const { message } = await response.json();
        alert(message);
    } catch (error) {
        alert(error.message);
    }
};


const deleteTask = async (id) => {
    const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    };
    const url = `${mainUrl}/tasks/${id}`;
    try {
        const response = await fetch(url, options);
        const { message } = await response.json();
        alert(message);
    } catch (error) {
        alert(error.message);
    }
};


export { getAllTasks, addNewTask, editTask, deleteTask };
