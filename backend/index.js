const express=require("express");
const cors=require('cors');
const { default: mongoose } = require("mongoose");
const Tasks = require("./models/task");
const { topoSort } = require("./controllers/topoSort");

const app=express();
app.use(cors());
app.use(express.json());

const port=process.env.PORT | 8000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/smartTodoList";

const startServerAndConnectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected...");
        app.listen(port, () => {
            console.log(`Server running on port NO: ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

startServerAndConnectDB();

app.get("/", async(req, res)=> {
    return res.status(200).json({message: "HI shirisha"})
})


app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Tasks.find();
         const {sortedTasks, message}=topoSort(tasks);
         console.log(sortedTasks);
        console.log(message)
        return res.status(200).json({ message, data: sortedTasks });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const {task}=req.body;
        const { taskName, taskDesc, subtasks, dependencies, priority, deadline } = task;
        
        let updatedDependencies=[];
        for(let task of dependencies) updatedDependencies.push(task._id);

        const newTask = new Tasks({ taskName, taskDesc, subtasks, dependencies: updatedDependencies, priority, deadline });
        await newTask.save();
        return res.status(201).json({ message: "Todo added successfully.", data: newTask });
    } catch (error) {
        return res.status(400).json({ message: "Error adding todo", error: error.message });
    }
});

app.put("/tasks", async (req, res) => {
    try {
        const { task } = req.body;
        const {id}=task;
        const updatedTask = await Tasks.findByIdAndUpdate(id, task, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Todo not found." });
        }
        return res.status(200).json({ message: "Todo updated successfully.", data: updatedTask });
    } catch (error) {
        return res.status(400).json({ message: "Error updating todo", error: error.message });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deletedTask = await Tasks.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Todo not found." });
        }
        return res.status(200).json({ message: "Todo deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting todo", error: error.message });
    }
});



async function getPriority(taskName, taskDesc, deadline) {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are an AI that classifies task priorities as High (1), Medium (2), or Low (3)." },
                    { role: "user", content: `Task: ${taskName}. Description: ${taskDesc}. Deadline: ${deadline}. Suggest priority (High, Medium, Low).` }
                ],
                temperature: 0.5,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const priorityText = response.data.choices[0].message.content.trim().toLowerCase();
        if (priorityText.includes("high")) return "1";
        if (priorityText.includes("medium")) return "2";
        if (priorityText.includes("low")) return "3";
        return "2"; 
    } catch (error) {
        console.error("OpenAI API Error:", error.message);
        return fallbackPriority(taskDesc); 
    }
}


function fallbackPriority(taskDesc) {
    const lowerDesc = taskDesc.toLowerCase();
    if (lowerDesc.includes("urgent") || lowerDesc.includes("important") || lowerDesc.includes("deadline")) {
        return "1"; 
    }
    if (lowerDesc.includes("soon") || lowerDesc.includes("moderate")) {
        return "2"; 
    }
    return "3"; 
}


app.post("/suggest-priority", async (req, res) => {
    try {
        const { taskName, taskDesc, deadline } = req.body;
        const priority = await getPriority(taskName, taskDesc, deadline);
        return res.status(200).json({ priority });
    } catch (error) {
        return res.status(500).json({ message: "Error determining priority", error: error.message });
    }
});