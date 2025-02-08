const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    taskDesc: { type: String, required: true },
    subtasks: { type: [String], default: [] }, 
    dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], 
    priority: { type: String, required: true },
    deadline: { type: Date, required: false },
    status: {type: String, required: true, default: "PENDING"}
});

const Tasks = mongoose.model('tasks', taskSchema);

module.exports = Tasks;
